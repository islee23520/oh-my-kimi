/**
 * kimiplugin CLI
 * Multi-agent orchestration for Kimi CLI
 */

import { execSync, execFileSync, spawn } from 'child_process';
import { basename, dirname, join } from 'path';
import { existsSync } from 'fs';
import { setup } from './setup.js';
import { doctor } from './doctor.js';
import { version } from './version.js';
import { teamCommand } from './team.js';
import { getProjectStateDir } from '../utils/paths.js';
import { getPackageRoot } from '../utils/package.js';

const HELP = `
kimiplugin (kp) - Multi-agent orchestration for Kimi CLI

Usage:
  kp                    Launch Kimi CLI with enhanced context
  kp setup              Install prompts, skills, and AGENTS.md
  kp doctor             Check installation health
  kp team               Spawn parallel worker sessions
  kp version            Show version information
  kp status             Show active modes and state
  kp cancel             Cancel active execution modes
  kp help               Show this help message

Options:
  --force               Force reinstall (overwrite existing files)
  --dry-run             Show what would be done without doing it
  --verbose             Show detailed output

Quick Start:
  1. Run "kp setup" to install all components
  2. Run "kp doctor" to verify installation
  3. Use /prompts:architect, /prompts:executor for specialized agents
  4. Use $autopilot, $plan, $team for workflow skills
`;

type CliCommand = 'launch' | 'setup' | 'doctor' | 'team' | 'version' | 'status' | 'cancel' | 'help' | string;

export interface ResolvedCliInvocation {
  command: CliCommand;
  launchArgs: string[];
}

export function resolveCliInvocation(args: string[]): ResolvedCliInvocation {
  const firstArg = args[0];
  if (firstArg === '--help' || firstArg === '-h') {
    return { command: 'help', launchArgs: [] };
  }
  if (!firstArg || firstArg.startsWith('--')) {
    return { command: 'launch', launchArgs: firstArg ? args : [] };
  }
  if (firstArg === 'launch') {
    return { command: 'launch', launchArgs: args.slice(1) };
  }
  return { command: firstArg, launchArgs: [] };
}

