// AuthPage.test.js
import React from 'react';
import { shallow } from 'enzyme';
import AuthPage from './AuthPage';

describe('AuthPage Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AuthPage />);
    expect(wrapper.exists()).toBe(true);
  });
});
