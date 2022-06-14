const FighterService = require('../services/fighterService');

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  try {
    const { power, defense, name } = req.body;

    if (req.body.id) {
      throw Error("You can't declare id");
    }

    if (!name || name === '') {
      throw Error('Please enter correct fighter name');
    }

    if (+power < 1 || +power > 10 || !Number.isInteger(+power)) {
      throw Error('Please enter a value of power within range (1 - 10)');
    }

    if (+defense < 1 || +defense > 10 || !Number.isInteger(+defense)) {
      throw Error('Please enter a value of defense within range (1 - 10)');
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  try {
    const { power, defense } = req.body;

    if (+power < 1 || +power > 10 || !Number.isInteger(+power)) {
      throw Error('Please enter a value of power within range (1 - 10)');
    }

    if (+defense < 1 || +defense > 10 || !Number.isInteger(+defense)) {
      throw Error('Please enter a value of defense within range (1 - 10)');
    }

    const existingFighter = FighterService.search({ id: req.params.id });

    if (Object.keys(existingFighter).length === 0) {
      throw Error('Fighter do not exist!');
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
