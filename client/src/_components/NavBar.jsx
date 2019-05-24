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

const styles = {
  root: {
    flexGrow: 1,
  },
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
    }

    render() {
        const { classes, user } = this.props;

        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  NoteDat
                </Typography>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Hi {user.name}!
                </Typography>
                <Button><Link to="/login" className={classes.logoutButton}>Logout</Link></Button>
              </Toolbar>
            </AppBar>
          </div>
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
