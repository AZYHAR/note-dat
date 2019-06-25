import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import { userActions } from '../_actions';

const styles = theme => ({
    container: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    footer: {
        marginTop: theme.spacing.unit * 3,
    },
});

// The login page component renders a login form with username and password fields. 
// It displays validation messages for invalid fields when the user attempts to submit the form. 
// In the constructor() function the userActions.logout() redux action is dispatched which logs the user out if they're logged in, 
// this enables the login page to also be used as the logout page.
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) =>{
        event.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { classes, loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" name="username" value={username} onChange={this.handleChange} autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" name="password" type="password" value={password} onChange={this.handleChange} />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                    </form>
                    <div className={classes.footer}>
                        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                            Don't have an account? <Link to="/signup">Sign Up!</Link>
                        </Typography>
                    </div>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}

const connectedLoginPage = withStyles(styles)(connect(mapStateToProps)(LoginPage));
export { connectedLoginPage as LoginPage }; 
