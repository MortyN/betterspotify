import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: '2e17e297722948e0aafa6a6550ba6345',

})

function Playlist({selPlaylist, chooseTrack}) {
    const[actPlaylist, setActPlaylist] = useState([])
   
    function handlePlay(track){
      chooseTrack(track)
  }

    useEffect(()=>{
      setActPlaylist(selPlaylist)
    },[selPlaylist])

    return (
        <div>
            {actPlaylist ? actPlaylist.map(t =>{
              return( 
              <div className="flex flex-row cursor-pointer" onClick={() => handlePlay(t.track)}>
                  <img src={t.track.album.images[2].url} className="h-16 w-16 mb-2"/>
                  <div className="flex flex-col ml-2 justify-center">
                      <div className="text-white font-semibold">{t.track?.name}</div>
                  </div>
              </div>)}) 
              : []}
        </div>
    );
}

export default Playlist;