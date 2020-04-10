import * as React from 'react';

import { AppBar, InputBase, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckNewEmail from '@material-ui/icons/EmailSharp';
import AddEmail from '@material-ui/icons/AddSharp';
import DeleteEmail from '@material-ui/icons/DeleteForeverSharp';
import AddFlag from '@material-ui/icons/FlagSharp';
import Reply from '@material-ui/icons/ReplySharp';
import ReplyAll from '@material-ui/icons/ReplyAllSharp';
import Forward from '@material-ui/icons/ForwardSharp';


import CustomToolbar from '../toolbar';
import CustomIconButton from '../../shared/buttons/CustomIconButton';

import { navBarStyles } from '../../../../public/styles/jss/navBar.styles';

const NavigationBar = () => {
  const classes = navBarStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="relative" className={classes.appBar}>
        <CustomToolbar>
          <div>
            <>
              <CustomIconButton>
                <CheckNewEmail className={classes.icons} />
              </CustomIconButton>
              <CustomIconButton>
                <AddEmail className={classes.icons} />
              </CustomIconButton>
              <CustomIconButton>
                <DeleteEmail className={classes.icons} />
              </CustomIconButton>
              <CustomIconButton>
                <AddFlag className={classes.icons} />
              </CustomIconButton>

              <CustomIconButton style={{ marginLeft: '50px' }}>
                <Reply className={classes.icons} />
              </CustomIconButton>
              <CustomIconButton>
                <ReplyAll className={classes.icons} />
              </CustomIconButton>
              <CustomIconButton>
                <Forward className={classes.icons} />
              </CustomIconButton>
            </>
          </div>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="search....."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.grow} />
        </CustomToolbar>
      </AppBar>
      <Divider light={true} />
    </div>
  );
};

export default NavigationBar;
