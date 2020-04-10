import React from 'react';

import { Toolbar } from '@material-ui/core';

const CustomToolbar = ({ children, ...props }) => (
  <Toolbar {...props}>
    {children}
  </Toolbar>
);

export default CustomToolbar;
