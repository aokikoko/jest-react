import React from "react";
import { shallow } from "enzyme";
import TodoList from "../../index";

it("TodoList 初始化列表为空", () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.state("undoList")).toEqual([]);
});

it("TodoList 应该给Header传递一个增加 undoList 内容的方法", () => {
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find("Header");

  expect(Header.prop("addUndoItem")).toBeTruthy();
});

it("当 addUndoItem 被执行时, undoList 应该新增内容", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.instance().addUndoItem("react");
  expect(wrapper.state("undoList").length).toBe(1);
  expect(wrapper.state("undoList")[0]).toBe("react");
  wrapper.instance().addUndoItem("react");
  expect(wrapper.state("undoList").length).toBe(2);
});

it("TodoList 应该给未完成列表传递 list 数据, 以及 deleteItem 方法", () => {
  const wrapper = shallow(<TodoList />);
  const UndoList = wrapper.find("UndoList");
  expect(UndoList.prop("list")).toBeTruthy();
  expect(UndoList.prop("deleteItem")).toBeTruthy();
});

it("当 deleteItem方法被执行时, undoList 应该删除内容", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    undoList: ["jest", "foo", "bar"],
  });
  wrapper.instance().deleteItem(1);
  expect(wrapper.state("undoList")).toEqual(["jest", "bar"]);
});
