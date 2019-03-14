import React, { Component } from 'react';
import Player from './components/player/player.js'
import './App.css';
import PrimarySearchAppBar from './components/play_list/primary_appsearch_bar.js'
import PlayListContent from './components/play_list/play_list_content.js'
import PlayNavigator from './components/column_of_play_list/play_navigator.js'
import MyFavorite from './components/play_list/my_favorite.js'
import SearchResult from './components/play_list/search_result.js';

// The main componet of the app
class App extends Component {
  constructor(props){
    super(props)
    this.loadTrack = this.loadTrack.bind(this)
    this.onLoadFinished = this.onLoadFinished.bind(this)
    this.state = {
      track: null,
      loading: false
    }
  }

  loadTrack(track){
    this.setState({track: track, loading: true})
  }

  onLoadFinished(){
    this.setState({loading: false})
  }

  render() {

      if (PlayNavigator.selectedNavigator == 1) {

      return (
        <div className="app">
          <div className = "player-app">
            <Player track={this.state.track} onLoadFinished={this.onLoadFinished}></Player> 
          </div> 
          <div className = "column-of-play-list" >
            <PlayNavigator> </PlayNavigator>
          </div> 
          
          <div className = "play-list">
            <div className="primary-appsearch-bar">
                <PrimarySearchAppBar></PrimarySearchAppBar>
            </div> 
            <div className="play-list-content">
              {/* <PlayListContent loadTrack={this.loadTrack} loading={this.state.loading}></PlayListContent> */}
              {/* <MyFavorite loadTrack={this.loadTrack} loading={this.state.loading}></MyFavorite> */}
              <SearchResult></SearchResult>
            </div>
          </div>
      </div>
      );
  }
  }
}

export default App;
