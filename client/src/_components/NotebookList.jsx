import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import { notebookActions } from '../_actions';

const styles = theme => ({
    container: {
        width: '20%',
        margin: theme.spacing.unit,
        alignItems: 'center',
        padding: 0,
    },
    paperContainer: {
        height: '100%',
        padding: theme.spacing.unit,
    },
    listItem: {
        fontSize: '1em',
        marginTop: theme.spacing.unit,
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    },
    button: {
        width: '100%',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

class NotebookList extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(notebookActions.getAllNotebooks());
    }

    render() {
        const { classes } = this.props;
        const { notebooks } = this.props.notebooks;
        const notebookList = [];
        notebooks.forEach((notebook) => {
            notebookList.push(
                <ListItem key={notebook.id} button className={classes.listItem}>
                    <ListItemText primary={notebook.title} />
                </ListItem>
            );
        });

        return (
            <div className={classes.container}>
                <Paper className={classes.paperContainer}>
                    <Button variant="contained" color="default" className={classes.button}>
                        <AddIcon className={classes.leftIcon} />
                        Create Notebook
                    </Button>
                    <List className={classes.list}>
                        {notebookList}
                    </List>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { notebooks } = state;
    
    return {
        notebooks
    };
}

const connectedNotebooksList = withStyles(styles)(connect(mapStateToProps)(NotebookList));
export { connectedNotebooksList as NotebookList };
