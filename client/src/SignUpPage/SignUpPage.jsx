import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, alertActions } from '../_actions';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import { checkPropTypes } from 'prop-types';
import { MySnackbarContentWrapperErrors } from '../_components';

const styles = theme => ({
  container: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  footer: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      username: '',
      password: '',
      name: '',
      password_confirm: '',
      submitted: false,
      error_handle: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password, name, password_confirm } = this.state;
    const { dispatch } = this.props;

    if (password === password_confirm) {
      this.setState({ error_handle: false });
      dispatch(userActions.signup(username, password, name));
    } else {
      this.setState({ error_handle: true });
    }
  }

  render() {
    const { classes } = this.props;
    const { username, password, name, password_confirm } = this.state;

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input
                id='name'
                name='name'
                value={name}
                onChange={this.handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='username'>Username</InputLabel>
              <Input
                id='username'
                name='username'
                value={username}
                onChange={this.handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={this.handleChange}
                error={this.props.error_handle}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password_confirm'>
                Confrim Password
              </InputLabel>
              <Input
                id='password_confirm'
                name='password_confirm'
                type='password'
                value={password_confirm}
                onChange={this.handleChange}
                error={this.state.error_handle}
              />
            </FormControl>

            {this.state.error_handle ? (
              <MySnackbarContentWrapperErrors
                variant='error'
                className={classes.margin}
                message='Passwords does not match'
              />
            ) : (
              <div />
            )}

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign up
            </Button>
          </form>
          <div className={classes.footer}>
            <Typography
              variant='subtitle1'
              align='center'
              color='textSecondary'
              component='p'
            >
              Already have an account? <Link to='/login'>Login here!</Link>
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedSignUpPage = withStyles(styles)(
  connect(mapStateToProps)(SignUpPage)
);
export { connectedSignUpPage as SignUpPage };
