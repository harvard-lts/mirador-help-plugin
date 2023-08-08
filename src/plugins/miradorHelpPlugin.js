import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import HelpIcon from '@material-ui/icons/Help';

const helpDialogReducer = (state = {}, action) => {
  if (action.type === 'OPEN_WINDOW_DIALOG') {
    return {
      ...state,
      [action.windowId]: {
        openDialog: action.dialogType,
      },
    };
  }

  if (action.type === 'CLOSE_WINDOW_DIALOG') {
    return {
      ...state,
      [action.windowId]: {
        openDialog: null,
      },
    };
  }
  return state;
};

const mapDispatchToProps = (dispatch, { windowId }) => ({
  openHelpDialog: () => dispatch({ type: 'OPEN_WINDOW_DIALOG', windowId, dialogType: 'help' }),
});

class harvardHelp extends Component {
  openDialogAndCloseMenu() {
    const { handleClose, openHelpDialog } = this.props;

    openHelpDialog();
    handleClose();
  }

  render() {
    return (
      <div>
        <MenuItem onClick={() => this.openDialogAndCloseMenu()}>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
            Help
          </ListItemText>
        </MenuItem>
      </div>
    );
  }
}

harvardHelp.propTypes = {
  handleClose: PropTypes.func,
  openDownloadDialog: PropTypes.func,
};

harvardHelp.defaultProps = {
  handleClose: () => {},
  openDownloadDialog: () => {},
};

export default {
  target: 'WindowTopBarPluginMenu',
  mode: 'add',
  name: 'harvardHelpPlugin',
  component: harvardHelp,
  mapDispatchToProps,
  reducers: {
    windowDialogs: helpDialogReducer,
  },
}