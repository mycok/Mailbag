import * as React from 'react';
import { element, InferProps } from 'prop-types';

import { IconButton } from '@material-ui/core';


const CustomIconButton = ({ children, ...props }) => (
  <IconButton
    {...props}
    aria-label="icon-button"
  >
    {children}
  </IconButton>

);

CustomIconButton.propTypes = {
  children: element
};

CustomIconButton.defaultProps = {
  children: undefined,
};

export default CustomIconButton;