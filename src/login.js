import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import SideBar from './SideBar';
import SearchIcon from './img/SearchIcon.svg'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=2e17e297722948e0aafa6a6550ba6345&response_type=code&redirect_uri=http://localhost:8082&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {

    window.location.href = AUTH_URL
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <div className=" font-semibold text-9xl text-white flex flex-row select-none">Better<div className="text-green-400 font-bold">Spotify</div></div>
            <a href={AUTH_URL} className="bg-green-500 rounded-full h-12 px-8 mt-20 flex hover:bg-green-600 transition transform duration-300">
                <div className="my-auto font-bold text-white">Login with Spotify</div>
            </a>
        </div>
    )
}