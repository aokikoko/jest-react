import React, { Component } from "react";

class UndoList extends Component {
  render() {
    const { list, deleteItem } = this.props;
    return (
      <div className="undo-list">
        <div className="undo-list-title">
          正在进行
          <div data-test="count" className="undo-list-count">
            {list.length}
          </div>
        </div>
        <div>
          <ul className="undo-list-content">
            {list.map((item, index) => {
              return (
                <li className="undo-list-item" data-test="list-item" key={`${item}-${index}`}>
                  {item}
                  <div
                  className="undo-list-delete"
                    data-test="delete-item"
                    onClick={() => {
                      deleteItem(index);
                    }}
                  >
                    -
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default UndoList;
