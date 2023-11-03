import pokemon from 'pokemontcgsdk'
import fs from 'fs'
import https from 'https'

const agent = new https.Agent({ rejectUnauthorized: false })

pokemon.configure({ apiKey: '123abc', agent })

// Charger les données des sets à partir du fichier JSON
const setsData = JSON.parse(fs.readFileSync('Base.json', 'utf8'))

// Récupérer les sets à partir des IDs du fichier JSON
const setIds = setsData.map(set => set.id)

setIds.forEach(id => {
  pokemon.card
    .all({ q: `set.id:${id}` })
    .then(set => {
      fs.writeFile(`${id}.json`, JSON.stringify(set, null, 2), err => {
        if (err) {
          console.error(
            `Erreur lors de l'écriture du fichier ${id}.json : `,
            err
          )
        } else {
          console.log(`L'ensemble avec l'ID ${id} a été écrit dans ${id}.json`)
        }
      })
    })
    .catch(error => {
      console.error(
        `Une erreur s'est produite lors de la récupération de l'ensemble avec l'ID ${id} : `,
        error
      )
    })
})
