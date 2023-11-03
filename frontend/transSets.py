-*- coding: utf-8 -*-

import json

# Transforme le fichier cards.json contenant toutes les cartes en un fichier avec un tableau avec seulement l'id, le name, le type et image.small pour chaque carte
with open("allSets.json", "r") as file:
    data = json.load(file)


nouveau_format = []

for element in data["data"]:

    if element["series"]=="Base" : 
    # Créer un nouvel objet avec les champs souhaités
    nouvel_objet = {
        "id": element["id"],
        "name": element["name"],
        "series": element["series"],
        "printedTotal": element["printedTotal"],
        "total": element["series"],
        "legalities": {
        "unlimited": "Legal"
        },
        "ptcgoCode": "BS",
        "releaseDate": "1999/01/09",
        "updatedAt": "2022/10/10 15:12:00",
        "images": {
        "symbol": "https://images.pokemontcg.io/base1/symbol.png",
        "logo": "https://images.pokemontcg.io/base1/logo.png"
        }
    }
 
    nouveau_format.append(nouvel_objet)

# Enregistrer le nouveau format dans un nouveau fichier 
with open("touslesSets.json", "w") as file:
    json.dump(nouveau_format, file, indent=2)
