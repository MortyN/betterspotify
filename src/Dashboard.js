import React, { Component, useState, useEffect } from 'react';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: '2e17e297722948e0aafa6a6550ba6345',

})

export default function Dashboard({code}){
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() =>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])


    useEffect(() =>{
        if(!search) return setSearchResults([])
        if(!accessToken) return

        spotifyApi.searchTracks(search).then(res => {

        }).catch((err) => {
            console.log(err)
        })
    },[search, accessToken])

    return(
        <div>
            <div className=" ">
                    <input 
                    className=" ml-3 h-14 text-xl w-4/5 text-gray-500  focus:outline-none bg-white"
                    type ="text"
                    name ="fname"
                    placeholder="Søk Valg"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    
                    />
                    <div className="flex flex-grow my-2 overflow-auto">Songs</div>
            </div>

            {code}
            

        </div>
    )
}