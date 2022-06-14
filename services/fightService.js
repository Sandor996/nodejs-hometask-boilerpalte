const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  getAllFight() {
    const allFight = FightRepository.getAll();
    if (allFight.length === 0) {
      throw Error('Fights history is empty');
    }
    return allFight;
  }

  search(search) {
    const item = FightRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createFight(data) {
    const create = FightRepository.create(data);
    return create;
  }

  deleteFight(id) {
    const del = FightRepository.delete(id);
    return del;
  }
}

module.exports = new FightersService();
