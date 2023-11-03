package main

import (
	"log"
	"fmt"
	"encoding/json"
	"os"

	tcg "github.com/PokemonTCG/pokemon-tcg-sdk-go-v2/pkg"
	"github.com/PokemonTCG/pokemon-tcg-sdk-go-v2/pkg/request"
	
	
)

func writeFileJson(nameFile string, contents interface{}) {
    jsonData, err := json.Marshal(contents)
    if err != nil {
	    fmt.Println("Erreur d'encodage JSON :", err)
	    return
    }
    
    file, err := os.Create(nameFile)
	if err != nil {
		fmt.Println("Erreur lors de l'ouverture du fichier :", err)
		return
	}
	defer file.Close()

	// Écrivez le contenu JSON dans le fichier
	_, err = file.Write(jsonData)
	if err != nil {
		fmt.Println("Erreur lors de l'écriture dans le fichier :", err)
		return
	}
}

func main() {
	c := tcg.NewClient("2edef687-c149-4a15-a7a3-a181e45bd2b5")

	// Refer to https://docs.pokemontcg.io/#api_v2sets_list for how queries work
	sets, err := c.GetSets()
	if err != nil {
		log.Fatal(err)
	}
	
	i := 0

	for _, set := range sets {
	    err := os.Mkdir(set.Name, os.ModePerm)
		cards, err := c.GetCards(
		    request.Query("set.name:" + set.Name),
	    )
	    for _, card := range cards {
	        writeFileJson(set.Name + "/" + card.ID + ".json", cards)
	    }
	    
	    
	    if err != nil {
		    log.Fatal(err)
	    }
        
        if i == 3 {
            break // Sort de la boucle lorsque i est égal à 3
        }
        fmt.Println(i)
        i++

	}
	
	//writeFileJson("sets.json", sets)
}
