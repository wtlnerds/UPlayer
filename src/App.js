import React, { Component } from 'react';
import Player from './components/player/player.js'
import './App.css';
import PlayListContent from './components/play_list/play_list_content.js'
import PlayNavigator from './components/column_of_play_list/play_navigator.js'
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';
import MyFavorite from './components/play_list/my_favorite.js'
import Search from './components/play_list/search.js';

import FSModule from './utils/file_system';

// The main componet of the app
class App extends Component {
  constructor(props){
    super(props)
    this.loadTrack = this.loadTrack.bind(this)
    this.onLoadFinished = this.onLoadFinished.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)

    this.handleNavigation = this.handleNavigation.bind(this) // Changes on download branch
 
    this.state = {
      track: null,
      loading: false,
      navigation: 0,
    }
    FSModule.loadTrackList().then((res) => {
      this.setState({
        tracks: res.map((v, i) => {
          return this.createData(v, 'I\'m an Artist', i, false)
        })
      })
    })
  }

  // Changes on downlaod branch
  handleNavigation(index) {
    this.setState({
        navigation:index,
    });
  }

  createData(name, uploadBy, id, liked) {  
    return { name, uploadBy, id, liked };
  }   

  loadTrack(track){
    this.setState({track: track, loading: true})
  }

  onLoadFinished(){
    this.setState({loading: false})
  }

  next(){
    this.loadTrack(this.getNextSong())
  }

  prev(){
    this.loadTrack(this.getPrevSong())
  }

  getNextSong(){
    const currentTrack = this.state.track
    const nextIndex = this.state.tracks.indexOf(currentTrack) + 1
    return nextIndex === this.state.tracks.length ? this.state.tracks[0] : this.state.tracks[nextIndex]
  }

  getPrevSong(){
    const currentTrack = this.state.track
    const prevIndex = this.state.tracks.indexOf(currentTrack) - 1
    return prevIndex === -1 ? this.state.tracks[this.state.tracks.length - 1] : this.state.tracks[prevIndex]
  }
  
  // return play_list based on inputs from the navigation
  getPage(index){
    switch (index) {
      case 0:
        return (<PlayListContent
                loadTrack={this.loadTrack}
                tracks = {this.state.tracks}>
                </PlayListContent>)
      case 1:
        return (<MyFavorite
                loadTrack={this.loadTrack}
                tracks = {this.state.tracks}>
                 </MyFavorite>)
      case 2:
      // 时下流行 case: This may need to be changed, change to taking specific youtube url
        return (<Search> </Search>)
      default:
        return (<PlayListContent
                loadTrack={this.loadTrack}
                tracks = {this.state.tracks}>
                </PlayListContent>)
    }
  }

  render() {

    let handleNavigation = this.handleNavigation;

    return (
      <LoadingOverlay 
        active={this.state.loading} 
        spinner={<ScaleLoader sizeUnit={'px'} size={300} color={'#EFEFEF'} />}
      >
        <div className="app">
          <div className = "player-app">
            <Player 
              track={this.state.track} 
              next={this.next}
              prev={this.prev}
              onLoadFinished={this.onLoadFinished}>
            </Player> 
          </div> 
          <div className = "column-of-play-list" >
            <PlayNavigator handleNavigation = {handleNavigation}> </PlayNavigator>
          </div> 
          <div className = "play-list">
            <div className="play-list-content">
              {this.getPage(this.state.navigation)}
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default App;
