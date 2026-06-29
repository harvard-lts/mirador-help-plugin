import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { render } from '@testing-library/react';

// Mock `mirador` so we control getContainerId and avoid loading the full bundle
// (which triggers a jsdom canvas error).
const getContainerId = vi.fn();
vi.mock('mirador', () => ({
  getContainerId: (...args) => getContainerId(...args),
}));

const { default: plugin, HarvardHelpDialog } = await import('../src/plugins/miradorHelpDialog.jsx');
const { mapStateToProps, mapDispatchToProps } = plugin;

describe('miradorHelpDialog descriptor', () => {
  it('targets the Window with mode add', () => {
    expect(plugin.target).toBe('Window');
    expect(plugin.mode).toBe('add');
    expect(plugin.name).toBe('harvardHelpDialog');
    expect(plugin.component).toBe(HarvardHelpDialog);
  });
});

describe('mapStateToProps', () => {
  beforeEach(() => getContainerId.mockReset());

  it('maps containerId and open=true when the help dialog is open', () => {
    getContainerId.mockReturnValue('mirador');
    const state = { windowDialogs: { w1: { openDialog: 'help' } } };
    const props = mapStateToProps(state, { windowId: 'w1' });
    expect(props.containerId).toBe('mirador');
    expect(props.open).toBe(true);
  });

  it('maps open=false when a different dialog is open', () => {
    getContainerId.mockReturnValue('mirador');
    const state = { windowDialogs: { w1: { openDialog: 'other' } } };
    const props = mapStateToProps(state, { windowId: 'w1' });
    expect(props.open).toBe(false);
  });

  it('maps open=false when there is no dialog state for the window', () => {
    getContainerId.mockReturnValue('mirador');
    const state = { windowDialogs: {} };
    const props = mapStateToProps(state, { windowId: 'w1' });
    expect(props.open).toBeFalsy();
  });
});

describe('mapDispatchToProps', () => {
  it('dispatches CLOSE_WINDOW_DIALOG for the window', () => {
    const dispatch = vi.fn();
    const { closeDialog } = mapDispatchToProps(dispatch, { windowId: 'w1' });
    closeDialog();
    expect(dispatch).toHaveBeenCalledWith({ type: 'CLOSE_WINDOW_DIALOG', windowId: 'w1' });
  });
});

describe('HarvardHelpDialog component', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <HarvardHelpDialog closeDialog={() => {}} containerId="mirador" windowId="w1" open={false} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
