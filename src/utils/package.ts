/**
 * Package metadata utilities
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

export function getPackageRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  // From dist/utils/package.js -> go up to root
  return join(dirname(__filename), '..', '..');
}

export function getPackageVersion(): string {
  try {
    const pkgPath = join(getPackageRoot(), 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    return pkg.version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}
