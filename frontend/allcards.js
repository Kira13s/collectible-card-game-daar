/*const axios = require('axios')
const fs = require('fs')

const url = 'https://api.pokemontcg.io/v2/cards'

/* Récupération de toutes les cartes pokemon via pokemon tcg*/
/*axios
  .get(url)
  .then(response => {
    if (response.status === 200) {
      fs.writeFileSync(
        'cards.json',
        JSON.stringify(response.data, null, 4),
        'utf-8'
      )
      console.log(typeof response.data)
    } else {
      console.log(
        `Récupération de données non réussie. Status code ${response.status}`
      )
    }
  })
  .catch(error => {
    console.error('Error :', error)
  })*/
import pokemon from 'pokemontcgsdk'
import fs from 'fs'
import https from 'https'

const agent = new https.Agent({ rejectUnauthorized: false })

pokemon.configure({ apiKey: '123abc', agent })

pokemon.set
  .all({ q: 'series:Base' })
  .then(sets => {
    fs.writeFile('Base.json', JSON.stringify(sets, null, 2), err => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier : ", err)
      } else {
        console.log('Tous les sets ont été écrits dans allSets.json')
      }
    })
  })
  .catch(error => {
    console.error("Une erreur s'est produite : ", error)
  })
