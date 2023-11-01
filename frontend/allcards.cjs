const axios = require('axios')
const fs = require('fs')

const url = 'https://api.pokemontcg.io/v2/cards'

/* Récupération de toutes les cartes pokemon via pokemon tcg*/
axios
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
  })
