const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config({path: './config/.env'});

const key = process.env.API_KEY;

const getSummonerPuuid = (summonerName) =>{
    return axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${key}`)
        .then(res =>{
            return res.data.puuid;
        }).catch(err => console.log(err.message));
}

router.get('/:id', (req, res) =>{
    axios.get(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.id}?api_key=${key}`
    )
    .then(response => {
        return res.json(response.data)
    })
    .catch(error => {
        console.log(error.message)
    })
})

router.get('/:id/matches', async (req, res) =>{
    const puuid = await getSummonerPuuid(req.params.id)

    const matchIDs = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${key}`)
        .then(res => {
            return res.data;
        }).catch(err => console.log(err.message))

    const matches = [];

    for (let i = 0; i < matchIDs.length; i++) {
        let match = matchIDs[i]
        const matchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${key}`)
        .then(res => res.data)
        .catch(err => console.log(err))
        matches.push(matchData)
    }
    return res.json(matches)
})

module.exports = router;