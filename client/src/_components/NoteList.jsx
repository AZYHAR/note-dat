import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';

import { noteActions } from '../_actions';

const qs = require('query-string');

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

function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
}

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(noteActions.getAllNotes());

        this.state = {
            addDialogOpen: false,
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

    handleDisplayAllNotes = () =>  {
        
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
        const { title, body } = this.state;
        const notebook_id = qs.parse(location.search).nb;
        const noteList = [];
        if (notes.items) {
            notes.items.forEach((note) => {
                if((note.notebook_id == notebook_id) || (notebook_id == "all"))    {
                    noteList.push(
                        <ListItemLink 
                            key={note.id} 
                            button 
                            className={classes.listItem}
                            to = {{ pathname: location.pathname,
                                    search: this.addParameter(location, note.id)    
                            }}    
                        >
                            <ListItemText primary={note.title} />
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
                    <List className={classes.list}>
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