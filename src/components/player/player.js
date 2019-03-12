import React, { Component } from 'react'
import Slider from '@material-ui/lab/Slider';
import ControlInterface from './control_interface'
import FSModule from '../../utils/file_system'
import Audio from '../../utils/audio'

class Player extends Component {
  constructor(props) {
    super(props)
    // binder methods in child
    this.onTrackChange = this.onTrackChange.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    // initialize states
    this.state = {
      playerStatus: Audio.status().INIT,
      position: 0,
      duration: 0,
      track: null
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.track !== prevProps.track){
        // first we need to stop current playing audio
        if(this.state.playerStatus === Audio.status().PLAYING){
          //　停一下.jpg
          Audio.getAudio().pause()
        }
        // then load entire new track
        FSModule.loadTrack(this.props.track).then((res) => {
          Audio.reset()
          Audio.getAudio().init(new AudioContext(), res, () => this.onLoadFinished(this), (time) => this.onPlayingNotify(this, time))
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
        name: this.props.track,
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
    console.log(next)
  }

  play() {
    this.setState({playerStatus: Audio.status().PLAYING})
  }

  pause() {
    this.setState({playerStatus: Audio.status().PAUSED})
  }

  render() {
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
          <div className="track-artist">
            <p>{this.state.track.name} -  {this.state.track.artist}</p>
          </div>
          <div className="duration">
            {parseInt(this.state.position).toString(2)} - {parseInt(this.state.duration).toString(2)}
            <Slider
              min={0}
              max={this.state.duration}
              step={1}
              value={this.state.position}
            />
          </div>
          <ControlInterface
            onPlay={() => this.play()}
            onPause={() => this.pause()}
            playStatus={this.state.playerStatus === Audio.status().PLAYING}
            disabled={false}
          >
          </ControlInterface>
        </div>
      )
    } else {
      return (
        <div className="player">
          <div> <h1>Nothing is loaded!</h1></div>
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

export default Player
