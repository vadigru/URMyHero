// import {formatMovieTime} from "../utils/common.js";
export const rebuildCharacterData = (character) => {
  // return {
  //   "response": character.response,
  //   "id": character.id,
  //   "name": character.name,
  //   "powerstats": {
  //     "intelligence": character.powerstats.intelligence,
  //     "strength": character.powerstats.strength,
  //     "speed": character.powerstats.speed,
  //     "durability": character.powerstats.durability,
  //     "power": character.powerstats.power,
  //     "combat": character.powerstats.combat
  //   },
  //   "biography": {
  //     "fullName": character.biography[`full-name`],
  //     "alterEgos": character.biography[`alter-egos`],
  //     "aliases": [character.biography.aliases],
  //     "placeOfBirth": character.biography[`place-of-birth`],
  //     "firstAppearance": character.biography[`first-appearance`],
  //     "publisher": character.biography.publisher,
  //     "alignment": character.biography.alignment
  //   },
  //   "appearance": {
  //     "gender": character.appearance.gender,
  //     "race": character.appearance.race,
  //     "height": [character.appearance.height],
  //     "weight": [character.appearance.weight],
  //     "eyeColor": character.appearance[`eye-color`],
  //     "hairColor": character.appearance[`hair-color`]
  //   },
  //   "work": {
  //     "occupation": character.work.occupation,
  //     "base": character.work.base
  //   },
  //   "connections": {
  //     "groupAffiliation": character.connections[`group-affiliation`],
  //     "relatives": character.connections.relatives
  //   },
  //   "image": {
  //     "url": character.image.url
  //   }
  // };

  return {
    "name": character.name,
    "image": character.image.original_url,
    "fullName": character.real_name,
    "alterEgos": character.aliases,
    "deck": character.deck,
    "description": character.description,
    "groupAffiliation": character.teams,
  };
};
