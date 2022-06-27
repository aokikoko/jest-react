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
  expect(Header.prop("addUndoItem")).toBe(wrapper.instance().addUndoItem);
});

it("当 Header 回车时, undoList 应该新增内容", () => {
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find("Header");
  const addFunc = Header.prop("addUndoItem");

  addFunc("react");

  expect(wrapper.state("undoList").length).toBe(1);
  expect(wrapper.state("undoList")[0]).toBe("react");

  addFunc("react2");
  expect(wrapper.state("undoList").length).toBe(2);
});
