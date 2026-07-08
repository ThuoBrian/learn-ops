#!/usr/bin/env node
/**
 * menu.mjs — Interactive guided menu for non-technical users.
 * Run: node menu.mjs  (or: npm run menu)
 */

import { select, confirm, Separator } from '@inquirer/prompts';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));

const bold  = (s) => `\x1b[1m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const dim   = (s) => `\x1b[2m${s}\x1b[0m`;

function run(script, args = []) {
  return new Promise((resolve) => {
    const child = spawn('node', [join(__dir, script), ...args], {
      stdio: 'inherit',
      cwd: __dir,
    });
    child.on('close', resolve);
  });
}

function clear() { process.stdout.write('\x1Bc'); }

function header() {
  console.log(bold('\n  Learn-Ops — Free Training Finder'));
  console.log('  ' + '─'.repeat(36));
  console.log('');
}

async function pause() {
  await select({
    message: 'Press Enter to return to the menu',
    choices: [{ name: '← Back', value: 'back' }],
  });
}

// ─── screens ────────────────────────────────────────────────────────────────

async function scanScreen() {
  console.log('Scanning for free trainings across all providers...\n');
  await run('scan.mjs');
}

async function trackerScreen() {
  console.log('Loading your enrollments...\n');
  await run('tracker.mjs', ['query']);
}

async function healthScreen() {
  console.log('Running system health check...\n');
  await run('doctor.mjs');
}

async function updateScreen() {
  console.log('Checking for updates...\n');
  await run('update-system.mjs', ['check']);
  console.log('');
  const apply = await confirm({ message: 'Apply update now?', default: false });
  if (apply) await run('update-system.mjs', ['apply']);
}

function claudeInstructions(title, command) {
  console.log(yellow(`  ${title}\n`));
  console.log('  This feature is powered by Claude Code (the AI assistant).');
  console.log('  Steps:');
  console.log(`    1. In your terminal, type:  ${bold('claude')}`);
  console.log(`    2. Then type:               ${bold(command)}`);
  console.log('');
  console.log(dim('  (If Claude Code is not installed, ask your system administrator.)'));
}

// ─── main loop ──────────────────────────────────────────────────────────────

async function main() {
  clear();
  header();

  while (true) {
    const action = await select({
      message: 'What would you like to do?',
      choices: [
        { name: '  Find free trainings',          value: 'scan'     },
        { name: '  View my enrollments',          value: 'tracker'  },
        { name: '  Check system health',          value: 'health'   },
        { name: '  Update the system',            value: 'update'   },
        new Separator(),
        { name: '  Evaluate a course (needs Claude)',       value: 'course'   },
        { name: '  Process pending URLs (needs Claude)',    value: 'pipeline' },
        { name: '  My enrollment roadmap (needs Claude)',   value: 'roadmap'  },
        new Separator(),
        { name: '  Exit', value: 'exit' },
      ],
      pageSize: 12,
    });

    clear();
    header();

    switch (action) {
      case 'scan':
        await scanScreen();
        break;

      case 'tracker':
        await trackerScreen();
        break;

      case 'health':
        await healthScreen();
        break;

      case 'update':
        await updateScreen();
        break;

      case 'course':
        claudeInstructions(
          'Evaluate a Course',
          '/learn-ops course <paste the course URL here>',
        );
        break;

      case 'pipeline':
        claudeInstructions(
          'Process Pending Courses',
          '/learn-ops learn-pipeline',
        );
        break;

      case 'roadmap':
        claudeInstructions(
          'My Learning Roadmap',
          '/learn-ops learnplan',
        );
        break;

      case 'exit':
        console.log(green('  Goodbye!\n'));
        process.exit(0);
    }

    console.log('');
    await pause();
    clear();
    header();
  }
}

main().catch((err) => {
  if (err.name === 'ExitPromptError') {
    console.log(green('\n  Goodbye!\n'));
    process.exit(0);
  }
  console.error('\nError:', err.message);
  process.exit(1);
});
