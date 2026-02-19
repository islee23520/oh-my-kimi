/**
 * Team command - Parallel worker orchestration
 */

import { spawn } from 'child_process';
import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { getProjectPluginDir } from '../utils/paths.js';

interface TeamOptions {
  force?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
}

interface TeamConfig {
  name: string;
  workerCount: number;
  agentType: string;
  task: string;
  useRalph: boolean;
}

export async function teamCommand(args: string[], options: TeamOptions): Promise<void> {
  if (args.length === 0) {
    console.log(`
kimiplugin team - Parallel worker orchestration

Usage:
  kp team [ralph] <N>:<agent-type> "<task description>"
  kp team status <team-name>
  kp team shutdown <team-name>

Examples:
  kp team 3:executor "analyze codebase for bugs"
  kp team ralph 2:architect "design new API"
  kp team status my-team
  kp team shutdown my-team
`);
    return;
  }

  const subcommand = args[0];

  switch (subcommand) {
    case 'status':
      await showTeamStatus(args[1]);
      break;
    case 'shutdown':
      await shutdownTeam(args[1]);
      break;
    default:
      await startTeam(args, options);
  }
}

async function startTeam(args: string[], options: TeamOptions): Promise<void> {
  const config = parseTeamArgs(args);
  const cwd = process.cwd();
  const projectDir = getProjectPluginDir(cwd);
  const teamDir = join(projectDir, 'state', 'team', config.name);

  if (options.verbose) {
    console.log(`Starting team: ${config.name}`);
    console.log(`Workers: ${config.workerCount}`);
    console.log(`Agent type: ${config.agentType}`);
    console.log(`Task: ${config.task}`);
  }

  if (options.dryRun) {
    console.log(`[dry-run] Would create team at: ${teamDir}`);
    return;
  }

  // Create team state directory
  await mkdir(teamDir, { recursive: true });
  await mkdir(join(teamDir, 'workers'), { recursive: true });

  // Write team config
  const teamConfig = {
    name: config.name,
    worker_count: config.workerCount,
    agent_type: config.agentType,
    task: config.task,
    use_ralph: config.useRalph,
    started_at: new Date().toISOString(),
    status: 'active',
  };

  await writeFile(
    join(teamDir, 'config.json'),
    JSON.stringify(teamConfig, null, 2)
  );

  // Write worker assignments
  for (let i = 0; i < config.workerCount; i++) {
    const workerDir = join(teamDir, 'workers', `worker-${i}`);
    await mkdir(workerDir, { recursive: true });
    
    const workerConfig = {
      id: i,
      team: config.name,
      agent_type: config.agentType,
      task: config.task,
      status: 'pending',
    };
    
    await writeFile(
      join(workerDir, 'config.json'),
      JSON.stringify(workerConfig, null, 2)
    );
  }

  console.log(`Team started: ${config.name}`);
  console.log(`  Workers: ${config.workerCount}`);
  console.log(`  Directory: ${teamDir}`);
  console.log(`\nTo check status: kp team status ${config.name}`);
  console.log(`To shutdown: kp team shutdown ${config.name}`);
}

function parseTeamArgs(args: string[]): TeamConfig {
  let useRalph = false;
  let workerSpec: string | null = null;
  let taskParts: string[] = [];

  for (const arg of args) {
    if (arg === 'ralph') {
      useRalph = true;
    } else if (arg.includes(':') && !workerSpec) {
      workerSpec = arg;
    } else {
      taskParts.push(arg);
    }
  }

  // Parse worker spec (e.g., "3:executor")
  let workerCount = 2;
  let agentType = 'executor';
  
  if (workerSpec) {
    const [count, type] = workerSpec.split(':');
    workerCount = parseInt(count, 10) || 2;
    agentType = type || 'executor';
  }

  const task = taskParts.join(' ') || 'Analyze and improve the codebase';
  const name = sanitizeTeamName(task);

  return {
    name,
    workerCount,
    agentType,
    task,
    useRalph,
  };
}

function sanitizeTeamName(task: string): string {
  return task
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50) || 'team';
}

async function showTeamStatus(teamName: string | undefined): Promise<void> {
  if (!teamName) {
    console.error('Error: team name required');
    console.log('Usage: kp team status <team-name>');
    return;
  }

  const cwd = process.cwd();
  const teamDir = join(getProjectPluginDir(cwd), 'state', 'team', teamName);

  if (!existsSync(teamDir)) {
    console.error(`Team not found: ${teamName}`);
    return;
  }

  console.log(`Team: ${teamName}`);
  console.log(`Directory: ${teamDir}`);
  console.log('\nNote: Team mode uses file-based coordination.');
  console.log('Workers read tasks from their config.json files.');
}

async function shutdownTeam(teamName: string | undefined): Promise<void> {
  if (!teamName) {
    console.error('Error: team name required');
    console.log('Usage: kp team shutdown <team-name>');
    return;
  }

  const cwd = process.cwd();
  const teamDir = join(getProjectPluginDir(cwd), 'state', 'team', teamName);

  if (!existsSync(teamDir)) {
    console.error(`Team not found: ${teamName}`);
    return;
  }

  console.log(`Shutting down team: ${teamName}`);
  console.log(`Team directory: ${teamDir}`);
  console.log('\nNote: Manual cleanup may be required for worker processes.');
}
