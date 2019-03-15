import React, { Component } from 'react';
import Player from './components/player/player.js'
import './App.css';
import PrimarySearchAppBar from './components/play_list/primary_appsearch_bar.js'
import PlayListContent from './components/play_list/play_list_content.js'
import PlayNavigator from './components/column_of_play_list/play_navigator.js'
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';
// import MyFavorite from './components/play_list/my_favorite.js'
// import SearchResult from './components/play_list/search_result.js';

import FSModule from './utils/file_system';

// The main componet of the app
class App extends Component {
  constructor(props){
    super(props)
    this.loadTrack = this.loadTrack.bind(this)
    this.onLoadFinished = this.onLoadFinished.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.state = {
      track: null,
      loading: false
    }
    FSModule.loadTrackList().then((res) => {
      this.setState({
        tracks: res.map((v, i) => {
          return this.createData(v, '米津玄师米津玄师米津玄师米津玄师米津玄师米津玄师米津玄师米津玄师', 1, i, false)
        })
      })
    })
  }

  createData(name, uploadBy, duration, id, liked) {  
    return { name, uploadBy, duration, id, liked};
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
  
  render() {
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
            <PlayNavigator> </PlayNavigator>
          </div> 
          <div className = "play-list">
            <div className="primary-appsearch-bar">
                <PrimarySearchAppBar></PrimarySearchAppBar>
            </div> 
            <div className="play-list-content">
              <PlayListContent 
                loadTrack={this.loadTrack} 
                tracks={this.state.tracks}
              ></PlayListContent>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default App;
