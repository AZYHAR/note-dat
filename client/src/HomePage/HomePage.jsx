import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../_components';
import { NotebookList } from '../_components';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, dispatch } = this.props;

        return (
            <div className="Home">
                <NavBar />
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
