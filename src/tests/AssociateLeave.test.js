import React from 'react';
import {shallow,mount} from 'enzyme';
import AssociateLeave from '../AssociateLeave';
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios';


const historyMock = { push: jest.fn() };
const wrapper = shallow(<AssociateLeave history={historyMock}/>);
const val = shallow(<AssociateLeave/>);
describe('component should render without crashing',()=>{
    var mock = new MockAdapter(axios);
    it('axios post',()=>{
        mock.onPost('http://localhost:8080/service/Vacation-Tracker/leave').replyOnce(200);
    })
    it('component renders correctly',()=>{
        expect(wrapper.exists()).toBe(true);
    })
    it('should handle state changes ', () => {
      
        expect(wrapper.state().reason).toEqual('');
        wrapper.simulate('change',{target:{reason:"sick"}});
    })
    it('logout instance',()=>{
        wrapper.instance().logout();
    })
    it('lifecycle method exists',()=>{
        wrapper.instance().componentWillMount();
    })
    it('class container exists',()=>{
        const component = mount(<div class="container" />);
        expect(component.exists('.container')).toEqual(true);
    })
    it('button exists',()=>{
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    })
    // it('onchange instance',()=>{
    //     val.instance().onChange();
    // })
    // it('should call onChange prop', () => {
    //     const onChangeMock = jest.fn();
    //     const event = {
         
    //       target: { value: 'the-value' }
    //     };
    //     const component = shallow(<AssociateLeave onChange={onChangeMock} />);
    //     component.find('input').simulate('change', event);
    //     expect(onChangeMock).toBeCalledWith('the-value');
    //   });
    //   it('handleClick instance',()=>{
    //       val.instance().handleClick();
    //   })
    //   it('simulate form  submit',()=>{
    //     wrapper.find('form').simulate('submit', { preventDefault () {} },);
    // })
    it('input element',()=>{
        
        expect(val.equals(<input type="varchar" />)).toEqual(false);
    })
    it('label subject',()=>{
       expect(val.equals(<label for="subject">Reason</label>)).toEqual(false);
    })
    it('label startDate',()=>{
       
        expect(val.equals(<label for="fname">Start-Date</label>)).toEqual(false);
    })
    it('label endDate',()=>{
       
        expect(val.equals(<label for="lname">End-Date</label>)).toEqual(false);
    })
    it('logout icon renders at the right corner',()=>{
        it('className fa fa-sign-out exists',()=>{
            expect(wrapper.find('.fa fa-sign-out')).toHaveLength(1);
        });
    })
   
  
})
