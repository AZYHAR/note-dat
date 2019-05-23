import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { SignUpPage } from '../SignUpPage';
import { Alert } from '../_components'

class App extends React.Component {
    constructor(props) {
        super(props);
        
        // Giving all the data to the store
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        console.log(alert);
        return (
            <React.Fragment>
                <CssBaseline />
                {alert.message &&
                    <Alert type = {alert.type} message = {alert.message} />
                }
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/signup" component={SignUpPage} />
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };