const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config({path: './config/.env'});
let key = process.env.API_KEY

const LeagueJS = require('leaguejs');
const leagueJs = new LeagueJS(key)

const getSummonerPuuid = (summonerName) => {
    return leagueJs.Summoner
	.gettingByName(summonerName)
	.then(data => {
		'use strict';
		return data.puuid
	})
	.catch(err => {
		'use strict';
		console.log(err);
	});
}

const getMatchIDs = (puuid) => {
    return leagueJs.Match
        .gettingMatchIdsByPuuid(puuid, options={
            count: 5
        })
        .then(data => {
            return data
        })
        .catch(err => console.log(err.message))
}

router.get('/:id', (req, res) =>{
    return leagueJs.Summoner
	.gettingByName(req.params.id)
	.then(data => {
		console.log(data)
		return data
	})
	.catch(err => {
		'use strict';
		console.log(err);
	});
})

router.get('/:id/matches', async (req, res) =>{
    const puuid = await getSummonerPuuid(req.params.id);
    
    const matchIDs = await getMatchIDs(puuid);

    const matches = [];

    for (let i = 0; i < matchIDs.length; i++) {
        const match = matchIDs[i]
        const matchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${key}`)
        .then(res => res.data.info)
        .catch(err => console.log(err))
        matches.push(matchData)
    }
    return res.json(matches)
})

module.exports = router;