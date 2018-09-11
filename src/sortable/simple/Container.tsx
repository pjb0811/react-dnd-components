import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
const update = require('immutability-helper');

const style = {
  width: 400
};

export interface ContainerState {
  cardsById: { [key: string]: any };
  cardsByIndex: any[];
}

@DragDropContext(HTML5Backend)
class Container extends React.Component<{}, ContainerState> {
  // tslint:disable-next-line ban-types
  pendingUpdateFn: any;
  requestedFrame: number | undefined;

  constructor(props: {}) {
    super(props);

    this.moveItem = this.moveItem.bind(this);
    this.drawFrame = this.drawFrame.bind(this);

    const cardsById: { [key: string]: any } = {};
    const cardsByIndex = [];

    for (let i = 0; i < 5; i += 1) {
      const card = { id: i, text: `test${i}` };
      cardsById[card.id] = card;
      cardsByIndex[i] = card;
    }

    this.state = {
      cardsById,
      cardsByIndex
    };
  }

  componentWillUnmount() {
    if (this.requestedFrame !== undefined) {
      cancelAnimationFrame(this.requestedFrame);
    }
  }

  render() {
    const { cardsByIndex } = this.state;

    return (
      <div style={style}>
        {cardsByIndex.map(card => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            moveItem={this.moveItem}
          />
        ))}
      </div>
    );
  }

  // tslint:disable-next-line ban-types
  private scheduleUpdate(updateFn: any) {
    this.pendingUpdateFn = updateFn;

    if (!this.requestedFrame) {
      this.requestedFrame = requestAnimationFrame(this.drawFrame);
    }
  }

  private drawFrame() {
    const nextState = update(this.state, this.pendingUpdateFn);
    this.setState(nextState);

    this.pendingUpdateFn = undefined;
    this.requestedFrame = undefined;
  }

  private moveItem(id: string, afterId: string) {
    const { cardsById, cardsByIndex } = this.state;

    const card = cardsById[id];
    const afterCard = cardsById[afterId];

    const cardIndex = cardsByIndex.indexOf(card);
    const afterIndex = cardsByIndex.indexOf(afterCard);

    this.scheduleUpdate({
      cardsByIndex: {
        $splice: [[cardIndex, 1], [afterIndex, 0, card]]
      }
    });
  }
}

export default Container;
