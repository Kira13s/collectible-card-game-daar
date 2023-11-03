# -*- coding: utf-8 -*-
import json
import os
# Vérifier si le fichier "toutesCollections.json" existe
if os.path.exists("toutesCollections.json"):
    # Charger le fichier s'il existe
    with open("toutesCollections.json", "r") as existing_file:
        try:
            existing_data = json.load(existing_file)
        except ValueError:
            # Le fichier existe mais n'est pas au format JSON valide
            existing_data = []
else:
    existing_data = []

# Le reste du code pour ajouter de nouvelles données

# Le reste du code pour ajouter de nouvelles données

with open("cards.json", "r") as file:
    data = json.load(file)

for element in data["data"]:
    id_a_verifier= element["set"]["id"]
    id_existe_deja = any(entry.get("id") == id_a_verifier for entry in existing_data)

    if not id_existe_deja:
        # Si l'ID n'existe pas, vous pouvez ajouter votre nouvelle entrée
        nouvel_objet = {
            "id": id_a_verifier,
            "symbol": "https://images.pokemontcg.io/" + id_a_verifier + "/symbol.png",
            "logo": "https://images.pokemontcg.io/" + id_a_verifier + "/logo.png",
        }

        existing_data.append(nouvel_objet)

        # Enregistrer le fichier mis à jour
        with open("toutesCollections.json", "w") as updated_file:
            json.dump(existing_data, updated_file, indent=2)
    else:
        print("L'ID {} existe déjà dans le fichier 'toutesCollections.json'.".format(id_a_verifier))

