import React, { Component } from "react";
import Header from "./components/Header";
import UndoList from "./components/UndoList";
import "./style.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.addUndoItem = this.addUndoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.valueChange = this.valueChange.bind(this);

    this.state = {
      undoList: [],
    };
  }

  addUndoItem(value) {
    this.setState({
      undoList: [
        ...this.state.undoList,
        {
          status: "div",
          value,
        },
      ],
    });
  }

  deleteItem(index) {
    const newList = [...this.state.undoList];
    newList.splice(index, 1);
    this.setState({ undoList: newList });
  }

  changeStatus(index) {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          status: "input",
        };
      }
      return {
        ...item,
        status: "div",
      };
    });
    this.setState({ undoList: newList });
  }

  handleBlur(index) {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          status: "div",
        };
      }
      return item;
    });
    this.setState({ undoList: newList });
  }

  valueChange(index, value) {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          value,
        };
      }
      return item;
    });
    this.setState({ undoList: newList });
  }

  render() {
    const { undoList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList
          list={undoList}
          deleteItem={this.deleteItem}
          changeStatus={this.changeStatus}
          handleBlur={this.handleBlur}
          valueChange={this.valueChange}
        ></UndoList>
      </div>
    );
  }
}

export default TodoList;
