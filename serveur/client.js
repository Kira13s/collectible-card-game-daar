const axios = require('axios')

  // Utiliser Axios pour effectuer une requête GET
axios.get('http://localhost:3000/api/sets/cards/base1')
.then(function(response) {
  console.log(response.data);
})
.catch(function(error) {
  console.error(error);
});


