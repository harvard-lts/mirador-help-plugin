import {
  describe, it, expect, vi,
} from 'vitest';
import { render } from '@testing-library/react';

import plugin from '../src/plugins/miradorHelpPlugin.jsx';

const { component: HarvardHelp, mapDispatchToProps, reducers } = plugin;

describe('miradorHelpPlugin descriptor', () => {
  it('targets the window top bar menu with mode add', () => {
    expect(plugin.target).toBe('WindowTopBarPluginMenu');
    expect(plugin.mode).toBe('add');
    expect(plugin.name).toBe('harvardHelpPlugin');
  });
});

describe('mapDispatchToProps', () => {
  it('dispatches OPEN_WINDOW_DIALOG with the help dialog type', () => {
    const dispatch = vi.fn();
    const { openHelpDialog } = mapDispatchToProps(dispatch, { windowId: 'w1' });
    openHelpDialog();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'OPEN_WINDOW_DIALOG', windowId: 'w1', dialogType: 'help',
    });
  });
});

describe('windowDialogs reducer', () => {
  const reducer = reducers.windowDialogs;

  it('opens the dialog for a window', () => {
    const next = reducer({}, { type: 'OPEN_WINDOW_DIALOG', windowId: 'w1', dialogType: 'help' });
    expect(next.w1.openDialog).toBe('help');
  });

  it('closes the dialog for a window', () => {
    const next = reducer({}, { type: 'CLOSE_WINDOW_DIALOG', windowId: 'w1' });
    expect(next.w1.openDialog).toBeNull();
  });

  it('returns state unchanged for unknown actions', () => {
    const state = { w1: { openDialog: 'help' } };
    expect(reducer(state, { type: 'NOOP' })).toBe(state);
  });
});

describe('HarvardHelp component', () => {
  it('opens the help dialog and closes the menu on click', () => {
    const openHelpDialog = vi.fn();
    const handleClose = vi.fn();
    const { getByRole } = render(
      <HarvardHelp openHelpDialog={openHelpDialog} handleClose={handleClose} />,
    );
    getByRole('menuitem').click();
    expect(openHelpDialog).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});
