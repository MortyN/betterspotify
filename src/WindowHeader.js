import React, { Component } from 'react';
import './styles/window.css'
import close from './icons/close-w-10.png'
import min from './icons/min-w-10.png'
import max from './icons/max-w-10.png'
import res from './icons/restore-w-10.png'

export default function WindowHeader(){
  return(
    <header id="titlebar">
    <div id="drag-region">
      <div id="window-controls">
  
        <div class="button" id="min-button">
          <img class="icon" src={min} draggable="false" />
        </div>
  
        <div class="button" id="max-button">
          <img class="icon" src={max} draggable="false" />
        </div>
  
        <div class="button" id="restore-button">
          <img class="icon" src={res} draggable="false" />
        </div>
  
        <div class="button" id="close-button">
          <img class="icon" src={close} draggable="false" />
        </div>
  
      </div>
    </div>
  </header>)
}

// icons/close-w-10.png 1x, icons/close-w-12.png 1.25x, icons/close-w-15.png 1.5x, icons/close-w-15.png 1.75x, icons/close-w-20.png 2x, icons/close-w-20.png 2.25x, icons/close-w-24.png 2.5x, icons/close-w-30.png 3x, icons/close-w-30.png 3.5x