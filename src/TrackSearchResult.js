import React, { Component } from 'react';

export default function TrackSearchResult({track, chooseTrack}){

    function handlePlay(){
        chooseTrack(track)
    }

    return(
    <div className="flex flex-row cursor-pointer" onClick={handlePlay}>
        <img src={track.albumUrl} className="h-16 w-16 mb-2"/>
        <div className="flex flex-col ml-2 justify-center">
            <div className="text-white font-semibold">{track.title}</div>
            <div className="text-gray-500 font-thin">{track.artist}</div>
        </div>

    </div>
    )
}