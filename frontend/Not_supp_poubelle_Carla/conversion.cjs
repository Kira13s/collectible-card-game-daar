const fs = require('fs')

const originalData = {
  data: {
    id: 'g1-1',
    name: 'Venusaur-EX',
    supertype: 'Pokémon',
    subtypes: ['Basic', 'EX'],
    hp: '180',
    types: ['Grass'],
    evolvesTo: ['M Venusaur-EX'],
    rules: [
      'Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards.',
    ],
    attacks: [
      {
        name: 'Frog Hop',
        cost: ['Grass', 'Colorless', 'Colorless'],
        convertedEnergyCost: 3,
        damage: '40+',
        text: 'Flip a coin. If heads, this attack does 40 more damage.',
      },
      {
        name: 'Poison Impact',
        cost: ['Grass', 'Grass', 'Colorless', 'Colorless'],
        convertedEnergyCost: 4,
        damage: '80',
        text: "Your opponent's Active Pokémon is now Asleep and Poisoned.",
      },
    ],
    weaknesses: [
      {
        type: 'Fire',
        value: '×2',
      },
    ],
    retreatCost: ['Colorless', 'Colorless', 'Colorless', 'Colorless'],
    convertedRetreatCost: 4,
    set: {
      id: 'g1',
      name: 'Generations',
      series: 'XY',
      printedTotal: 83,
      total: 117,
      legalities: {
        unlimited: 'Legal',
        expanded: 'Legal',
      },
      ptcgoCode: 'GEN',
      releaseDate: '2016/02/22',
      updatedAt: '2020/08/14 09:35:00',
      images: {
        symbol: 'https://images.pokemontcg.io/g1/symbol.png',
        logo: 'https://images.pokemontcg.io/g1/logo.png',
      },
    },
    number: '1',
    artist: 'Eske Yoshinob',
    rarity: 'Rare Holo EX',
    nationalPokedexNumbers: [3],
    legalities: {
      unlimited: 'Legal',
      expanded: 'Legal',
    },
    images: {
      small: 'https://images.pokemontcg.io/g1/1.png',
      large: 'https://images.pokemontcg.io/g1/1_hires.png',
    },
    tcgplayer: {
      url: 'https://prices.pokemontcg.io/tcgplayer/g1-1',
      updatedAt: '2023/11/01',
      prices: {
        holofoil: {
          low: 2.99,
          mid: 3.94,
          high: 25,
          market: 3.58,
          directLow: 3.58,
        },
      },
    },
    cardmarket: {
      url: 'https://prices.pokemontcg.io/cardmarket/g1-1',
      updatedAt: '2023/11/01',
      prices: {
        averageSellPrice: 6.75,
        lowPrice: 1,
        trendPrice: 6.42,
        germanProLow: 0,
        suggestedPrice: 0,
        reverseHoloSell: 0,
        reverseHoloLow: 0,
        reverseHoloTrend: 6.21,
        lowPriceExPlus: 4,
        avg1: 5.98,
        avg7: 6.33,
        avg30: 5.44,
        reverseHoloAvg1: 6.99,
        reverseHoloAvg7: 5.52,
        reverseHoloAvg30: 5.03,
      },
    },
  },
}

const transformedData = {
  id: originalData.data.id,
  name: originalData.data.name,
  images: {
    small: originalData.data.images.small,
  },
}
// Ajoutez autant d'objets que nécessaire pour chaque carte

const outputData = JSON.stringify(transformedData, null, 2)
fs.appendFile('output.json', ',', err => {
  if (err) {
    console.error("Erreur lors de l'ajout de données au fichier :", err)
  } else {
    console.log('Données ajoutées avec succès au fichier "output.json".')
  }
})

fs.appendFile('output.json', outputData, err => {
  if (err) {
    console.error("Erreur lors de l'ajout de données au fichier :", err)
  } else {
    console.log('Données ajoutées avec succès au fichier "output.json".')
  }
})
