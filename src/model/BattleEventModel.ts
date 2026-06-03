import mongoose from 'mongoose';
import { BattleEventSchema } from '../schemas/BattleEventSchema';
import { BattleEvent } from '../types/Team';

const Event = mongoose.model('BattleEvent', BattleEventSchema);

export const insertEvent = (battle: BattleEvent[]) => {
  const event = new Event({
    created: new Date(),
    teams: [battle[0]?.attackerName, battle[0]?.defenderName],
    battleEvent: battle,
  });

  return event.save();
};

export const findAll = () => {
  return Event.find();
};
