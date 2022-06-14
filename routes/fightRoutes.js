const { Router } = require("express");
const FightService = require("../services/fightService");

const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get(
  "/",
  (req, res, next) => {
    try {
      const data = FightService.getAllFight();

      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const fight = FightService.search({ id: req.params.id });

      if (!fight) {
        throw Error("Fight not found");
      }

      const data = fight;
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  (req, res, next) => {
    const { fighter1, fighter2 } = req.body;

    const newFight = {
      fighter1: fighter1.id,
      fighter2: fighter2.id,
      log: [],
    };

    while (fighter1.health > 0 && fighter2.health > 0) {
      const fighter1Shot = fighter1.power - fighter2.defense;
      const fighter2Shot = fighter2.power - fighter1.defense;
      fighter1.health -= fighter2Shot;
      fighter2.health -= fighter1Shot;

      const round = {
        fighter1Shot,
        fighter2Shot,
        fighter1Health: fighter1.health,
        fighter2Health: fighter2.health,
      };

      newFight.log.push(round);
    }

    const data = FightService.createFight(newFight);

    res.data = data;

    next();
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const fight = FightService.search({ id: req.params.id });

      if (!fight) {
        throw Error("Fight not found");
      }

      FightService.deleteFight(req.params.id);

      res.data = { message: `Fight ${fight.id} removed!` };
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
