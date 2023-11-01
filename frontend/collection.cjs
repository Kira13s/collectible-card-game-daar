/* Récupération d'une carte précise */
/* Utilisée au début mais maintenant allcards !*/

const axios = require('axios')

const { writeFile } = require('fs').promises

const apiKey = '52e67ecf-2efd-41c6-a33b-b10c04cb48a7'
const cardId = 'g1-1'
const apiUrl = `https://api.pokemontcg.io/v2/cards/${cardId}`

const requestOptions = {
  headers: {
    'X-Api-Key': apiKey,
  },
}

axios
  .get(apiUrl, requestOptions)
  .then(response => {
    if (response.status === 200) {
      const data = response.data
      const jsonData = JSON.stringify(data, null, 2)

      writeFile('resultat.json', jsonData)
        .then(() => {
          console.log('Résultat enregistré dans "resultat.json"')
        })
        .catch(err => {
          console.error("Erreur lors de l'écriture du fichier :", err)
        })
    } else {
      console.error('Erreur de requête:', response.status)
    }
  })
  .catch(error => {
    console.error('Erreur lors de la requête:', error)
  })
