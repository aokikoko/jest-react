import React from "react";
import { shallow } from "enzyme";
import TodoList from "../../index";

describe("TodoList 组件", () => {
  it("初始化列表为空", () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state("undoList")).toEqual([]);
  });

  it("Header 组件存在 addUndoItem 属性", () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find("Header");

    expect(Header.prop("addUndoItem")).toBeTruthy();
  });

  it("addUndoItem 方法被调用, undoList 数据项增加", () => {
    const wrapper = shallow(<TodoList />);
    const { addUndoItem } = wrapper.instance();
    const content = "react";
    addUndoItem(content);
    expect(wrapper.state("undoList").length).toBe(1);
    expect(wrapper.state("undoList")[0]).toEqual({
      status: "div",
      value: content,
    });
    addUndoItem(content);
    expect(wrapper.state("undoList").length).toBe(2);
  });

  it("UndoList 组件应该接收 list, deleteItem, changeStatus, handleBlur, valueChange 参数", () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find("UndoList");
    expect(UndoList.prop("list")).toBeTruthy();
    expect(UndoList.prop("deleteItem")).toBeTruthy();
    expect(UndoList.prop("changeStatus")).toBeTruthy();
    expect(UndoList.prop("handleBlur")).toBeTruthy();
    expect(UndoList.prop("valueChange")).toBeTruthy();
  });

  it("deleteItem 方法被调用, undoList 数据项被删除", () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      {
        status: "div",
        value: "jest",
      },
      {
        status: "div",
        value: "tdd",
      },
      {
        status: "div",
        value: "react",
      },
    ];
    wrapper.setState({
      undoList: data,
    });
    wrapper.instance().deleteItem(1);
    expect(wrapper.state("undoList")).toEqual([data[0], data[2]]);
  });

  it("changeStatus 方法被调用, undoList 数据项 status 被修改", () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      {
        status: "div",
        value: "jest",
      },
      {
        status: "div",
        value: "tdd",
      },
      {
        status: "div",
        value: "react",
      },
    ];
    wrapper.setState({
      undoList: data,
    });
    wrapper.instance().changeStatus(1);
    expect(wrapper.state("undoList")[1]).toEqual({
      ...data[1],
      status: "input",
    });
  });

  it("handleBlur 方法被调用, undoList 数据项 status 被修改", () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      {
        status: "input",
        value: "jest",
      },
      {
        status: "div",
        value: "tdd",
      },
      {
        status: "div",
        value: "react",
      },
    ];
    wrapper.setState({
      undoList: data,
    });
    wrapper.instance().handleBlur(0);
    expect(wrapper.state("undoList")[0]).toEqual({
      ...data[0],
      status: "div",
    });
  });

  it("changeValue 方法被调用, undoList 数据项 value 被修改", () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      {
        status: "input",
        value: "jest",
      },
    ];
    const value = "ahaha";
    wrapper.setState({
      undoList: data,
    });
    wrapper.instance().valueChange(0, value);
    expect(wrapper.state("undoList")[0]).toEqual({
      ...data[0],
      value,
    });
  });
});
