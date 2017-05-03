import React, { Component, PropTypes } from 'react';
import ProgramCard from './program-card';
import Button from './Button';
import Modal from './Modal';
import '../../styles/program-library.scss';

const propTypes = {
  items: PropTypes.array,
  onCardClick: PropTypes.func,
  onCreateClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default class ProgramLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      id: '',
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
  }

  onDeleteConfirm() {
    this.props.onDeleteClick({ id: this.state.id });
    this.setState({
      modalOpen: false,
      id: '',
    });
  }

  onDeleteCancel() {
    this.setState({
      modalOpen: false,
      id: '',
    });
  }

  handleDeleteClick(id) {
    this.setState({
      modalOpen: true,
      id,
    });
  }

  render() {
    return (
      <div
        style={{
          width: 1024,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          <Button
            type="primary"
            onClick={this.props.onCreateClick}
          >
            创建
          </Button>
        </div>
        <div>
          {this.props.items.map(item => {
            return (
              <ProgramCard
                key={item.programId}
                id={item.programId}
                title={item.name}
                description={item.description}
                onClick={this.props.onCardClick}
                onDeleteClick={this.handleDeleteClick}
              />
            );
          })}
        </div>
        {this.state.modalOpen ?
          <Modal
            onCloseButtonClick={this.onDeleteCancel}
          >
            <div
              style={{
                marginBottom: 16,
                color: '#666',
              }}
            >
            你确定要删除这个程序吗，删除之后不能撤销。
            </div>
            <div>
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={this.onDeleteCancel}
              >
                取消
              </Button>
              <Button
                type="primary"
                onClick={this.onDeleteConfirm}
              >
                确定
              </Button>
            </div>
          </Modal> : null
        }
      </div>
    );
  }
}

ProgramLibrary.propTypes = propTypes;
