import { fade, makeStyles } from '@material-ui/core/styles';

export const navBarStyles = makeStyles((theme) => ({
  grow: {
    padding: theme.spacing(0)
  },
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    padding: theme.spacing(0),
    height: '6vh'
  },
  search: {
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    right: theme.spacing(1),
    width: '100%',
    padding: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      right: theme.spacing(1),
      width: 'auto',
      padding: theme.spacing(0),
    },
  },
  searchIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 5),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25em',
    },
  },
  icons: {
    color: '#fff'
  }
}));

export default navBarStyles;
