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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';

import { notebookActions, alertActions } from '../_actions';

const qs = require('query-string');

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    paperContainer: {
        height: '100%',
        padding: theme.spacing.unit,
    },
    menuButton: {
        display: 'none',
    },
    list: {
        overflow: 'auto',
        height: '93%',
        marginTop: theme.spacing.unit,
        paddingTop: 0,
    },
    listItem: {
        fontSize: '1em',
        margin: theme.spacing.unit,
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        '&:hover $menuButton': {
            display: 'inline-flex',
        }
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
    redText: {
        color: 'red',
    },
    selected: {
        color: '#0000ff',
        background: '#0000ff'
    }
});

function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
}

class NotebookList extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(notebookActions.getAllNotebooks());

        this.state = {
            addDialogOpen: false,
            deleteDialogOpen: false,
            renameDialogOpen: false,
            menuAnchor: null,
            notebookIdSelected: null,
            title: ''
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleOpenAddDialog = () => {
        this.setState({ addDialogOpen: true });
    }

    handleCloseAddDialog = () => {
        this.setState({ addDialogOpen: false });
    }

    handleCreateNoteBook = (e) => {
        e.preventDefault();

        const { title, location, history } = this.state;
        const { dispatch, notebooks } = this.props;

        const notebook_check_existence = notebooks.items.find(x => x.title === title);

        if (title) {
                this.setState({ addDialogOpen: false });
                this.setState({ title: '' });
            if(!notebook_check_existence){
                dispatch(notebookActions.addNotebook(title));
                dispatch(alertActions.success('Notebook ' + title  + ' was created'));
            } else {
                dispatch(alertActions.error('Notebook with this title already exist'));
            }
        }
    }

    handleOpenMenu = (id, event) => {
        this.setState({ menuAnchor: event.currentTarget });
        this.setState({ notebookIdSelected: id });
    }

    handleCloseMenu = () => {
        this.setState({ menuAnchor: null });
        this.setState({ notebookIdSelected: null });
    }

    handleOpenRenameDialog = () => {
        this.setState({ renameDialogOpen: true });
    }

    handleCloseRenameDialog = () => {
        this.setState({ renameDialogOpen: false });
        this.setState({ menuAnchor: null });
        this.setState({ notebookIdSelected: null });
    }

    handleOpenDeleteDialog = () => {
        this.setState({ deleteDialogOpen: true });
    }

    handleCloseDeleteDialog = () => {
        this.setState({ deleteDialogOpen: false });
        this.setState({ menuAnchor: null });
        this.setState({ notebookIdSelected: null });
    }

    handleDeleteNoteBook = (e) => {
        e.preventDefault();

        const { dispatch, location, history, notes} = this.props;
        const { notebookIdSelected, title} = this.state;

        this.setState({ deleteDialogOpen: false });
        this.setState({ menuAnchor: null });
        this.setState({ notebookIdSelected: null });
        this.setState({ title: '' });
        dispatch(notebookActions.deleteNotebook(notebookIdSelected));
        dispatch(alertActions.success('Notebook ' + title  + ' was deleted'));
        history.push({ pathname: '/', search: this.addParameter(location, undefined) })
    }

    handleRenameNotebook = (e) =>   {
        e.preventDefault();
        
        const { dispatch, notebooks } = this.props;
        const { notebookIdSelected, title } = this.state;

        const notebook_check_existence = notebooks.items.find(x => x.title === title);
        
        if (title) {
            this.setState({ renameDialogOpen: false });
            this.setState({ menuAnchor: null });
            this.setState({ notebookIdSelected: null });
            if(!notebook_check_existence){
                dispatch(notebookActions.renameNotebook(notebookIdSelected, title));
                dispatch(alertActions.success('Notebook was renamed on ' + title));
            } else {
                dispatch(alertActions.error('Notebook with this title already exist'));
            }
        }
        
    }

    addParameter(location, notebook_id){
        const query = qs.parse(location.search);
        query.nb = notebook_id;
        query.n = undefined;
        return qs.stringify(query);
    }

    render() {
        const { notebooks, location } = this.props;
        const { classes } = this.props;
        const { title, menuAnchor } = this.state;
        const notebookList = [];
        const selectedNotebookId = qs.parse(location.search).nb;
        if (notebooks.items) {
            notebooks.items.forEach((notebook) => {
                notebookList.push(
                    <ListItemLink
                        key={notebook.id}
                        classes={{
                            container: classes.listItem,
                            selected: classes.selected
                        }}
                        to={{ 
                            pathname: location.pathname,
                            search: this.addParameter(location, notebook.id) 
                        }}
                        selected={selectedNotebookId == notebook.id?true:false}
                    >
                        <ListItemText primary={<Typography noWrap>{notebook.title}</Typography>}/>
                        <ListItemSecondaryAction>
                            <IconButton
                                aria-label="Menu"
                                aria-owns={menuAnchor ? 'notebook-menu' : undefined}
                                aria-haspopup="true"
                                className={classes.menuButton}
                                onClick={this.handleOpenMenu.bind(this, notebook.id)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItemLink>
                );
            });
        }
        notebookList.unshift(
            <Link
                key="allNotes"
                style={{ textDecoration: 'none' }}
                to={{ 
                pathname: location.pathname,
                search: this.addParameter(location, "all")
            }}>
                <Button variant="contained" color="default" className={classes.button} onClick={this.handleDisplayAllNotes}>
                    All Notes
                </Button>
            </Link>
        );

        let notebookListEmpty;
        if (!notebooks.loading && !notebookList.length) {
            notebookListEmpty = true;
        } else {
            notebookListEmpty = false;
        }

        return (
            <div className={classes.container}>
                <Paper className={classes.paperContainer}>
                    <Button variant="contained" color="default" className={classes.button} onClick={this.handleOpenAddDialog}>
                        <AddIcon className={classes.leftIcon} />
                        Create Notebook
                    </Button>
                    <Dialog
                        fullWidth
                        maxWidth='sm'
                        open={this.state.addDialogOpen}
                        onClose={this.handleCloseAddDialog}
                        aria-labelledby="form-add-dialog-title"
                    >
                        <DialogTitle id="form-add-dialog-title">Create Notebook</DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleCreateNoteBook}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="title">Title</InputLabel>
                                    <Input id="title" name="title" value={title} onChange={this.handleChange} autoFocus />
                                </FormControl>
                                <Button onClick={this.handleCloseAddDialog} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    Create
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <div className={classes.list}>
                        <List>
                            {notebookList}
                        </List>
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
                    </div>
                    <Menu
                        id="notebook-menu"
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={this.handleCloseMenu}
                        disableAutoFocusItem={true}
                    >
                        <MenuItem onClick={this.handleOpenRenameDialog}>Rename</MenuItem>
                        <MenuItem onClick={this.handleOpenDeleteDialog} className={classes.redText}>Delete</MenuItem>
                    </Menu>
                    <Dialog
                        fullWidth
                        maxWidth='sm'
                        open={this.state.deleteDialogOpen}
                        onClose={this.handleCloseDeleteDialog}
                        aria-labelledby="delete-dialog-title"
                        aria-describedby="delete-dialog-description"
                    >
                        <DialogTitle id="delete-dialog-title">{"Delete Notebook"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-dialog-description">
                            Warning: This will delete all notes associated with this notebook.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseDeleteDialog} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={this.handleDeleteNoteBook} className={classes.redText} color="primary">
                            Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        fullWidth
                        maxWidth='sm'
                        open={this.state.renameDialogOpen}
                        onClose={this.handleCloseRenameDialog}
                        aria-labelledby="form-rename-dialog-title"
                    >
                        <DialogTitle id="form-rename-dialog-title">Rename Notebook</DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleRenameNotebook}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="title">New Title</InputLabel>
                                    <Input id="title" name="title" value={title} onChange={this.handleChange} autoFocus />
                                </FormControl>
                                <Button onClick={this.handleCloseRenameDialog} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    Save
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
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

const connectedNotebooksList = withRouter(connect(mapStateToProps)(withStyles(styles)(NotebookList)));
export { connectedNotebooksList as NotebookList };
