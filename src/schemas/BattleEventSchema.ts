import mongoose from 'mongoose';
const { Schema } = mongoose;

export const BattleEventSchema = new Schema({
  created: { type: Date, default: Date.now },
  teams: [String],
  battleEvent: [
    {
      attackerName: String,
      defenderName: String,
      turn: Number,
      winner: String,
      log: String,
    },
  ],
});
