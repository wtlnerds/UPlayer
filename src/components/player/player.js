import React, { Component } from 'react'
import Slider from '@material-ui/lab/Slider';
import ControlInterface from './control_interface'
import FSModule from '../../utils/file_system'
import Audio from '../../utils/audio'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
        track:{
          color: 'white',
        }
      }
    },
})

const style = {

  root: {
    width: 300,
    backgroundColor: 'black',
  },

  volume_slider: {
    width: 250,
    padding: '22px 0px',
    marginLeft: 25,
  },

}

class Player extends Component {
  constructor(props) {
    super(props)
    // binder methods in child
    this.onTrackChange = this.onTrackChange.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.handleSelectedPlay = this.handleSelectedPlay.bind(this)
    // initialize states
    this.state = {
      playerStatus: Audio.status().INIT,
      // we need this to refresh this component upon each tick
      position: 0,
      duration: 0,
      track: null,
      selectedPlay: 0,
      open: false,
      value: 50
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  // handles click when each type of playing methods is involved
  handleSelectedPlay(index) {
    this.setState({
      selectedPlay: index,
  });
  }

  // display buttons for different types of playing music
  displayButton(index) {
    if (index === 0){
      return (<IconButton onClick={() => this.handleSelectedPlay(1)} size="small"><Icon fontSize="small">repeat</Icon></IconButton>)
    }
    if (index === 1){
      return (<IconButton onClick={() => this.handleSelectedPlay(2)} size="small"><Icon fontSize="small">repeat_one</Icon></IconButton>)
    }
    if (index === 2){
      return (<IconButton onClick={() => this.handleSelectedPlay(0)} size="small"><Icon fontSize="small">shuffle</Icon></IconButton>)
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.track !== prevProps.track){
        // first we need to stop current playing audio
        //　停一下.jpg
        Audio.getAudio().pause()
        // then load entire new track
        FSModule.loadTrack(this.props.track.name).then((res) => {
          Audio.reset()
          Audio.getAudio().init(
            new AudioContext(), 
            res, 
            () => this.onLoadFinished(this), 
            (time) => this.onPlayingNotify(this, time),
            () => this.onTrackChange(1)
          )
        })
    }
  }

  onLoadFinished(ctx) {
    const audio = Audio.getAudio()
    audio.play()
    ctx.setState({
      playerStatus: audio.status,
      duration: audio.duration(),
      track: {
        artist: this.props.track.uploadBy,
        name: this.props.track.name,
        avatar: 'https://i.kym-cdn.com/photos/images/original/001/278/552/0c1'
      }
    })
    ctx.props.onLoadFinished()
  }

  onPlayingNotify(ctx, time) {
    ctx.setState({
      position: time
    })
  }
 
  onTrackChange(next) {
    if(next === 1){
      this.props.next()
    }

    if(next === 0){
      this.props.prev()
    }
  }

  play() {
    this.setState({playerStatus: Audio.status().PLAYING})
  }

  pause() {
    this.setState({playerStatus: Audio.status().PAUSED})
  }

  parseTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60
    const minutesPart = minutes < 10 ? '0' + minutes : minutes
    const secondsPart = seconds < 10 ? '0' + seconds : seconds
    return minutesPart + ":" + secondsPart
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const { value } = this.state;

    let shouldLoadPlayer = true
    switch(this.state.playerStatus){
      case Audio.status().PAUSED:
        Audio.getAudio().pause()
        break
      case Audio.status().PLAYING:
        Audio.getAudio().play()
        break
      default:
        shouldLoadPlayer = false
        break
    }
    if(shouldLoadPlayer){
      return (

        <div className="player">
          <img className="spin-image" width="64" height="64" src={this.state.track.avatar} alt="track avatar"/>
          <div className= "song-name-and-slide-bar">
            <div className="track-artist">
                <p className="track-animation">{this.state.track.name.substr(0, this.state.track.name.length-4)} - {this.state.track.artist}</p>
            </div>
            <div className="duration-alter">
                <p>{this.parseTime(parseInt(this.state.position.toFixed(0)))} / {this.parseTime(parseInt(this.state.duration.toFixed(0)))}</p>
            </div>
            <div className="volume-play">
              <IconButton
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}
              size="small">
              <Icon fontSize="small">volume_down></Icon>
              </IconButton>
              <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper className={classes.root}>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MuiThemeProvider muiTheme={muiTheme}>
                          {/* Volume slider */}
                          <Slider
                            className={classes.volume_slider}
                            value={value}
                            min={0}
                            max={100}
                            step={1}
                            onChange={this.handleChange}
                          />
                        </MuiThemeProvider>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              {this.displayButton(this.state.selectedPlay)}
            </div>

            <div className="slider">
              <Slider
                min={0}
                max={this.state.duration}
                step={1}
                value={this.state.position}
              />
            </div>
          </div>
          <ControlInterface
            onPlay={() => this.play()}
            onPause={() => this.pause()}
            onTrackChange={(indicator) => this.onTrackChange(indicator)}
            playStatus={this.state.playerStatus === Audio.status().PLAYING}
            disabled={false}>
          </ControlInterface>
        </div>
      )
    } else {
      return (
        <div className="player-alter">
          <div> <h1>Nothing is loaded! Choose a song first.</h1></div>
          <ControlInterface
            onPlay={() => this.play()}
            onPause={() => this.pause()}
            playStatus={this.state.playerStatus === Audio.status().PLAYING}
            disabled={true}
          >
          </ControlInterface>
        </div>
      )
    }
  }
}

export default withStyles(style)(Player);