import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '../TextField';

configure({ adapter: new Adapter() });

test('<TextField/> should render properly', (t) => {
  const wrapper = shallow(<TextField />);
  t.equal(wrapper.contains(<span id="textfield" />), true);
  t.end();
});

test('<TextField/> should render proper stylesheets', (t) => {
  const wrapper = mount(<TextField />);
  const fooInner = wrapper.hasClass(TextField.textfieldstyle);
  t.equal(fooInner, false);
  t.end();
});