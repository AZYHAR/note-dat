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
          open: false,
          openChangePwd: false,
          currentPwd: '',
          newPwd: '',
          confirmNewPwd: ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
      this.setState({anchorEl: event.currentTarget});
      this.setState({open: true});
    }

    handleClickChangePwd = () =>  {
      this.setState({openChangePwd: true});
    }

    handleChangePwd = (event) => {

    }

    handleChangeTextField = (event) =>  {
      switch(event.target.id)  {
        case "currentPwd":
          this.setState({currentPwd: event.target.value});
          break;
        case "newPwd":
          this.setState({newPwd: event.target.value});
          break;
        case "confirmNewPwd":
          this.setState({confirmNewPwd: event.target.value});
          break;
      }
    }

    handleClose = () => {
      this.setState({anchorEl: null});
      this.setState({open: false});
    }

    handleCloseChangePwd = () => {
      this.setState({openChangePwd: false});
    }

    render() {
        const { classes, user } = this.props;
        const { anchorEl, open } = this.state;
        const options = [
          <Button onClick={this.handleClickChangePwd}>Change Password</Button>,
          <Button><Link to="/login" className={styles.logoutButton}>Logout</Link></Button>,
        ];
        
        return (
          <div>
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
                    {options.map((option, index) => (
                      <MenuItem key={index} selected={option === 'Pyxis'} onClick={this.handleClose}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
            <Dialog open={this.state.openChangePwd} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Change password</DialogTitle>
              <DialogContent>
                <TextField
                  value={this.state.currentPwdValue}
                  onChange={this.handleChangeTextField}
                  autoFocus
                  margin="dense"
                  id="currentPwd"
                  label="Current password"
                  type="password"
                  placeholder="Current password"
                  fullWidth
                  />
                <TextField
                  value={this.state.newPwd}
                  onChange={this.handleChangeTextField}
                  margin="dense"
                  id="newPwd"
                  label="New password"
                  type="password"
                  placeholder="New password"
                  fullWidth
                  />
                <TextField
                  value={this.state.confirmNewPwd}
                  onChange={this.handleChangeTextField}
                  margin="dense"
                  id="confirmNewPwd"
                  label="Confirm new password"
                  type="password"
                  placeholder="New password"
                  fullWidth
                  />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseChangePwd} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleChangePwd} color="primary">
                  Change password
                </Button>
              </DialogActions>
            </Dialog>
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
