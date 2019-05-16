import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ButtonAppBar from '../_components/NavBar';

// The home page component is displayed after signing in to the application, 
// it shows the signed in user's name plus a list of all users in the tutorial application. 

class HomePage extends React.Component {

    render() {
        const { user } = this.props;
        return (
            <div className="Home">
            <ButtonAppBar />
                    <h1>Hi {user.email}!</h1>
                    <p>You're logged in with React and JWT!!</p>
                    <p>
                        <Link to="/login">Logout</Link>
                    </p>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };