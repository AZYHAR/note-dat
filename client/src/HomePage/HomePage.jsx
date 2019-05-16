import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ButtonAppBar from '../_components/NavBar';

import { notebookActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(notebookActions.getAllNotebooks());
    }

    render() {
        const { user } = this.props;
        console.log(this.props);
        const { notebooks } = this.props.notebooks;
            
        return (
            <div className="Home">
                <ButtonAppBar />
                <p>Length: {notebooks.length}</p>
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
    const { authentication, notebooks } = state;
    const { user } = authentication;
    
    return {
        user,
        notebooks
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };