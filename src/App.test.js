import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const wrapper = mount(<App />);
  const container = wrapper.find('[data-test="container"]');
  expect(container).toExist();
  expect(container).toHaveProp("title", "wang");
});
