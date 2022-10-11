import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [searchSummoner, setSearchSummoner ] = useState('');
  const [summonerName, setSummonerName ] = useState({});
  const [matchHistory, setMatchHistory ] = useState([]);

  const handleSubmit = async(e) =>{
    e.preventDefault();

    console.log({
      summonerName: searchSummoner
    })

    await axios.get(`http://localhost:8000/${searchSummoner.replace(/%20/g, " ")}`)
      .then((res) => setSummonerName(res.data))
      .catch((err) => console.log(err.message))

    await axios.get(`http://localhost:8000/${searchSummoner.replace(/%20/g, " ")}/matches`)
      .then((res) => setMatchHistory(res.data))
      .catch((err) => console.log(err.message))

      setSearchSummoner('');
  }

  const handleChange = (e) => {
    setSearchSummoner(e.target.value)
  }

  return (
    <>
    {/* Title */}
    <h1>League 5 Game Stats</h1>
    {/* Input Form */}
    <div className='form'>
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
      </div>

    {/* Match data */}
    <div class='searchName'>{JSON.stringify(summonerName.name) !== '{}' ? <p>{summonerName.name}</p> : <p>No Player Data</p>}</div> 
          
          {matchHistory.length !== 0 ? 
          <>
          {matchHistory.map((matchInfo, index) => 
            <>
              <h1 class='matches'>Match {index + 1}</h1>
              <h3>Game Duration: { Math.floor(matchInfo.info.gameDuration/60) } minutes {matchInfo.info.gameDuration%60} seconds</h3>
              <div class='allPlayers'>
                {matchInfo.info.participants.map((data, summIndex) =>
                  <div class='playerClass'>
                    <img class='champImg' src={`https://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${data.championName}.png`} alt='champion'/>
                    <div class='summoner'>{data.summonerName}</div>
                    <div>KDA: {data.kills} / {data.deaths} / {data.assists} </div>
                    <div>Outcome: {data.win ? 'Victory' : 'Defeat'}</div>
                    <div>Champion Name: {data.championName}</div>
                    <div>Champion Level: {data.champLevel}</div>
                    <div>Creep Score: {data.totalMinionsKilled}</div>
                    <div>Items:
                      <ul class='items'>
                        <li><img src={data.item0 !== 0 ? `https://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item0}.png` : `https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Grey_Square.svg/100px-Grey_Square.svg.png?20081224151911`} alt='item1'/></li>
                        <li><img src={data.item1 !== 0 ? `https://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item1}.png` : `https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Grey_Square.svg/100px-Grey_Square.svg.png?20081224151911`} alt='item2'/></li>
                        <li><img src={data.item2 !== 0 ? `https://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item2}.png` : `https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Grey_Square.svg/100px-Grey_Square.svg.png?20081224151911`} alt='item3'/></li>
                        <li><img src={data.item3 !== 0 ? `https://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item3}.png` : `https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Grey_Square.svg/100px-Grey_Square.svg.png?20081224151911`} alt='item4'/></li>
                        <li><img src={data.item4 !== 0 ? `https://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item4}.png` : `https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Grey_Square.svg/100px-Grey_Square.svg.png?20081224151911`} alt='item5'/></li>
                        <li><img src={data.item5 !== 0 ? `https://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item5}.png` : `https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Grey_Square.svg/100px-Grey_Square.svg.png?20081224151911`} alt='item6'/></li>
                        <li><img src={data.item6 !== 0 ? `https://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item6}.png` : `https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Grey_Square.svg/100px-Grey_Square.svg.png?20081224151911`} alt='item7'/></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </>)}
          </>
          :
          <></>
        }
    </>
  );
}

export default App;
