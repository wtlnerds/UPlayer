import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FSModule from '../../utils/file_system.js';


const styles = theme => ({
  root: {
    width: '83.33%',
    postion: 'fixed',
    // backgroundColor: 'black',
    background: 'linear-gradient(to left, #414345, #232526)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    marginLeft:'16.67%',
  },

  search: {
    position: 'fixed',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#EFEFEF',
    '&:hover': {
      backgroundColor: '#EFEFEF',
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },

  inputRoot: {
    color: 'black',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {searchQuery: ""}
    this.onDataReceived = props.onDataReceived 
  }

  updateInputValue(evt) {
    this.setState({searchQuery: evt.target.value})
  }

  handleKeyPressed(evt){
    if(evt.key === 'Enter'){
      FSModule.youtubeSearch(evt.target.value).then((data) => {
        this.onDataReceived(data)
      })
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.root} elevation={0}>
        <Toolbar> 
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyPress={(e) => this.handleKeyPressed(e)}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);
