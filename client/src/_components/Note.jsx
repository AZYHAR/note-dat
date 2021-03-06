import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { noteActions } from '../_actions/note.actions';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { notebookActions } from '../_actions';


const qs = require('query-string');

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    paperContainer: {
        height: '100%',
        overflow: 'auto',
        padding: theme.spacing.unit,
    },
    emptyPaperContainer: {
        height: '100%',
        padding: theme.spacing.unit,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',  
    },
    inputHeader: {
        fontSize: 30,
        width: '100%'
    },
    inputBody: {
        overflowY: 'auto',
    },
    resizeButton: {
        margin: '10px',
        padding: '10px'
    },
    captionCreated: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 3,
    },
    captionModified: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 3,
    },
    inline: {
        display: 'flex',
        alignItems: 'center'
    },
});

const WAIT_INTERVAL = 400;

const ENTER_KEY = 13;

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            header: '',
            body: '',
            createdDate: '',
            modifiedDate: '',
            note: null,
            last_note_id: undefined
        }
        this.timer = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.triggerSave = this.triggerSave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { location, notes } = nextProps;
        const note_id = qs.parse(location.search).n;
        const note = notes.items.find((note) => note.id == note_id);
        if(note != undefined){
            this.setState({ id: note_id, createdDate: note.creation_date, modifiedDate: note.modified_date});
            if(this.state.last_note_id != note_id){
                this.setState({header: note.title});
                this.setState({body: note.body});
                this.setState({last_note_id: note_id});
            }
        } else {
            this.setState({ id: undefined,
                header: '',
                body: '',
                createdDate: '',
                modifiedDate: '',
                note: null,
                last_note_id: undefined
            });
        }
    }

    handleInputChange(e) {
        clearTimeout(this.timer);
        
        this.setState({
            [e.target.name]: e.target.value
        });
        this.timer = setTimeout(this.triggerSave, WAIT_INTERVAL);
    }

    triggerSave() {
        const { header, body } = this.state;
        const { dispatch } = this.props;
        const notebook_id = qs.parse(this.props.location.search).nb;
        const id = qs.parse(this.props.location.search).n;
        dispatch(noteActions.updateNote(id, header, body, notebook_id));
        dispatch(notebookActions.sortNotebook(notebook_id));
        this.setState({ modifiedDate: new Date() });
    }

    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    handleChangeSize = () => {
        this.props.dispatch(noteActions.resizeNote(!this.props.notes.NoteFullScreen));
    }

    render() {
        const { classes} = this.props;
        const { id} = this.state;
        const { NoteFullScreen } = this.props.notes;

        return (
            <div className={classes.container}>
                { id === undefined &&
                    <Paper className={classes.paperContainer}>
                        <Typography gutterBottom variant="h5" component="h2">
                            <InputBase 
                                classes={{
                                    input: classes.inputHeader
                                }}
                                value="Select note for input"
                                fullWidth={true}
                                disabled={true}
                            />
                        </Typography>
                    </Paper>
                }   
                { id != undefined &&
                    <Paper className={classes.paperContainer}>
                        <div className={classes.inline}>
                            <InputBase 
                                        classes={{
                                            input: classes.inputHeader
                                        }}
                                        name='header'
                                        value={this.state.header}
                                        placeholder='Untitled'
                                        fullWidth={true}
                                        onChange={this.handleInputChange}
                                />
                            <IconButton className={classes.resizeButton} onClick={this.handleChangeSize}> {NoteFullScreen ? <ChevronRight/> : <ChevronLeft/>} </IconButton> 
                        </div>

                        <InputBase 
                            classes={{
                                input: classes.inputBody
                            }}
                            name='body'
                            placeholder='Start typing here...'
                            value={this.state.body}
                            fullWidth={true}
                            multiline={true}
                            onChange={this.handleInputChange}
                        />

                        <Typography className={classes.captionModified} variant="caption" >
                            Modified: {this.formatDate(this.state.modifiedDate)}
                        </Typography>
                        <Typography className={classes.captionCreated} variant="caption">
                            Created: {this.formatDate(this.state.createdDate)}
                        </Typography>
                    </Paper>
                }
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

const connectedNote = withStyles(styles)(withRouter(connect(mapStateToProps)(Note)));
export { connectedNote as Note };
