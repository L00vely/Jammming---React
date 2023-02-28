let accessToken;
const clientId = '44a0cc574a8047c3bc15631a2854910e';
const redirectUri = "http://localhost:3000/";

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken
        }

        // Check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);

        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term){
        const access_token = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
            { headers: {
                Authorization: `Bearer ${access_token}`
            }}
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(name,trackURIs){
        if(!name || !trackURIs.length){
            return
        }
        
        const access_token = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${access_token}`}
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({name: name})
                    })
                    .then(response => response.json())
                    .then(jsonResponse => {
                        const playlistId = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                            {   headers: headers,
                                method: 'POST',
                                body: JSON.stringify({uris:trackURIs})
                            }
                        )
                    }
                    )   
            });           
        }
    }    
    
export default Spotify;