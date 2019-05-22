import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing.unit,
    },
});

class NotebookList extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(notebookActions.getAllNotebooks());

        this.state = {
            dialogOpen: false,
            menuAnchor: null,
            notebookId: null,
            title: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreateNoteBook = this.handleCreateNoteBook.bind(this);
        this.handleDeleteNoteBook = this.handleDeleteNoteBook.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleOpenDialog = () => {
        this.setState({ dialogOpen: true });
    };

    handleCloseDialog = () => {
        this.setState({ dialogOpen: false });
    };

    handleCreateNoteBook(e) {
        e.preventDefault();

        const { title } = this.state;
        const { dispatch } = this.props;
        if (title) {
            this.setState({ dialogOpen: false });
            this.setState({ title: '' });
            dispatch(notebookActions.addNotebook(title));
        }
    };

    handleOpenMenu = (id, event) => {
        this.setState({ menuAnchor: event.currentTarget });
        this.setState({ notebookId: id });
    };

    handleCloseMenu = () => {
        this.setState({ menuAnchor: null });
        this.setState({ notebookId: null });
    };

    handleDeleteNoteBook(e) {
        e.preventDefault();

        const { dispatch } = this.props;
        const { notebookId } = this.state;

        this.setState({ menuAnchor: null });
        this.setState({ notebookId: null });
        dispatch(notebookActions.deleteNotebook(notebookId));
    };

    render() {
        const { notebooks } = this.props;
        const { classes } = this.props;
        const { title, menuAnchor } = this.state;
        const notebookList = [];
        if (notebooks.items) {
            notebooks.items.forEach((notebook) => {
                notebookList.push(
                    <ListItem key={notebook.id} button className={classes.listItem}>
                        <ListItemText primary={notebook.title} />
                        <ListItemSecondaryAction>
                            <IconButton
                                aria-label="Menu"
                                aria-owns={menuAnchor ? 'notebook-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleOpenMenu.bind(this, notebook.id)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            });
        }
        let notebookListEmpty;
        if (!notebooks.loading && !notebookList.length) {
            notebookListEmpty = true;
        } else {
            notebookListEmpty = false;
        }

        return (
            <div className={classes.container}>
                <Paper className={classes.paperContainer}>
                    <Button variant="contained" color="default" className={classes.button} onClick={this.handleOpenDialog}>
                        <AddIcon className={classes.leftIcon} />
                        Create Notebook
                    </Button>
                    <Dialog
                        fullWidth
                        maxWidth='sm'
                        open={this.state.dialogOpen}
                        onClose={this.handleCloseDialog}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Create Notebook</DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleCreateNoteBook}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="title">Title</InputLabel>
                                    <Input id="title" name="title" value={title} onChange={this.handleChange} autoFocus />
                                </FormControl>
                                <Button onClick={this.handleCloseDialog} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    Create
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <List className={classes.list}>
                        {notebookList}
                    </List>
                    <Menu
                        id="notebook-menu"
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={this.handleCloseMenu}
                        disableAutoFocusItem={true}
                    >
                        <MenuItem onClick={this.handleCloseMenu}>Rename</MenuItem>
                        <MenuItem onClick={this.handleDeleteNoteBook}>Delete</MenuItem>
                    </Menu>
                    {notebookListEmpty &&
                        <div>
                            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                                You don't have any notebooks yet.
                            </Typography>
                            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                                Go ahead and create one!
                            </Typography>
                        </div>}
                    {notebooks.loading && <div className={classes.spinner}><CircularProgress /></div>}
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
