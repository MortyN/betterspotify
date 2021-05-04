import React, { Component } from 'react';
import {Link} from 'react-router-dom'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=2e17e297722948e0aafa6a6550ba6345&response_type=code&redirect_uri=http://localhost:8082&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
    return(
        <div>
            <a href={AUTH_URL}>
                Login with Spotify
            </a>
        </div>
    )
}