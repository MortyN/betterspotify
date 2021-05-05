import React, { Component, useState, useEffect } from 'react';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player';
import SearchIcon from './img/SearchIcon.svg'
import SideBar from './SideBar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Playlist from './Playlist';

const spotifyApi = new SpotifyWebApi({
    clientId: '2e17e297722948e0aafa6a6550ba6345',

})

export default function Dashboard({code}){
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [playlists, setPlaylists] = useState([])
    const [actPlaylistId, setActPlaylistId] = useState([])
    const [actPlaylist, setActPlaylist] = useState([])
    

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
        console.log("hei")
        let cancel = false
        spotifyApi.getUserPlaylists(spotifyApi.getMe()).then(res=> {
            if (cancel) return
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
        return () => cancel = true
    },[accessToken])

    useEffect(()=>{

        spotifyApi.getPlaylist(actPlaylistId)
        .then(function(data) {
        setActPlaylist(data.body.tracks.items)
    
        }, function(err) {
        console.log('Something went wrong!', err);
        });

    },[actPlaylistId])

    return(
            <Router>
                <div>
                    <div  className="flex flex-row items-start justify-start h-screen">

                            <div className=" w-64 h-full bg-gray-800 flex flex-col">
                                <div className="text-gray-300 font-medium text-sm ml-4 mt-14">
                                    <div className="mb-2">Home</div>
                                    <div className="my-2">Your Library</div>
                                </div>
                                <divider className=" w-full mx-auto border-b border-gray-600 my-4"/>
                                <playlists>
                                    {playlists.map(playlist => {
                                        return(
                                        <li className="flex flex-row text-gray-400 font-medium text-sm mt-1 ml-4 transition transform duration-100 hover:text-gray-200" key={playlist.uri}>
                                            <Link to={`/playlist/${playlist.id}`} onClick={() =>{setActPlaylistId(playlist.id)}}>
                                                <div>{playlist.name}</div>
                                            </Link>
                                        </li>
                                        )
                                    })}
                                </playlists>
                            </div>

                        <Route exact path="/">
                            <div  className="flex flex-col items-start justify-center h-screen w-full pt-8">
                                <div className="flex flex-row h-full w-full">
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
                                    
                                    
                            </div>

                        </Route>
                        

                        <Route exact path="/playlist/:id">
                            <Playlist selPlaylist={actPlaylist} chooseTrack={chooseTrack}/>                     
                        </Route>
                        <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
                    </div>

                </div>
            </Router>

    )
}




{/* <Route exact path="/">
                        <div  className="flex flex-col items-start justify-center h-screen pt-8">
                            <div className="flex flex-row h-full w-full">
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
                    </Route> */}

{/* <div className="h-full w-full flex flex-row">
            <div className=" w-64 h-full bg-gray-800 flex flex-col">
                <div className="text-gray-300 font-medium text-sm ml-4 mt-10">
                    <div className="mb-2">Home</div>
                    <div className="my-2">Your Library</div>
                </div>
                <divider className=" w-5/6 mx-auto border-b border-gray-600 my-4"/>
                <playlists>
                    {playlists.map(playlist => {
                        return(
                        <li className="flex flex-row text-gray-400 font-medium text-sm mt-1 ml-4" key={playlist.uri}>
                            <Link to={`/playlist/${playlist.id}`} onClick={() =>{setId(playlist.id)}}>
                                <div>{playlist.name}</div>
                            </Link>
                        </li>
                        )
                    })}
                </playlists>
            </div>
        <div className="h-full w-full">
            
        </div>
    </div> */}