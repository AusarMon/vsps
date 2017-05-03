import React, { Component, PropTypes } from 'react';
import ProgramCard from './program-card';
import '../../styles/program-library.scss';

const propTypes = {
  items: PropTypes.array,
  onCardClick: PropTypes.func,
};

export default class ProgramLibrary extends Component {
  render() {
    return (
      <div
        style={{
          width: 1024,
          margin: '0 auto',
        }}
      >
        <div>
          {this.props.items.map(item => {
            return (
              <ProgramCard
                id={item.programId}
                title={item.name}
                description={item.description}
                onClick={this.props.onCardClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ProgramLibrary.propTypes = propTypes;
