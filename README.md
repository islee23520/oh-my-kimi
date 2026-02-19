# oh-my-kimi (omk)

> _Your Kimi CLI, supercharged._

Multi-agent orchestration layer for [Kimi CLI](https://github.com/moonshotai/kimi-cli).

oh-my-kimi transforms Kimi from a single-session agent into a coordinated system with:

- **Role prompts** (`/prompts:name`) for specialized agents
- **Workflow skills** (`$name`) for repeatable execution modes
- **Team orchestration** (`omk team`) for parallel workers
- **Persistent state** for long-running sessions

## Why oh-my-kimicode

Kimi CLI is powerful for direct tasks. kimiplugin adds structure for larger work:

- Decomposition and staged execution
- Persistent mode lifecycle state (`.kimiplugin/state/`)
- Memory surfaces for long-running sessions
- Operational controls for launch and cancellation

oh-my-kimi is an **add-on**, not a fork. It uses Kimi's native extension points.

## Requirements

- Node.js >= 18
- Kimi CLI installed (`pip install kimi-cli`)
- Git (recommended)

## Quickstart (3 minutes)

```bash
# Install globally
npm install -g oh-my-kimi

# Or use npx
npx oh-my-kimi setup

# Run setup
kp setup

# Verify installation
kp doctor
```

## First Session

Inside Kimi CLI:

```
/prompts:architect "analyze current auth boundaries"
/prompts:executor "implement input validation in login"
$plan "ship OAuth callback safely"
$team 3:executor "fix all TypeScript errors"
```

From terminal:

```bash
omk team 4:executor "parallelize a multi-module refactor"
omk team status <team-name>
```

## Core Model

```
User
  -> Kimi CLI
    -> AGENTS.md (orchestration brain)
    -> ~/.kimi/prompts/*.md (agent prompts)
    -> ~/.kimiplugin/skills/*/SKILL.md (workflow skills)
    -> ~/.kimi/config.json (configuration)
    -> .kimiplugin/ (runtime state, plans, logs)
```

## Main Commands

```
kp                 # Launch Kimi CLI with enhanced context
kp setup           # Install prompts, skills, AGENTS.md
kp doctor          # Installation/runtime diagnostics
omk team ...        # Start/status/shutdown team workers
kp status          # Show active modes
kp cancel          # Cancel active execution modes
kp help            # Show help message
```

## Launch Flags

```
--force            # Force reinstall (overwrite existing)
--dry-run          # Show what would be done
--verbose          # Show detailed output
```

## Agent Prompts

Installed to `~/.kimi/prompts/`:

| Prompt | Purpose |
|--------|---------|
| `/prompts:architect` | System design, boundaries, interfaces |
| `/prompts:executor` | Implementation, refactoring |
| `/prompts:planner` | Task sequencing, execution plans |
| `/prompts:debugger` | Root-cause analysis |
| `/prompts:code-reviewer` | Comprehensive code review |
| `/prompts:security-reviewer` | Security audit |
| `/prompts:test-engineer` | Testing strategy |
| `/prompts:explorer` | Codebase navigation |

## Workflow Skills

Installed to `~/.kimiplugin/skills/`:

| Skill | Purpose |
|-------|---------|
| `$autopilot` | Full autonomous execution |
| `$plan` | Strategic planning |
| `$team` | N coordinated agents |
| `$ralph` | Persistent execution loop |
| `$ultrawork` | Maximum parallelism |
| `$code-review` | Code review |
| `$security-review` | Security audit |
| `$build-fix` | Fix build errors |
| `$tdd` | Test-driven development |
| `$cancel` | Cancel active modes |

## Project Structure

```
oh-my-kimi/
  bin/kimiplugin.js     # CLI entry point
  src/
    cli/                # CLI commands
    utils/              # Path and package utilities
    config/             # Config generation
    state/              # State management
  prompts/              # Agent prompts
  skills/               # Workflow skills
  templates/            # AGENTS.md template
```

## Development

```bash
git clone https://github.com/islee23520/oh-my-kimi.git
cd oh-my-kimi
npm install
npm run build
npm test
```

## License

MIT

## Acknowledgments

This project is heavily inspired by [**oh-my-codex**](https://github.com/Yeachan-Heo/oh-my-codex) by **Yeachan Heo** - a multi-agent orchestration layer for OpenAI Codex CLI.

oh-my-kimi adapts the same concepts and architecture for the Kimi CLI ecosystem.

Thank you to Yeachan Heo for the original concept and implementation!
