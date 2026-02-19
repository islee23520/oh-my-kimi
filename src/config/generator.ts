/**
 * Config file generation and merging
 */

import { existsSync } from 'fs';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';

interface MergeOptions {
  verbose?: boolean;
}

export async function mergeConfig(
  configPath: string,
  pkgRoot: string,
  options: MergeOptions = {}
): Promise<void> {
  // Read existing config or create new one
  let config: Record<string, unknown> = {};
  
  if (existsSync(configPath)) {
    try {
      const content = await readFile(configPath, 'utf-8');
      config = JSON.parse(content);
    } catch {
      config = {};
    }
  }

  // Merge kimiplugin settings
  config.kimiplugin = {
    ...(config.kimiplugin as Record<string, unknown> || {}),
    version: '0.1.0',
    enabled: true,
  };

  // Ensure features section
  config.features = {
    ...(config.features as Record<string, unknown> || {}),
    multi_agent: true,
    skills: true,
    prompts: true,
  };

  // Write config
  await mkdir(dirname(configPath), { recursive: true });
  await writeFile(configPath, JSON.stringify(config, null, 2));

  if (options.verbose) {
    console.log(`  Updated: ${configPath}`);
  }
}
