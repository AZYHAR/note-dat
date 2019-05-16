import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import { notebookActions } from '../_actions';

const styles = ({
    list: {
      width: 250,
      maxWidth: 250,
      height: '100vw'
    },
    notebookTitle: {
        fontize: 30
    }
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
                            <ListItem key={notebook.id} button>
                                <ListItemText classes={classes.notebokTitle} primary={notebook.title} />
                            </ListItem>
                        );
        });

        return (
            <div className={classes.list}>
                <List>
                    {notebookList}
                </List>
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