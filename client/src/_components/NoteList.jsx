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
import { Link, withRouter } from 'react-router-dom';

import { noteActions } from '../_actions';

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
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'block',
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
    selected: {
        color: '#0000ff',
        background: '#0000ff'
    }
});

function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
}

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(noteActions.getAllNotes());

        this.state = {
            addDialogOpen: false,
            menuAnchor: null,
            title: '',
            body: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreateNote = this.handleCreateNote.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleOpenAddDialog = () => {
        this.setState({ addDialogOpen: true });
    }

    handleCloseDialog = () => {
        this.setState({ addDialogOpen: false });
    }

    handleOpenMenu = (id, event) => {
        this.setState({ menuAnchor: event.currentTarget });
    }

    handleCloseMenu = () => {
        this.setState({ menuAnchor: null });
    }

    handleCreateNote(e) {
        e.preventDefault();

        //get id of notebook
        const notebook_id = qs.parse(location.search).nb;

        const { title } = this.state;
        const { dispatch } = this.props;
        if (title) {
            this.setState({ addDialogOpen: false });
            this.setState({ title: '' });
            this.setState({ body: '' });
            //add notebook id
            dispatch(noteActions.addNote(title, '', notebook_id));
        }
    }

    addParameter(location, id){
        const query = qs.parse(location.search);
        query.n = id;
        return qs.stringify(query);
    }

    render() {
        const { notes, classes, location } = this.props;
        const { title, body, menuAnchor } = this.state;
        const notebook_id = qs.parse(location.search).nb;
        const noteList = [];
        const selectedNoteId = qs.parse(location.search).n;
        if (notes.items) {
            notes.items.forEach((note) => {
                if((note.notebook_id == notebook_id) || (notebook_id == "all"))    {
                    noteList.push(
                        <ListItemLink 
                            key={note.id}
                            classes={{
                                container: classes.listItem,
                                selected: classes.selected
                            }}
                            to = {{ 
                                pathname: location.pathname,
                                search: this.addParameter(location, note.id)    
                            }}   
                            selected={selectedNoteId == note.id?true:false}
                        >
                            <ListItemText primary={<Typography noWrap>{note.title}</Typography>}/>
                            <ListItemSecondaryAction>
                            <IconButton
                                aria-label="Menu"
                                aria-owns={menuAnchor ? 'note-menu' : undefined}
                                aria-haspopup="true"
                                className={classes.menuButton}
                                onClick={this.handleOpenMenu.bind(this, note.id)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItemLink>
                    );
                }
            });
        }

        let noteListEmpty;
        if (!notes.loading && !noteList.length) {
            noteListEmpty = true;
        } else {
            noteListEmpty = false;
        }
        
        return (
            <div className={classes.container}>
                <Paper className={classes.paperContainer}>
                    <Button variant="contained" color="default" className={classes.button} onClick={this.handleOpenAddDialog}>
                        <AddIcon className={classes.leftIcon} />
                        Create Note
                    </Button>
                    <Dialog
                        fullWidth
                        maxWidth='sm'
                        open={this.state.addDialogOpen}
                        onClose={this.handleCloseDialog}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Create Note</DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleCreateNote}>
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
                    <div className={classes.list}>
                        <List>
                            {noteList}
                        </List>
                        {noteListEmpty && 
                            <div>
                                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                                    You don't have any notes yet.
                                </Typography>
                                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                                    Go ahead and create one!
                                </Typography>
                            </div>}
                        {notes.loading && <div className={classes.spinner}><CircularProgress /></div>}
                    </div>
                    <Menu
                        id="note-menu"
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={this.handleCloseMenu}
                        disableAutoFocusItem={true}
                    >
                        <MenuItem>Rename</MenuItem>
                        <MenuItem className={classes.redText}>Delete</MenuItem>
                    </Menu>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { notes } = state;
    
    return {
        notes
    };
}

const connectedNotesList = withRouter(connect(mapStateToProps)(withStyles(styles)(NoteList)));
export { connectedNotesList as NoteList };
