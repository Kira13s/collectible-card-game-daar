const axios = require('axios')
const fs = require('fs')

const url = 'https://api.pokemontcg.io/v2/sets'

axios
  .get(url)
  .then(response => {
    if (response.status === 200) {
      fs.writeFileSync(
        'sets.json',
        JSON.stringify(response.data, null, 4),
        'utf-8'
      )
      console.log(typeof response.data)
    } else {
      console.log(
        `Failed to retrieve the data. Status code: ${response.status}`
      )
    }
  })
  .catch(error => {
    console.error('An error occurred:', error)
  })
