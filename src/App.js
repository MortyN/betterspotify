import Login from './login';
import './styles/main.css'
import './App.css'
import{useState, useEffect} from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom';
import Dashboard from "./Dashboard"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  useEffect(()=>{
  console.log("hei")
  })
  return code ? <Dashboard code={code} /> : <Login/> 

  // return (

  //     <Route exact path="/">
  //       <div className="h-screen w-screen bg-blue-400">
  //         <Login/>
  //       </div>
  //     </Route>
      
  // );
}

export default App;
