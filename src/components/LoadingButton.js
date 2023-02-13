import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const LoadingButton = ({ loading, ...props }) => {
  
  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        disabled={loading}
        {...props}
      >
        {props.children}
      </Button>
      {loading && <CircularProgress 
        size={24} 
        sx={{ position: 'absolute', top: '50%', left: '50%'}} 
        />}
    </Box>
  );
};

LoadingButton.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.element.isRequired,
};

LoadingButton.defaultProps = {
    loading: false,
};

export default LoadingButton;