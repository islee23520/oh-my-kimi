/**
 * kimiplugin - Multi-agent orchestration for Kimi CLI
 */

export { main, resolveCliInvocation } from './cli/index.js';
export { setup } from './cli/setup.js';
export { doctor } from './cli/doctor.js';
export { version } from './cli/version.js';
export { teamCommand } from './cli/team.js';

export * from './utils/paths.js';
export * from './utils/package.js';
export * from './state/index.js';
