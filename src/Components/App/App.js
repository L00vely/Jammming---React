import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Get Lucky',
          artist: 'Daft Punk',
          album: 'Random Access Memories',
          id: 1
        }, 
        {
          name: 'Get Lost',
          artist: 'Breakbot',
          album: 'Still Waters',
          id: 2
        }, 
        {
          name: 'Sacatela',
          artist: 'La Femme',
          album: 'Teatro Lúcido',
          id: 3
        }],

      playlistName: "Gaming",

      playlistTracks: [
        {
          name: 'Neverita',
          artist: 'Bad Bunny',
          album: 'Un verano sin ti',
          id: 4
        }, 
        {
          name: 'Human After All',
          artist: 'Daft Punk',
          album: 'Human After All',
          id: 5
        }] 
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    this.setState({
      playlistTracks: this.state.playlistTracks.push(track)
    });    
  }

  removeTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      this.setState({
        playlistTracks: this.state.playlistTracks.pop(track)
      }); 
    }
  }

  updatePlaylistName(newName){
    this.setState({
      playlistName: newName
    });
  }



  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}
