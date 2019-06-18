import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

const ITEM_HEIGHT = 48;

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logoutButton: {
    color: '#ffffff',
    textDecoration: 'none',
  }
};

const options = [
  <Button><Link to="" className={styles.logoutButton}>Change Password</Link></Button>,
  <Button><Link to="/login" className={styles.logoutButton}>Logout</Link></Button>,
];

function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircle/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, user } = this.props;
        
        return (
            <AppBar position="static">
              <Toolbar>
                {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"> */}
                  {/* <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  NoteDat
                </Typography>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Hi {user.name}!
                </Typography>
                {/* <Button><Link to="/login" className={classes.logoutButton}>Logout</Link></Button> */}
                <LongMenu/>
              </Toolbar>
            </AppBar>
        )
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
