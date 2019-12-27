import React from 'react';
import { shallow } from 'enzyme';
import Guard from './guard';

const props = {

};

const mockComponent = (
  <span>
    Random Content
  </span>
);

describe('<Guard />', () => {

  it('Should render the component when authenticated', () => {
    const wrapper = shallow(<Guard path="/"
      component={mockComponent}
      isAuthenticated={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should NOT render the component when NOT authenticated', () => {
    const wrapper = shallow(<Guard path="/"
      component={mockComponent}
      isAuthenticated={false} />);
    expect(wrapper).toMatchSnapshot();
  });

});