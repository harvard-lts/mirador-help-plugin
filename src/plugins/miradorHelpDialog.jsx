import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { getContainerId } from 'mirador';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DescriptionIcon from '@mui/icons-material/Description';
import ErrorIcon from '@mui/icons-material/Error';

const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeDialog: () => dispatch({ type: 'CLOSE_WINDOW_DIALOG', windowId }),
});

const mapStateToProps = (state, { windowId }) => ({
  containerId: getContainerId(state),
  open: (state.windowDialogs[windowId] && state.windowDialogs[windowId].openDialog === 'help'),
});

function ListItemLink(props) {
  return <ListItemButton component="a" {...props} />;
}

/**
 * harvardHelpDialog ~
*/
export function HarvardHelpDialog({
  closeDialog,
  containerId,
  open = false,
}) {
  if (!open) return null;

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
      <DialogTitle sx={{ paddingBottom: 0 }}>
        <Typography variant="h2">Help</Typography>
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItem sx={{ padding: 0 }}>
            <ListItemLink href="https://ask.library.harvard.edu/faq/392399" target="_blank" rel="noopener">
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText>
                Using the Viewer
                <Typography component="span" sx={visuallyHidden}>(opens in a new tab)</Typography>
              </ListItemText>
            </ListItemLink>
          </ListItem>
          <ListItem sx={{ padding: 0 }}>
            <ListItemLink href="https://nrs.harvard.edu/urn-3:hul.ois:reportaproblem" target="_blank" rel="noopener">
              <ListItemIcon>
                <ErrorIcon />
              </ListItemIcon>
              <ListItemText>
                Report a problem
                <Typography component="span" sx={visuallyHidden}>(opens in a new tab)</Typography>
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

HarvardHelpDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  containerId: PropTypes.string.isRequired,
  open: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
};

export default {
  target: 'Window',
  mode: 'add',
  name: 'harvardHelpDialog',
  component: HarvardHelpDialog,
  mapDispatchToProps,
  mapStateToProps,
};
