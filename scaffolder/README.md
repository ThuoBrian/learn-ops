# learn-ops

One-command installer for [**learn-ops**](https://github.com/ThuoBrian/learn-ops) — the AI-powered free training finder for IT professionals.

```bash
git clone https://github.com/ThuoBrian/learn-ops.git
cd learn-ops
npm install
```

This sets up a ready-to-use workspace:

1. Clones learn-ops at the latest stable release
2. Installs dependencies

Then open your AI coding tool in the folder. **On first launch the agent walks you through setup — your IT background, target track, and learning goals — just by chatting.** Nothing to configure by hand. learn-ops is AI-agnostic — Claude Code, Gemini, Codex, Qwen, OpenCode, GitHub Copilot CLI, Antigravity CLI, and Grok Build CLI all work.

The installer bootstraps CLI skill entrypoints after clone, so new CLIs (e.g. Grok) work even when `npx` pulled an older release tag.

## Usage

```bash
git clone https://github.com/ThuoBrian/learn-ops.git [folder]   # default folder: ./learn-ops
cd learn-ops
npm install
```

**Windows users:** See [INSTALL.md](../INSTALL.md) for a guided setup using `setup.bat` and `run.bat` — no terminal commands required after the initial setup.

## Requirements

- Node.js 18+
- git

## License

MIT © Brian Thuo
