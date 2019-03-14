import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { styled } from '@material-ui/styles';

/* This part is used to add local Icon to the button, doesnt seem to work, but saved

import Icon_play_arrow from './image/baseline-play_arrow-24px.svg';
import Icon_pause from './image/baseline-pause-24px.svg';
import Icon_skip_previous from './image/baseline-skip_previous-24px.svg';
import Icon_skip_next from './image/baseline-skip_next-24px.svg'; */ 

/* Styling of the Fab, used as element in the render*/

const MyButton = styled(Fab)({
  background: 'linear-gradient(to right, #292E49, #536976)',
  border: '50px',
  borderRadius: '50%',
  color: 'white',
  height: 48,
  padding: '15px 30px',
  sizeLarge: '10px',
  sizeMedium: '5px',
});

class ControlInterface extends Component {      
  control(text, clickHandler) {
    const onClick = ev => {
      ev.preventDefault();
      clickHandler();
    };
    
    switch(text){
      case 'Pause':
        return (<MyButton color = "primary" size = "medium" onClick={onClick}disabled={this.props.disabled}><Icon>pause</Icon></MyButton>)
      case 'Play':
        return (<MyButton color = "primary" size = "medium" onClick={onClick}disabled={this.props.disabled} ><Icon>play_arrow</Icon></MyButton>)
      default:
        return
    }
  }

  render() {
    return (
      <div className="controller-interface">
        <MyButton color = "primary" size = "small" onClick={()=>this.props.onTrackChange(0)}><Icon>skip_previous</Icon></MyButton>
        {!this.props.playStatus && this.control('Play', this.props.onPlay)}
        {this.props.playStatus && this.control('Pause', this.props.onPause)}
        <MyButton color = "primary" size = "small" onClick={()=>this.props.onTrackChange(1)}> <Icon>skip_next</Icon></MyButton>
      </div>
    )
  }
}

export default ControlInterface
