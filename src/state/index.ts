/**
 * State management utilities
 */

import { join } from 'path';
import { mkdir, readFile, writeFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { getProjectStateDir } from '../utils/paths.js';

export interface ModeState {
  mode: string;
  active: boolean;
  current_phase?: string;
  started_at?: string;
  completed_at?: string;
  [key: string]: unknown;
}

export async function readState(cwd: string, mode: string): Promise<ModeState | null> {
  const stateDir = getProjectStateDir(cwd);
  const path = join(stateDir, `${mode}-state.json`);
  
  if (!existsSync(path)) {
    return null;
  }
  
  try {
    const content = await readFile(path, 'utf-8');
    return JSON.parse(content) as ModeState;
  } catch {
    return null;
  }
}

export async function writeState(cwd: string, state: ModeState): Promise<void> {
  const stateDir = getProjectStateDir(cwd);
  await mkdir(stateDir, { recursive: true });
  
  const path = join(stateDir, `${state.mode}-state.json`);
  await writeFile(path, JSON.stringify(state, null, 2));
}

export async function clearState(cwd: string, mode: string): Promise<void> {
  const stateDir = getProjectStateDir(cwd);
  const path = join(stateDir, `${mode}-state.json`);
  
  if (existsSync(path)) {
    const { unlink } = await import('fs/promises');
    await unlink(path);
  }
}

export async function listActiveStates(cwd: string): Promise<ModeState[]> {
  const stateDir = getProjectStateDir(cwd);
  
  if (!existsSync(stateDir)) {
    return [];
  }
  
  const files = await readdir(stateDir);
  const states: ModeState[] = [];
  
  for (const file of files) {
    if (!file.endsWith('-state.json')) continue;
    
    try {
      const content = await readFile(join(stateDir, file), 'utf-8');
      const state = JSON.parse(content) as ModeState;
      if (state.active) {
        states.push(state);
      }
    } catch {
      // Skip invalid state files
    }
  }
  
  return states;
}
