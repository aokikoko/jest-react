import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";
import { findTestWrapper } from "../../../../utils/testUtils";

describe("Header 组件", () => {
  // 快照
  it("样式渲染正常", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  it("组件中包含输入框", () => {
    const wrapper = shallow(<Header />);
    const inputElem = findTestWrapper(wrapper, "input");
    expect(inputElem.length).toBe(1);
  });

  // 受控input框
  it("输入框内容初始为空", () => {
    const wrapper = shallow(<Header />);
    const inputElem = findTestWrapper(wrapper, "input");
    expect(inputElem.prop("value")).toEqual("");
  });

  it("输入框内容随用户输入变化", () => {
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

  it("输入框无内容时触发回车事件, 无反应", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = findTestWrapper(wrapper, "input");
    wrapper.setState({ value: "" });
    inputElem.simulate("keyup", {
      keyCode: 13,
    });
    expect(fn).not.toHaveBeenCalled();
  });

  it("输入框有内容回车事件被触发时, 外部传入的函数被调用, 内容清空", () => {
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
    const newInputElem = findTestWrapper(wrapper, "input");
    expect(newInputElem.prop("value")).toBe("");
  });
});
