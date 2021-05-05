import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/main.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import WindowHeader from './WindowHeader';


ReactDOM.render(

    <BrowserRouter  base="/">
      <WindowHeader/>
      <App />
    </BrowserRouter>
,
  document.getElementById('root')
);
