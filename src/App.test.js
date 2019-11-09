import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import App from './App';

describe('Componen renders without crashing',()=>{
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('lifecycle method exists',()=>{
    const wrapper = shallow(<App/>);
    wrapper.instance().componentWillMount();
  })

})
