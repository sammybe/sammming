import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
/*
let sampleSearchResults = [
  {name: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across the Water', id: '1'},
  {name: 'Tiny Dancer', artist: 'Tim McGraw', album: 'Love Story', id: '2'},
  {name: 'Tiny Dancer', artist: 'Rockabye Baby', album: 'Lullaby Renditions', id: '3'},
  {name: 'Tiny Dancer', artist: 'The White Raven', album: 'Tiny Dancer', id: '4'},
  {name: 'Tiny Dancer - Live Album', artist: 'Ben Folds', album: 'Live Album', id: '5'}
];

let sampleTrack1 = {name: 'Stronger', artist: 'Brittany Spiers', album: 'Whoops I muffed it up', id: '12'};
let sampleTrack2 = {name: 'Stranger', artist: 'Briny Spares', album: 'Yikes I muffed it up', id: '13'};
let sampleTrack3 = {name: 'Stwonger', artist: 'Bwittany Spires', album: 'Oh dear I really did it this time', id: '14'};
let samplePlaylist = [
  sampleTrack1, sampleTrack2, sampleTrack3
]*/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  addTrack(track) {
    if(!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks})
    }
  }

  removeTrack(track) {
    this.setState(
      {playlistTracks:
        this.state.playlistTracks.filter(playlistTrack => track.id !== playlistTrack.id)
      }
    )
  }

  updatePlaylistName(newName) {
    this.setState(
      {playlistName: newName}
    );
  }

  savePlaylist() {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks.map(track => track.uri)
  ).then(()=>{
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    })
  })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
