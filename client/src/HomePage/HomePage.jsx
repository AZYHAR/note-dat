import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { NavBar } from '../_components';
import { NotebookList } from '../_components';
import { NoteList } from '../_components';
import Grid from '@material-ui/core/Grid';
import { Note } from '../_components';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  appbar: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    height: '9vh'
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    height: '91vh'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  narrowItem: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    margin: theme.spacing.unit,
    width: '200px'
  },
  resize: {
    display: 'none'
  },
  wideItem: {
    flexGrow: 6,
    flexShrink: 1,
    flexBasis: 'auto',
    margin: theme.spacing.unit
  }
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, dispatch, classes } = this.props;
    const { NoteFullScreen } = this.props.notes;

    return (
      <div className={classes.container}>
        <div className={classes.appbar}>
          <NavBar />
        </div>
        <div className={classes.content}>
          <div className={NoteFullScreen ? classes.resize : classes.narrowItem}>
            <NotebookList className={classes.paper} />
          </div>
          <div className={NoteFullScreen ? classes.resize : classes.narrowItem}>
            <NoteList className={classes.paper} />
          </div>
          <div className={classes.wideItem}>
            <Note className={classes.paper} />
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  const { notes } = state;

  return {
    user,
    notes
  };
}

const connectedHomePage = withStyles(styles)(
  connect(mapStateToProps)(HomePage)
);
export { connectedHomePage as HomePage };
