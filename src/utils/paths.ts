/**
 * Path utilities for kimiplugin
 */

import { homedir } from 'os';
import { join } from 'path';

const KIMI_HOME = '.kimi';
const PLUGIN_HOME = '.kimiplugin';

export function kimiHome(): string {
  return join(homedir(), KIMI_HOME);
}

export function kimiPromptsDir(): string {
  return join(kimiHome(), 'prompts');
}

export function kimiConfigPath(): string {
  return join(kimiHome(), 'config.json');
}

export function userSkillsDir(): string {
  return join(homedir(), PLUGIN_HOME, 'skills');
}

export function pluginStateDir(): string {
  return join(homedir(), PLUGIN_HOME, 'state');
}

export function pluginPlansDir(): string {
  return join(homedir(), PLUGIN_HOME, 'plans');
}

export function pluginLogsDir(): string {
  return join(homedir(), PLUGIN_HOME, 'logs');
}

export function pluginAgentsConfigDir(): string {
  return join(homedir(), PLUGIN_HOME, 'agents');
}

export function getProjectPluginDir(cwd: string): string {
  return join(cwd, '.kimiplugin');
}

export function getProjectStateDir(cwd: string): string {
  return join(getProjectPluginDir(cwd), 'state');
}
