import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

const ITEM_HEIGHT = 48;

const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logoutButton: {
    color: '#ffffff',
    textDecoration: 'none'
  }
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false,
      openChangePwd: false,
      currentPwd: '',
      newPwd: '',
      confirmNewPwd: ''
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ open: true });
  }

  handleClickChangePwd = () => {
    this.setState({ openChangePwd: true });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: false });
  };

  handleCloseChangePwd = () => {
    this.setState({ openChangePwd: false });
  };

  render() {
    const { classes, user } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit' className={classes.grow}>
              NoteDat
            </Typography>
            <Typography variant='h6' color='inherit' className={classes.grow}>
              Hi {user.name}!
            </Typography>
            <Button>
              <Link to='/login' className={styles.logoutButton}>
                Logout
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;

  return {
    user
  };
}

const connectedNavBar = withStyles(styles)(connect(mapStateToProps)(NavBar));
export { connectedNavBar as NavBar };
