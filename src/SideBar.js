import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default function SideBar({playlists}) {

    return(
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
                        <Link to={`/playlist/${playlist.id}`}>
                            <div>{playlist.name}</div>
                        </Link>
                    </li>
                    )
                })}
            </playlists>
        </div>
    )
}