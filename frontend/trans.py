# -*- coding: utf-8 -*-

import json

# Transforme le fichier cards.json contenant toutes les cartes en un fichier avec un tableau avec seulement l'id, le name, le type et image.small pour chaque carte
with open("cards.json", "r") as file:
    data = json.load(file)


nouveau_format = []

for element in data["data"]:
    # Créer un nouvel objet avec les champs souhaités
    nouvel_objet = {
        "id": element["id"],
        "name": element["name"],
        "images": {
            "small": "https://images.pokemontcg.io/" + element['set']['id'] + "/" + element['number'] + ".png"
        },
         "types": element.get("types", []), 
    }
 
    nouveau_format.append(nouvel_objet)

# Enregistrer le nouveau format dans un nouveau fichier 
with open("touslesSets.json", "w") as file:
    json.dump(nouveau_format, file, indent=2)
