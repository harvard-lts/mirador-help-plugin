import PropTypes from 'prop-types';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import HelpIcon from '@mui/icons-material/Help';

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

function HarvardHelp({ handleClose = () => {}, openHelpDialog = () => {} }) {
  const openDialogAndCloseMenu = () => {
    openHelpDialog();
    handleClose();
  };

  return (
    <div>
      <MenuItem onClick={openDialogAndCloseMenu}>
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

HarvardHelp.propTypes = {
  handleClose: PropTypes.func,
  openHelpDialog: PropTypes.func,
};

export default {
  target: 'WindowTopBarPluginMenu',
  mode: 'add',
  name: 'harvardHelpPlugin',
  component: HarvardHelp,
  mapDispatchToProps,
  reducers: {
    windowDialogs: helpDialogReducer,
  },
};
