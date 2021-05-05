import React, { Component, useState, useEffect } from 'react';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player';
import SearchIcon from './img/SearchIcon.svg'
import SideBar from './SideBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Playlist from './Playlist';

const spotifyApi = new SpotifyWebApi({
    clientId: '2e17e297722948e0aafa6a6550ba6345',

})

export default function Dashboard({code}){
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [playlists, setPlaylists] = useState()
    // const [selPlaylist, setSelPlaylist] = useState(window.location.pathname.split("/")[2]);

    // const listenToPopstate = () => {
    //     const winPath = window.location.pathname.split("/")[2];
    //     console.log("heis")
    //     setSelPlaylist(winPath);
    //   };

    // useEffect(() => {
    //     console.log("ENDRING")
    // window.addEventListener("popstate", listenToPopstate);
    // return () => {
    //     window.removeEventListener("popstate", listenToPopstate);
    // };
    // }, []);

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
    }

    useEffect(() =>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

 
    useEffect(() =>{
        if(!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImg = track.album.images.reduce((smallest, image) => {
                    if(image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return{
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImg.url
                }
                

            }))
        }).catch((err) => {
            console.log(err)
        })
    
    return () => cancel = true
    },[search, accessToken])

    useEffect(()=>{
        if(!accessToken) return
        if(playlists) return
        console.log("hei")
        spotifyApi.getUserPlaylists(spotifyApi.getMe()).then(res=> {
            console.log(res.body.items)
            setPlaylists(res.body.items.map(playlist =>{
                return {
                    collaborative: playlist.collaborative,
                    description: playlist.description,
                    external_urls: playlist.external_urls,
                    href: playlist.href,
                    id: playlist.id,
                    images: playlist.images,
                    name: playlist.name,
                    owner: playlist.owner,
                    primary_color: playlist.primary_color,
                    public: playlist.public,
                    snapshot_id: playlist.snapshot_id,
                    tracks: playlist.tracks,
                    type: playlist.type,
                    uri: playlist.uri
                }
            }))
        })
    })
    
    

    return(
            <Router>
                <Route exact path="/">
                    <div  className="flex flex-col items-start justify-center h-screen pt-8">
                        <div className="flex flex-row h-full w-full">
                            <SideBar playlists={playlists ? playlists : []}/>
                            <div className="h-full w-full">
                                
                                <searchframe className="flex flex-row border h-10 shadow-lg border-gray-400 rounded-full bg-white w-80 ml-4 mt-2 pr-8">
                                    <img src={SearchIcon} className="h-7 ml-3 my-auto"/>
                                        <input 
                                        className="py-3 ml-3 h-full  text-gray-500  focus:outline-none bg-white text-sm w-64"
                                        type ="text"
                                        name ="fname"
                                        placeholder="Artists, songs, or podcasts"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        
                                        />
                                        
                                </searchframe>
                                    <div className="flex h-5/6 flex-grow my-2 overflow-y-auto flex-col ml-8">
                                        {searchResults.map(track => (
                                            <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
                                        ))}
                                    </div>
                            </div>
                        </div>
                            
                            <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
                    </div>
                </Route>

                <Route exact path="/playlist/:id">
                    <div  className="flex flex-col items-start justify-center h-screen pt-8">
                        <div className="flex flex-row h-full w-full">
                            <SideBar playlists={playlists ? playlists : []}/>
                            <div className="h-full w-full">
                                <Playlist accessToken={accessToken} selPlaylist={"selPlaylist"?.id}/>
                            </div>
                        </div>                            
                            <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
                    </div>                               

                        
                </Route>
            </Router>

    )
}