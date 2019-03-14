import React, { Component } from 'react';
import Player from './components/player/player.js'
import './App.css';
import PrimarySearchAppBar from './components/play_list/primary_appsearch_bar.js'
import PlayListContent from './components/play_list/play_list_content.js'
import PlayNavigator from './components/column_of_play_list/play_navigator.js'
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
        trackNameList: res
      })
    })
  }

  loadTrack(track){
    this.setState({track: track, loading: true})
  }

  onLoadFinished(){
    this.setState({loading: false})
  }

  next(){
    this.loadTrack({name: this.getNextSong()})
  }

  prev(){
    this.loadTrack({name: this.getPrevSong()})
  }

  getNextSong(){
    const currentTrack = this.state.track.name
    const nextIndex = this.state.trackNameList.indexOf(currentTrack) + 1
    return nextIndex === this.state.trackNameList.length ? this.state.trackNameList[0] : this.state.trackNameList[nextIndex]
  }

  getPrevSong(){
    const currentTrack = this.state.track.name
    const prevIndex = this.state.trackNameList.indexOf(currentTrack) - 1
    return prevIndex === -1 ? this.state.trackNameList[this.state.trackNameList.length - 1] : this.state.trackNameList[prevIndex]
  }
  
  render() {
    return (
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
              loading={this.state.loading}
              tracks={this.state.trackNameList}
            ></PlayListContent>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
