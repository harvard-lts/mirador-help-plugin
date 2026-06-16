import { describe, it, expect } from 'vitest';
import plugins, { MiradorHelpPlugin, MiradorHelpDialogPlugin } from '../src/index.js';

describe('mirador-help-plugin smoke test', () => {
  it('exports the help plugins', () => {
    expect(MiradorHelpPlugin).toBeDefined();
    expect(MiradorHelpDialogPlugin).toBeDefined();
  });

  it('exports an array of plugins as the default export', () => {
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins).toHaveLength(2);
    expect(plugins).toContain(MiradorHelpPlugin);
    expect(plugins).toContain(MiradorHelpDialogPlugin);
  });

  it('configures each plugin with a target and component', () => {
    plugins.forEach((plugin) => {
      expect(typeof plugin.target).toBe('string');
      expect(plugin.target.length).toBeGreaterThan(0);
      expect(plugin.component).toBeDefined();
    });
  });

  it('registers the help menu item plugin against the window top bar menu', () => {
    expect(MiradorHelpPlugin.target).toBe('WindowTopBarPluginMenu');
    expect(MiradorHelpPlugin.mode).toBe('add');
    expect(MiradorHelpPlugin.name).toBe('harvardHelpPlugin');
    expect(typeof MiradorHelpPlugin.mapDispatchToProps).toBe('function');
  });
});
