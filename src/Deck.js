import React, { Component } from "react";
import axios from "axios";
const BASE_API_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = { deck: null };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${BASE_API_URL}/new/shuffle`);
    this.setState({
      deck: deck.data,
    });
  }

  async getCard() {
    const deck_id = this.state.deck.deck_id;
    const cardUrl = `${BASE_API_URL}/${deck_id}/draw/`;
    const cardRes = await axios.get(cardUrl);
    const card = cardRes.data.cards[0];
    console.log(card);
  }

  render() {
    return (
      <div>
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get Card</button>
      </div>
    );
  }
}

export default Deck;
