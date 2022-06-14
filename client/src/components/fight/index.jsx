import React from "react";

import { getFighters } from "../../services/domainRequest/fightersRequest";
import NewFighter from "../newFighter";
import Fighter from "../fighter";
import { Button } from "@material-ui/core";

import "./fight.css";

import { createFight } from "../../services/domainRequest/fightRequest";

class Fight extends React.Component {
  state = {
    fighters: [],
    fighter1: null,
    fighter2: null,
    winner: null,
  };

  async componentDidMount() {
    const fighters = await getFighters();
    if (fighters && !fighters.error) {
      this.setState({ fighters });
    }
  }

  onFightStart = async () => {
    const { fighter1, fighter2 } = this.state;

    if (fighter1 && fighter2) {
      const newFight = await createFight({
        fighter1,
        fighter2,
      });

      this.calculateWinner(newFight);
    } else {
      this.setState({
        winner: "Choose fighters!!!",
      });
    }
  };

  calculateWinner = (fight) => {
    const lastObj = fight.log[fight.log.length - 1];
    const { fighter1Health, fighter2Health } = lastObj;

    if (fighter1Health === fighter2Health) {
      this.setState({
        winner: "Draw! Everybody dead! :D",
      });
    }

    if (fighter1Health > fighter2Health) {
      this.setState({
        winner: `And the winner is ${this.state.fighter1.name}!!!`,
      });
    }

    if (fighter1Health < fighter2Health) {
      this.setState({
        winner: `And the winner is ${this.state.fighter2.name}!!!`,
      });
    }
  };

  onCreate = (fighter) => {
    this.setState({ fighters: [...this.state.fighters, fighter] });
  };

  onFighter1Select = (fighter1) => {
    this.setState({ fighter1 });
  };

  onFighter2Select = (fighter2) => {
    this.setState({ fighter2 });
  };

  getFighter1List = () => {
    const { fighter2, fighters } = this.state;
    if (!fighter2) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter2.id);
  };

  getFighter2List = () => {
    const { fighter1, fighters } = this.state;
    if (!fighter1) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter1.id);
  };

  render() {
    const { fighter1, fighter2 } = this.state;
    return (
      <div id="wrapper">
        <NewFighter onCreated={this.onCreate} />
        <div id="figh-wrapper">
          <Fighter
            selectedFighter={fighter1}
            onFighterSelect={this.onFighter1Select}
            fightersList={this.getFighter1List() || []}
          />
          <div className="btn-wrapper">
            <Button
              onClick={this.onFightStart}
              variant="contained"
              color="primary"
            >
              Start Fight
            </Button>
          </div>
          <Fighter
            selectedFighter={fighter2}
            onFighterSelect={this.onFighter2Select}
            fightersList={this.getFighter2List() || []}
          />
        </div>
        {this.state.winner && (
          <h2 className="fight-winner">{this.state.winner}</h2>
        )}
      </div>
    );
  }
}

export default Fight;
