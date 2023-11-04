'use strict'

var ethers = require('ethers')
var App = require('@/App.js')

function buyBooster(name) {
  return new Promise(function (resolve) {
    try {
      var wallet = App.useWallet()
      if (wallet) {
        var provider = wallet.details.provider
        var account = wallet.details.account
        var contract = wallet.contract
        if (account && contract) {
          provider
            .getBalance(account)
            .then(function (balance) {
              ethers.utils.formatEther(balance).then(function (balanceInEther) {
                contract.getCostBooster(name).then(function (cost) {
                  cost.wait().then(function () {
                    if (balanceInEther >= cost) {
                      contract
                        .buyBooster(account, name)
                        .then(function (transaction) {
                          transaction.wait().then(function () {
                            resolve(true)
                          })
                        })
                    }
                  })
                })
              })
            })
            .catch(function (error) {
              console.error('Erreur lors de la récupération du solde :', error)
            })
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'achat du booster :", error)
    }
  })
}

module.exports = { buyBooster }
