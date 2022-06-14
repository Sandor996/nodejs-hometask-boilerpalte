const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  // TODO: Implement methods to work with fighters
  createFighter(data) {
    const create = FighterRepository.create(data);
    return create;
  }

  getAllFighters() {
    const allFighters = FighterRepository.getAll();
    if (allFighters.length === 0) {
      return [];
    }
    return allFighters;
  }

  deleteFighter(id) {
    const del = FighterRepository.delete(id);
    return del;
  }

  updateFighter(id, data) {
    const user = FighterRepository.update(id, data);
    return user;
  }

  search(search) {
    const fighter = FighterRepository.getOne(search);
    if (!fighter) {
      return {};
    }
    return fighter;
  }
}

module.exports = new FighterService();
