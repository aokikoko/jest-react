import React from "react";
import { shallow } from "enzyme";

import Header from "../../components/Header";
import { findTestWrapper } from "../../../../utils/testUtils";

// 快照
it("Header 渲染样式正常", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

it("Header 组件包含一个 input框", () => {
  const wrapper = shallow(<Header />);
  const inputElem = findTestWrapper(wrapper, "input");
  expect(inputElem.length).toBe(1);
});

// 受控input框
it("Header 组件input框内容, 初始化应该为空", () => {
  const wrapper = shallow(<Header />);
  const inputElem = findTestWrapper(wrapper, "input");
  expect(inputElem.prop("value")).toEqual("");
});

it("Header 组件input框内容, 当用户输入时, 会跟随变化", () => {
  const wrapper = shallow(<Header />);
  const inputElem = findTestWrapper(wrapper, "input");
  const userInput = "啊哈";
  inputElem.simulate("change", {
    target: {
      value: userInput,
    },
  });
  expect(wrapper.state("value")).toEqual(userInput);
  // const newInputElem = wrapper.find("[data-test='input']");
  // expect(newInputElem.prop("value")).toBe(userInput);
});

it("Header 组件input框点击回车时, 如果input无内容, 无操作", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = findTestWrapper(wrapper, "input");
  wrapper.setState({ value: "" });
  inputElem.simulate("keyup", {
    keyCode: 13,
  });
  expect(fn).not.toHaveBeenCalled();
});

it("Header 组件input框点击回车时, 如果input有内容, 函数应该被调用", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = findTestWrapper(wrapper, "input");
  const userInput = "react";
  wrapper.setState({ value: userInput });
  inputElem.simulate("keyup", {
    keyCode: 13,
  });
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenLastCalledWith(userInput);
});

it("Header 组件input框点击回车时, 如果input有内容, 最后应该清除掉", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = findTestWrapper(wrapper, "input");
  const userInput = "react";
  wrapper.setState({ value: userInput });
  inputElem.simulate("keyup", {
    keyCode: 13,
  });
  const newInputElem = findTestWrapper(wrapper, "input");
  expect(newInputElem.prop("value")).toBe("");
});
