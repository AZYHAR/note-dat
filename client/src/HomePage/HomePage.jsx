import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ButtonAppBar from '../_components/NavBar';
import { NotebookList } from '../_components';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
            
        return (
            <div className="Home">
                <ButtonAppBar />
                <h1>Hi {user.email}!</h1>
                <NotebookList/>
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