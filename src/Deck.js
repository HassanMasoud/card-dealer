import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";
const BASE_API_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${BASE_API_URL}/new/shuffle`);
    this.setState({
      deck: deck.data,
    });
  }

  async getCard() {
    let deck_id = this.state.deck.deck_id;
    let cardUrl = `${BASE_API_URL}/${deck_id}/draw/`;
    try {
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No cards remaining");
      }
      let card = cardRes.data.cards[0];
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            suit: `${card.value} OF ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    let cards = this.state.drawn.map((card) => (
      <Card key={card.id} image={card.image} name={card.suit} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">♠️ Card Dealer ♠️</h1>
        <h2 className="Deck-title subtitle">♦️ A Demo Build With React ♦️</h2>
        <button className="Deck-btn" onClick={this.getCard}>
          Get Card
        </button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}

export default Deck;
