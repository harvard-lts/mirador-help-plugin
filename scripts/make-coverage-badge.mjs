#!/usr/bin/env node
/**
 * Generates a self-hosted coverage badge (coverage.svg) with no third-party
 * service. Reads line coverage from coverage/coverage-summary.json (produced by
 * `npm run test:unit`) and writes a shields-style SVG to the repo root.
 *
 * The CI workflow (.github/workflows/coverage-node.yml) commits coverage.svg to
 * the `badges/test-coverage` branch, which the README references via the raw URL.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SUMMARY_PATH = 'coverage/coverage-summary.json';
const OUTPUT_PATH = 'coverage.svg';

/** Pick a badge color by coverage percentage (mirrors shields.io defaults). */
function colorFor(pct) {
  if (pct >= 90) return '#4c1'; // brightgreen
  if (pct >= 80) return '#97ca00'; // green
  if (pct >= 70) return '#a4a61d'; // yellowgreen
  if (pct >= 60) return '#dfb317'; // yellow
  if (pct >= 50) return '#fe7d37'; // orange
  return '#e05d44'; // red
}

let summary;
try {
  summary = JSON.parse(readFileSync(SUMMARY_PATH, 'utf8'));
} catch (err) {
  console.error(`Could not read ${SUMMARY_PATH}: ${err.message}`);
  console.error('Run `npm run test:unit` first to generate the coverage summary.');
  process.exit(1);
}

const pct = summary?.total?.lines?.pct;
if (typeof pct !== 'number') {
  console.error(`No total.lines.pct found in ${SUMMARY_PATH}`);
  process.exit(1);
}

const label = 'coverage';
const value = `${pct}%`;
const color = colorFor(pct);

// Approximate text widths (px) at font-size 11 — good enough for a static badge.
const labelWidth = 6 * label.length + 10;
const valueWidth = 6 * value.length + 10;
const totalWidth = labelWidth + valueWidth;
const labelMid = (labelWidth / 2) * 10;
const valueMid = (labelWidth + valueWidth / 2) * 10;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth}" height="20" role="img" aria-label="${label}: ${value}">
  <title>${label}: ${value}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r"><rect width="${totalWidth}" height="20" rx="3" fill="#fff"/></clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${color}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
    <text aria-hidden="true" x="${labelMid}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${(labelWidth - 10) * 10}">${label}</text>
    <text x="${labelMid}" y="140" transform="scale(.1)" fill="#fff" textLength="${(labelWidth - 10) * 10}">${label}</text>
    <text aria-hidden="true" x="${valueMid}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${(valueWidth - 10) * 10}">${value}</text>
    <text x="${valueMid}" y="140" transform="scale(.1)" fill="#fff" textLength="${(valueWidth - 10) * 10}">${value}</text>
  </g>
</svg>
`;

writeFileSync(OUTPUT_PATH, svg);
console.log(`Wrote ${OUTPUT_PATH} (${label} ${value}, color ${color})`);
