/**
 * oh-my-kimi doctor - Installation diagnostics
 */

import { existsSync } from 'fs';
import { access, readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { spawnSync } from 'child_process';
import {
  kimiPromptsDir, userSkillsDir, pluginStateDir,
  kimiConfigPath,
} from '../utils/paths.js';
import { getPackageRoot, getPackageVersion } from '../utils/package.js';

interface DoctorOptions {
  team?: boolean;
  verbose?: boolean;
}

interface CheckResult {
  name: string;
  status: 'ok' | 'warn' | 'error';
  message: string;
}

export async function doctor(options: DoctorOptions = {}): Promise<void> {
  console.log('oh-my-kimi doctor');
  console.log('======================\n');
  console.log(`Version: ${getPackageVersion()}\n`);

  const results: CheckResult[] = [];

  // Check 1: Node.js version
  results.push(checkNodeVersion());

  // Check 2: Kimi CLI
  results.push(checkKimiCli());

  // Check 3: Prompts directory
  results.push(await checkPromptsDir());

  // Check 4: Skills directory
  results.push(await checkSkillsDir());

  // Check 5: Config file
  results.push(await checkConfigFile());

  // Check 6: Git (optional but recommended)
  results.push(checkGit());

  // Print results
  console.log('Checks:');
  console.log('-------');
  
  let errors = 0;
  let warnings = 0;
  
  for (const result of results) {
    const icon = result.status === 'ok' ? '✓' : result.status === 'warn' ? '⚠' : '✗';
    console.log(`${icon} ${result.name}: ${result.message}`);
    
    if (result.status === 'error') errors++;
    if (result.status === 'warn') warnings++;
  }

  console.log();
  
  if (errors === 0 && warnings === 0) {
    console.log('✓ All checks passed! oh-my-kimi is ready to use.');
  } else if (errors === 0) {
    console.log(`⚠ ${warnings} warning(s). kimiplugin should work, but some features may be limited.`);
  } else {
    console.log(`✗ ${errors} error(s), ${warnings} warning(s). Please fix the errors above.`);
    process.exit(1);
  }
}

function checkNodeVersion(): CheckResult {
  const version = process.version;
  const major = parseInt(version.slice(1).split('.')[0], 10);
  
  if (major >= 20) {
    return { name: 'Node.js', status: 'ok', message: version };
  } else if (major >= 18) {
    return { name: 'Node.js', status: 'warn', message: `${version} (>= 20 recommended)` };
  } else {
    return { name: 'Node.js', status: 'error', message: `${version} (>= 18 required)` };
  }
}

function checkKimiCli(): CheckResult {
  const result = spawnSync('kimi', ['--version'], { encoding: 'utf-8', stdio: 'pipe' });
  
  if (result.status === 0) {
    const version = result.stdout?.trim() || 'installed';
    return { name: 'Kimi CLI', status: 'ok', message: version };
  }
  
  return {
    name: 'Kimi CLI',
    status: 'error',
    message: 'not found in PATH. Install with: pip install kimi-cli'
  };
}

async function checkPromptsDir(): Promise<CheckResult> {
  const dir = kimiPromptsDir();
  
  if (!existsSync(dir)) {
    return { name: 'Prompts', status: 'error', message: `directory not found: ${dir}` };
  }
  
  try {
    const files = await readdir(dir);
    const count = files.filter(f => f.endsWith('.md')).length;
    return { name: 'Prompts', status: 'ok', message: `${count} prompts installed` };
  } catch {
    return { name: 'Prompts', status: 'error', message: 'cannot read directory' };
  }
}

async function checkSkillsDir(): Promise<CheckResult> {
  const dir = userSkillsDir();
  
  if (!existsSync(dir)) {
    return { name: 'Skills', status: 'error', message: `directory not found: ${dir}` };
  }
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const count = entries.filter(e => e.isDirectory()).length;
    return { name: 'Skills', status: 'ok', message: `${count} skills installed` };
  } catch {
    return { name: 'Skills', status: 'error', message: 'cannot read directory' };
  }
}

async function checkConfigFile(): Promise<CheckResult> {
  const path = kimiConfigPath();
  
  if (!existsSync(path)) {
    return { name: 'Config', status: 'warn', message: `not found: ${path} (run setup)` };
  }
  
  try {
    const content = await readFile(path, 'utf-8');
    const config = JSON.parse(content);
    return { name: 'Config', status: 'ok', message: 'valid JSON' };
  } catch {
    return { name: 'Config', status: 'error', message: 'invalid JSON' };
  }
}

function checkGit(): CheckResult {
  const result = spawnSync('git', ['--version'], { encoding: 'utf-8', stdio: 'pipe' });
  
  if (result.status === 0) {
    const version = result.stdout?.trim().replace('git version ', '') || 'installed';
    return { name: 'Git', status: 'ok', message: version };
  }
  
  return {
    name: 'Git',
    status: 'warn',
    message: 'not found (recommended for version control features)'
  };
}
