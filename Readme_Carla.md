# FRONTEND

## Navigation bar

Elle comporte le logo Pokemon et le menu.
Le menu est composée de :

- COLLECTION : page qui sert de Home page et qui affiche toutes les cartes de l'api pokemon tcg.
  De plus, il faut savoir que les types sont en anglais et ont une majuscule, exemple: Metal, Water.
- MYPOKEDEX : pour le moment, il n'y a pas de page. Elle représentera la page où l'utilisateur verra ses cartes.

## L'affichage des cartes

Récupération des cartes dans le fichier allcards.cjs et des sets de cartes dans setscards.cjs.
Ensuite ces fichiers produisent des fichiers json : cards.jsonn et sets.json.
Ces fichiers json sont utilisés par trans.py qui créer des fichiers json, je l'ai utilisé pour créer ToutesCartes.json, qui ont un tableau de données simplifiées des cartes.
De plus, afficher toutes les cartes seraient très chiants (page très longues) donc pour le moment, on affiche seulement 10 cartes puis on clique pour avoir les 10 suivantes.
Des modifs pour le futur => bouton pour voir les cartes précédentes

## La recherche

La recherche des cartes se fait par type. En effet, en tapant le bon type (en anglais et avec une majuscule) on obtient toutes les cartes de ce type présent dans notre fichier ToutesCartes.json.
À savoir, une carte peut avoir plusieurs types.
De plus, il y a un bouton annuler qui permet de remettre les cartes affichées avant la recherche.
Des modifs pour le futur => la mise en page (css) après l'annulation est la même que pour les autres pages.
