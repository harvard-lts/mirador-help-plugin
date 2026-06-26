#!/usr/bin/env node
/**
 * CI coverage wrapper for the LTS reusable TestCoverageNode.yml workflow.
 * The workflow assumes Jest and appends Jest-style --coverage* flags; this
 * repo uses Vitest, which rejects them. Ignore the appended flags and run
 * Vitest emitting json-summary into ./coverage for the workflow to read.
 */
import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', [
  'vitest', 'run',
  '--coverage.enabled=true',
  '--coverage.reportsDirectory=coverage',
  '--coverage.reporter=json-summary',
], { stdio: 'inherit', shell: process.platform === 'win32' });

process.exit(result.status ?? 1);
