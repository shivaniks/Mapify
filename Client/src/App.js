
import './App.css';
import * as React from 'react';
import { useState } from 'react';
import Map,{NavigationControl,Marker,Popup} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {Close,Star} from '@mui/icons-material'
import axios from 'axios'
import {format} from 'timeago.js'
import Register from './components/Register';
import Login  from './components/Login';

function App() {
  const mystorage=window.localStorage
  const [currentUser, setCurrentUser]=useState(mystorage.getItem("user"))
  const [reviews,setReviews]=useState([])
  const [currentPlace , setCurrentPlace]=useState(null)
  const [newP , setNewP]=useState(null)
  const [title , setTitle]=useState(null)
  const [desc, setDesc]=useState(null)
  const [rating  ,setRating]=useState(0)
  const [showRegister  ,setshowRegister]=useState(false)
  const [showlogin  ,setshowlogin]=useState(false)


  React.useEffect(()=>{
    const getReviews=async()=>{
      try{
        const res=await axios.get("http://localhost:8800/reviews")
        setReviews(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getReviews()
  },[])

  const handleClick=(id)=>{
     setCurrentPlace(id);
    console.log(currentPlace)
  }

  const handleAdd=(e)=>{
    const long=e.lngLat.lng;
    const lat=e.lngLat.lat;
    setNewP({
      lat:lat,
      long:long
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const newR ={
      username:currentUser,
      title:title,
      desc:desc,
      rating:rating,
      lat:newP.lat,
      long:newP.long,
    }
    try{
      console.log(newR)
      const res=await axios.post("http://localhost:8800/reviews/new",newR)
      setReviews([...reviews,res.data])
      setNewP(null)
    }catch(err){
      console.log("error")
      console.log(err)
    }
  }
  const handleLogout=()=>{
    mystorage.removeItem("user");
    setCurrentUser(null)
  }

  return (
    <div className="App">
     <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude:78.042068,
        latitude: 27.173891,
        zoom: 14,
      }}
      onClick={handleAdd}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=xxfRrdMWJXkyp0aH3bu0"
      >
      <NavigationControl position="top-left"/>
      {reviews.map(p=>(
        <>
        <Marker longitude={p.long}
        latitude={p.lat}
        onClick={()=>handleClick(p._id)}
        >
      </Marker>
      
      {p._id===currentPlace && (
        <Popup 
        longitude={p.long} 
        latitude={p.lat}
        anchor="left"
        closeButton={false}
        closeOnClick={false}
        >
        <Close onClick={()=>handleClick(null)} className='close'/>
       <div className='card'>
        <label>Place</label>
        <h4 className='place'>{p.title}</h4>
        <label>Review</label>
        <p className='desc'>{p.desc}</p>
        <label>Rating</label>
        <div className='stars'>
          {Array(p.rating).fill(<Star className="star" />)}
        </div>
        <label>Information</label>
        <span className='username'>Created by <b>{p.username}</b></span>
        <span className='date'>{format(p.createdAt)}</span>
        </div>
      </Popup>)}
      </>
    ))}
    {newP && currentUser &&(
      <Popup 
      longitude={newP.long} 
      latitude={newP.lat}
      anchor="left"
      closeButton={false}
      closeOnClick={false}
      >
        <Close onClick={()=>setNewP(null)} className='close'/>
        <div>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            placeholder="Enter a title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description</label>
          <textarea
            placeholder="Tell us something about this place."
            onChange={(e) => setDesc(e.target.value)}
          />
          <label>Rating</label>
          <select onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit" className="submitButton">
            Add Review
          </button>
        </form>
        </div>
      </Popup>
      )}
      </Map>
      <div className='but'>
      {currentUser?
      (<button className="button logout" onClick={handleLogout}>Log out</button> ):
      (<><button className="button login" onClick={()=>setshowlogin(true)}>Login</button>
      <button className="button register" onClick={()=>setshowRegister(true)}>register</button></>)}  
      </div>
      {showRegister && <Register setShowRegister={setshowRegister}/>}
      {showlogin && <Login setShowLogin={setshowlogin} myStorage={mystorage} setCurrentUser={setCurrentUser}/>}
    </div>
  );
}

export default App;
