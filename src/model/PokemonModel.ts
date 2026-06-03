import mongoose from 'mongoose';
import { PokemonSchema } from '../schemas/PokemonSchema';
import { Pokemon as PokemonType } from '../types/Pokemon';

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

export const insertMany = async (data: PokemonType[]) => {
  return await Pokemon.insertMany(data);
};

export const findOne = (id: number) => {
  return Pokemon.findOne({ id }).exec();
};

export const getPokemonsInRange = (start: number, end: number) => {
  return Pokemon.where('id').gte(start).lte(end).exec();
};
