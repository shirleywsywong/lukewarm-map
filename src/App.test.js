import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import App from './App';
import Button from './components/Button'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// describe("Test Button component", () => {
//   it("Test click event", () => {
//     const mockCallBack = jest.fn();
//     const button = shallow(<Button clickFn={mockCallBack} />);
//     button.find("button").simulate("click");
//     expect(mockCallBack.mock.calls.length).toEqual(1);
//   });
// });

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


describe("Button component", () => {
  test("it should update state counter", () => {
      
      let component;
      act(() => {
        let a = new App();
        ReactDOM.render(<Button clickFn={a.clickCounter} />, container);
      });
      const button = container.getElementsByTagName("button")[0];
      act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
  });
});