export async function main(args: string[]): Promise<void> {
  const knownCommands = new Set([
    'launch', 'setup', 'doctor', 'team', 'version', 'status', 'cancel', 'help', '--help', '-h',
  ]);
  const firstArg = args[0];
  const { command, launchArgs } = resolveCliInvocation(args);
  const flags = new Set(args.filter(a => a.startsWith('--')));
  const options = {
    force: flags.has('--force'),
    dryRun: flags.has('--dry-run'),
    verbose: flags.has('--verbose'),
    team: flags.has('--team'),
  };

  try {
    switch (command) {
      case 'launch':
        await launchWithContext(launchArgs);
        break;
      case 'setup':
        await setup(options);
        break;
      case 'doctor':
        await doctor(options);
        break;
      case 'team':
        await teamCommand(args.slice(1), options);
        break;
      case 'version':
        version();
        break;
      case 'status':
        await showStatus();
        break;
      case 'cancel':
        await cancelModes();
        break;
      case 'help':
      case '--help':
      case '-h':
        console.log(HELP);
        break;
      default:
        if (firstArg && firstArg.startsWith('-') && !knownCommands.has(firstArg)) {
          await launchWithContext(args);
          break;
        }
        console.error(`Unknown command: ${command}`);
        console.log(HELP);
        process.exit(1);
    }
  } catch (err) {
    console.error(`Error: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
}

async function launchWithContext(args: string[]): Promise<void> {
  const cwd = process.cwd();
  const sessionId = `kp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Pre-launch: generate overlay and session file
  try {
    await preLaunch(cwd, sessionId);
  } catch (err) {
    console.error(`[kp] preLaunch warning: ${err instanceof Error ? err.message : err}`);
  }

  // Run Kimi
  try {
    runKimi(cwd, args, sessionId);
  } finally {
    // Post-launch cleanup
    await postLaunch(cwd, sessionId);
  }
}

async function preLaunch(cwd: string, sessionId: string): Promise<void> {
  const { mkdir, writeFile } = await import('fs/promises');
  const stateDir = getProjectStateDir(cwd);
  
  // Create state directory
  await mkdir(stateDir, { recursive: true });
  
  // Write session state
  const sessionState = {
    session_id: sessionId,
    started_at: new Date().toISOString(),
    pid: process.pid,
    cwd,
  };
  
  await writeFile(
    join(stateDir, 'session.json'),
    JSON.stringify(sessionState, null, 2)
  );
  
  console.log(`[kp] Session started: ${sessionId}`);
}

function runKimi(cwd: string, args: string[], sessionId: string): void {
  // Build launch args with AGENTS.md injection if present
  const launchArgs = injectAgentsMd(cwd, args);
  
  try {
    execFileSync('kimi', launchArgs, { cwd, stdio: 'inherit' });
  } catch {
    // Kimi exited, possibly with error - this is normal
  }
}

function injectAgentsMd(cwd: string, args: string[]): string[] {
  const agentsMdPath = join(cwd, 'AGENTS.md');
  
  // If AGENTS.md exists, prepend it as context
  if (existsSync(agentsMdPath)) {
    // Kimi CLI uses -c for config, we can use environment or file-based context
    // For now, just return args as-is; AGENTS.md is read by Kimi automatically
    return args;
  }
  
  return args;
}

async function postLaunch(cwd: string, sessionId: string): Promise<void> {
  const { unlink } = await import('fs/promises');
  const stateDir = getProjectStateDir(cwd);
  
  // Clean up session file
  try {
    await unlink(join(stateDir, 'session.json'));
  } catch {
    // Ignore cleanup errors
  }
  
  // Cancel any active modes
  try {
    const { readdir, writeFile, readFile } = await import('fs/promises');
    const files = await readdir(stateDir).catch(() => [] as string[]);
    
    for (const file of files) {
      if (!file.endsWith('-state.json')) continue;
      
      const path = join(stateDir, file);
      const content = await readFile(path, 'utf-8');
      const state = JSON.parse(content);
      
      if (state.active) {
        state.active = false;
        state.completed_at = new Date().toISOString();
        await writeFile(path, JSON.stringify(state, null, 2));
      }
    }
  } catch {
    // Ignore cleanup errors
  }
  
  console.log(`[kp] Session ended: ${sessionId}`);
}

async function showStatus(): Promise<void> {
  const { readdir, readFile } = await import('fs/promises');
  const cwd = process.cwd();
  const stateDir = getProjectStateDir(cwd);
  
  try {
    const files = await readdir(stateDir).catch(() => [] as string[]);
    const states: string[] = [];
    
    for (const file of files) {
      if (!file.endsWith('-state.json') || file === 'session.json') continue;
      states.push(join(stateDir, file));
    }
    
    if (states.length === 0) {
      console.log('No active modes.');
      return;
    }
    
    for (const path of states) {
      const content = await readFile(path, 'utf-8');
      const state = JSON.parse(content);
      const file = basename(path);
      const mode = file.replace('-state.json', '');
      console.log(`${mode}: ${state.active ? 'ACTIVE' : 'inactive'} (phase: ${state.current_phase || 'n/a'})`);
    }
  } catch {
    console.log('No active modes.');
  }
}

async function cancelModes(): Promise<void> {
  const { readdir, writeFile, readFile } = await import('fs/promises');
  const cwd = process.cwd();
  const stateDir = getProjectStateDir(cwd);
  
  try {
    const files = await readdir(stateDir).catch(() => [] as string[]);
    let cancelled = 0;
    
    for (const file of files) {
      if (!file.endsWith('-state.json')) continue;
      
      const path = join(stateDir, file);
      const content = await readFile(path, 'utf-8');
      const state = JSON.parse(content);
      
      if (state.active) {
        state.active = false;
        state.cancelled_at = new Date().toISOString();
        await writeFile(path, JSON.stringify(state, null, 2));
        cancelled++;
      }
    }
    
    console.log(`Cancelled ${cancelled} active mode(s).`);
  } catch {
    console.log('No active modes to cancel.');
  }
}
