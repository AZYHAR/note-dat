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

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          anchorEl: null,
          open: false
        }
    }

    handleClick = (event) => {
      this.setState({anchorEl: event.currentTarget});
      this.setState({open: true});
    }

    handleClose = () => {
      this.setState({anchorEl: null});
      this.setState({open: false});
    }

    render() {
        const { classes, user } = this.props;
        const { anchorEl, open } = this.state;
        const options = [
          <Button><Link to="" className={styles.logoutButton}>Change Password</Link></Button>,
          <Button><Link to="/login" className={styles.logoutButton}>Logout</Link></Button>,
        ];
        
        return (
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  NoteDat
                </Typography>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Hi {user.name}!
                </Typography>
                <div>
                  <IconButton
                    aria-label="More"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <AccountCircle/>
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                      },
                    }}
                  >
                    {options.map(option => (
                      <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
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
