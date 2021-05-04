import React, { Component, useEffect, useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';

export default function Player({accessToken, trackUri}){

    const[play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if(!accessToken) return null
    return(
        <div className="fixed bottom-0 w-full">
            <SpotifyWebPlayer
            token={accessToken}
            showSaveIcon
            uris={trackUri ? [trackUri] : []}
            callback={state => {
                if(!state.isPlaying) setPlay(false)
            }}
            play={play}
            styles={{
                bgColor: '#1c1c1c',
                sliderColor: "#00e371",
                sliderTrackColor: "#575757",
                trackNameColor: '#787878',
                color: "#a3a3a3",
                trackArtistColor: "#787878"
            }}
            />
        </div>
    )
}