import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: '2e17e297722948e0aafa6a6550ba6345',

})

function Playlist({selPlaylist}) {
    const[actPlaylist, setActPlaylist] = useState([])
   
    useEffect(()=>{
      setActPlaylist(selPlaylist)
    },[selPlaylist])

    return (
        <div>
            {actPlaylist ? actPlaylist.map(track =>{
              return(<div>{track.track.name}</div>)
            }) : []}
                sdsd
        </div>
    );
}

export default Playlist;