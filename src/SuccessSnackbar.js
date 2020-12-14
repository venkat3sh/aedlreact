import React from 'react';

// Material UI Imports
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function SuccessSnackbar( { open, handleSnackbarClose, responseMessage } ) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleSnackbarClose();
  };

  return (
    <div className="snackbar-wrapper">
      {responseMessage ? (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <SnackbarContent 
          style={{
          backgroundColor:'#f44336',
          }}
          message={`${responseMessage}`}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          />
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          >
          <SnackbarContent 
          style={{
            backgroundColor:'#098f3b',
          }}
          message={`${responseMessage}`}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          />
        </Snackbar>
      )}
    </div>
  );
}

export default SuccessSnackbar