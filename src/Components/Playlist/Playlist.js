import './Playlist.css';
import React from 'react';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        this.props.onNameChange(e.target.value);
    }
    
    render(){
        return(
            <div className="Playlist" onChange={this.handleNameChange}>
                <input defaultValue={'New Playlist'}/>
                    <TrackList 
                        tracks={this.props.playlistTracks} 
                        onRemove={this.props.onRemove}
                        isRemoval={false}
                    />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
} 