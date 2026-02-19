/**
 * Version command
 */

import { getPackageVersion } from '../utils/package.js';

export function version(): void {
  console.log(`oh-my-kimicode version ${getPackageVersion()}`);
}
