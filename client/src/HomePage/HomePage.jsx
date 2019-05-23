import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { NavBar } from '../_components';
import { NotebookList } from '../_components';
import { NoteList } from '../_components';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit*2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;  
        const { classes } = this.props;  
        return (
            <div className={classes.root}>
                <NavBar />
                <Grid container spacing={24}>
                    <Grid item xs={3}><NotebookList className={classes.paper}/></Grid>
                    <Grid item xs={3}><NoteList className={classes.paper}/></Grid>
                </Grid>
            </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    
    return {
        user
    };
}


const connectedHomePage = withStyles(styles)(connect(mapStateToProps)(HomePage));
export { connectedHomePage as HomePage };
