import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';

const styles = theme => ({
    container: {
        width: '100%',
        margin: theme.spacing.unit,
        alignItems: 'center',
        padding: 0,
    },
    paperContainer: {
        height: '100%',
        padding: theme.spacing.unit,
    },
});

class Note extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Paper className={classes.paperContainer}>
                    <p>Note Component placeholder</p>
                </Paper>
            </div>
        )
    }
}

const connectedNote = withStyles(styles)(withRouter(connect()(Note)));
export { connectedNote as Note };