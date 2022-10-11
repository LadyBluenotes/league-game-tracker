import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [searchSummoner, setSearchSummoner ] = useState('');
  const [summonerName, setSummonerName ] = useState({});
  const [matchHistory, setMatchHistory ] = useState([]);

  const handleSubmit = async(e) =>{
    e.preventDefault();

    console.log({
      summonerName: searchSummoner
    })

    await axios.get(`http://localhost:8000/${searchSummoner}`)
      .then((res) => setSummonerName(res.data))
      .catch((err) => console.log(err.message))

    await axios.get(`http://localhost:8000/${searchSummoner}/matches`)
      .then((res) => setMatchHistory(res.data))
      .catch((err) => console.log(err.message))

      setSearchSummoner('');
  }

  const handleChange = (e) => {
    setSearchSummoner(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='summonerName'>Summoner Name:</label>
        <input 
          type='text' 
          id='summonerName' 
          name='summonerName' 
          value={searchSummoner}
          onChange={handleChange}
          ></input>
          <input type='submit' value='Submit'></input>
          </form>
    </>
  );
}

export default App;
