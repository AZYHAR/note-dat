import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { noteActions } from '../_actions/note.actions';

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
        fontSize: 30
    },
    inputBody: {
        overflowY: 'hidden'
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
    }
});

const WAIT_INTERVAL = 300;

const ENTER_KEY = 13;

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            header: '',
            body: '',
            createdDate: '',
            modifiedDate: '',
            note: null
        }
        this.timer = null;
    }

    componentDidMount(){
        const { location, notes } = this.props;
        const note_id = qs.parse(location.search).n;
        const note = notes.items.find((note) => note.id == note_id);
        if(note != undefined){
            this.setState({ id: note_id, header: note.title, body: note.body, createdDate: note.creation_date, modifiedDate: note.modified_date });
        }
    }

    handleInputChange = (e) => {
        clearTimeout(this.timer);
        
        this.setState({
            [e.target.name]: e.target.value
        });
        this.timer = setTimeout(this.triggerSave, WAIT_INTERVAL);
    }

    triggerSave = () => {
        const { header, body } = this.state;
        const { dispatch } = this.props;
        const notebook_id = qs.parse(this.props.location.search).nb;
        const id = qs.parse(this.props.location.search).n;
        //const note = { ...this.state.note, header: header, body: body };
        console.log(header + ' ' + body);
        dispatch(noteActions.updateNote(id, header, body, notebook_id));
        this.setState({ modifiedDate: new Date() });
    }

    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    render() {
        const { classes, notes } = this.props;
        
        const note_id = qs.parse(location.search).n;
        const note = notes.items.find((note) => note.id == note_id);
        if(note === undefined){
            if(this.state.id)
                this.setState({ id: undefined, header: undefined, body: undefined });
            return (
                <div className={classes.container}>
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
                </div>
            )
        }
        if(note.id !== this.state.id){
            this.setState({ id: note.id, header: note.title, body: note.body, createdDate: note.creation_date, modifiedDate: note.modified_date });
        }
        return (
            <div className={classes.container}>
                <Paper className={classes.paperContainer}>
                    <Typography gutterBottom variant="h5" component="h2">
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
                    </Typography>
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
                    <Typography className={classes.captionModified} variant="caption" display="block" gutterBottom>
                        Modified: {this.formatDate(this.state.modifiedDate)}
                    </Typography>
                    <Typography className={classes.captionCreated} variant="caption" display="block" gutterBottom>
                        Created: {this.formatDate(this.state.createdDate)}
                    </Typography>
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

const connectedNote = withStyles(styles)(withRouter(connect(mapStateToProps)(Note)));
export { connectedNote as Note };
