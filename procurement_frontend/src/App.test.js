import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import renderer from "react-test-renderer";

describe("With Enzyme", () => {
  it('App shows "Procurement for construction industry"', () => {
    const app = shallow(<App />);

    expect(app.find("BrowserRouter div main div div h1").text()).toEqual("Procurement for construction industry");
  });

});