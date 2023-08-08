import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { getContainerId } from 'mirador/dist/es/src/state/selectors/config';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import DescriptionIcon from '@material-ui/icons/Description';
import ErrorIcon from '@material-ui/icons/Error';

const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeDialog: () => dispatch({ type: 'CLOSE_WINDOW_DIALOG', windowId }),
});

const mapStateToProps = (state, { windowId }) => ({
  open: (state.windowDialogs[windowId] && state.windowDialogs[windowId].openDialog === 'help'),
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

/**
 * harvardHelpDialog ~
*/
export class harvardHelpDialog extends Component {
  /**
   * Returns the rendered component
  */
  render() {
    const {
      classes,
      closeDialog,
      containerId,
      open,
      windowId,
    } = this.props;

    if (!open) return ('');

    return (
      <Dialog
        container={document.querySelector(`#${containerId} .mirador-viewer`)}
        disableEnforceFocus
        onClose={closeDialog}
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle disableTypography className={classes.h2}>
          <Typography variant="h2">Help</Typography>
        </DialogTitle>
        <DialogContent>         
          <List>
            <ListItem className={classes.helpItem}>
              <ListItemLink href="https://wiki.harvard.edu/confluence/display/LibraryStaffDoc/Harvard+Library+Viewer" target="_blank" rel="noopener">
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText>
                  Read documentation
                  <Typography variant="srOnly">(opens in a new tab)</Typography>
                </ListItemText>
              </ListItemLink>
            </ListItem>
            <ListItem className={classes.helpItem}>
              <ListItemLink href="https://nrs.harvard.edu/urn-3:hul.ois:reportaproblem" target="_blank" rel="noopener">
                <ListItemIcon>
                  <ErrorIcon />
                </ListItemIcon>
                <ListItemText>
                  Report a problem
                  <Typography variant="srOnly">(opens in a new tab)</Typography>
                </ListItemText>
              </ListItemLink>
            </ListItem>
          </List>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

harvardHelpDialog.propTypes = {
  classes: PropTypes.shape({
    h2: PropTypes.string,
    h3: PropTypes.string,
    helpItem: PropTypes.string,
  }).isRequired,
  closeDialog: PropTypes.func.isRequired,
  containerId: PropTypes.string.isRequired,
  open: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
};

harvardHelpDialog.defaultProps = {
  canvases: [],
  open: false,
};

const styles = () => ({
  h2: {
    paddingBottom: 0,
  },
  h3: {
    marginTop: '20px',
  },
  helpItem: {
    padding: 0,
  }
});

export default {
  target: 'Window',
  mode: 'add',
  name: 'harvardHelpDialog',
  component: withStyles(styles)(harvardHelpDialog),
  mapDispatchToProps,
  mapStateToProps,
};
