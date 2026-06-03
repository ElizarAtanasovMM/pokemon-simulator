import mongoose from 'mongoose';
const { Schema } = mongoose;

export const PokemonSchema = new Schema({
  id: Number,
  name: String, // String is shorthand for {type: String}
  img: String,
  type: [String],
  height: String,
  weight: String,
  multipliers: [Number],
});
