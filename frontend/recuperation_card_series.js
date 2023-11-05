import pokemon from 'pokemontcgsdk'
import fs from 'fs'
import https from 'https'

const agent = new https.Agent({ rejectUnauthorized: false })

pokemon.configure({ apiKey: '123abc', agent })

pokemon.card
  .all({ q: `set.name:Base` })
  .then(cards => {
    fs.writeFile('Base.json', JSON.stringify(cards, null, 2), err => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier : ", err)
      } else {
        console.log('Tous les sets ont été écrits dans BB.json')
      }
    })
  })
  .catch(error => {
    console.error("Une erreur s'est produite : ", error)
  })
