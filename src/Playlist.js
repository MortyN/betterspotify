import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: '2e17e297722948e0aafa6a6550ba6345',

})

function Playlist({accessToken}, selPlaylistId) {
    const[actPlaylist, setActPlaylist] = useState([])
    const[playlistId, setPlaylistId] = useState(selPlaylistId)
   

  useEffect(() =>{
      console.log("heisann")
    // if(!selPlaylist) return
    // spotifyApi.getPlaylist(selPlaylist.id)
    // .then(function(data) {
    //   console.log('Some information about this playlist', data.body.tracks);
    // //   setActPlaylist(data.body.items)

    // }, function(err) {
    //   console.log('Something went wrong!', err);
    // });
  })

    return (
        <div>
            {console.log("heiSS")}
                sdsd
        </div>
    );
}

export default Playlist;