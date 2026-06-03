import mongoose from 'mongoose';
import config from '../../config/config';
import { readFileSync } from 'node:fs';
import { findOne, insertMany } from '../../model/PokemonModel';
import { Pokemon } from '../../types/Pokemon';
import path from 'path';

export const initConnection = async () => {
  await mongoose.connect(config.database.uri);
  console.log('MongoDB connected...');
};

export const initDatabase = async () => {
  const data = JSON.parse(
    readFileSync(path.join(appRoot, '/testData/pokedex.json'), 'utf-8')
  );

  const mappedData = data.pokemon.map((p: Pokemon) => {
    return {
      id: p.id,
      name: p.name,
      img: p.img,
      type: p.type,
      height: p.height,
      weight: p.weight,
      multipliers: p.multipliers,
    };
  });

  try {
    await insertMany(mappedData);
    console.log('Records found... proceed without insert');
  } catch (e) {
    console.error('Error with many insertion', e);
  }
};
