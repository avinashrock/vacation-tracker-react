import React from 'react';
import {shallow} from 'enzyme';
import LoginForm from '../LoginForm';


const historyMock = { push: jest.fn() };
const mockEvent = { preventDefault: jest.fn() };
const wrapper = shallow(<LoginForm history={historyMock} />);
describe('Component should render without crashing',()=>{
    it('Component renders correctly',()=>{
        expect(wrapper.exists()).toBe(true);
    })
    it('Component matches its snapshot',()=>{
        expect(wrapper).toMatchSnapshot();
    })
    it('should handle state changes ', () => {
      
        expect(wrapper.state().open).toEqual(false);
        wrapper.simulate('click');
        expect(wrapper.state().open).toEqual(false);
    })
    it('should handle state changes', () => {
        
        expect(wrapper.state().loggedIn).toEqual('');
        wrapper.simulate('click',{target:{loggedIn:false}});
        
    })
    it('should handle state changes', () => {
      
        expect(wrapper.state().username).toBe('');
        wrapper.simulate('change',{target: {username:'avinash'}});
    })
    
    it('should handle state chnges', () =>{
      
        expect(wrapper.state().password).toBe('');
        wrapper.simulate('change',{target:{password:'rocks'}});
    })

    // it('handleClick',()=>{
    //     // wrapper.instance().handleClick();
    //     const form = wrapper.find('form'); 
    //     form.simulate('submit', mockEvent);
    // })
    it('onCloseModal',()=>{
        wrapper.instance().onCloseModal();
    })
    // it('onChange',()=>{
    //     wrapper.instance().onChange();
    // })
    it('className body exists',()=>{
        expect(wrapper.find('.body')).toHaveLength(1);
    })
    it('className grad exists',()=>{
        expect(wrapper.find('.grad')).toHaveLength(1);
    })
    it('className login exists',()=>{
        expect(wrapper.find('.login')).toHaveLength(1);
    })
    it('className loginButton exists',()=>{
        expect(wrapper.find('.loginButton')).toHaveLength(1);
    })
    it('input change for username',()=>{
        const input = wrapper.find('input').at(0);
        input.simulate('change', { target: { value: 'Changed' } });
    })
    it('input change for password',()=>{
        const input = wrapper.find('input').at(1);
        input.simulate('change', { target: { value: 'Changed' } });
    })
    it('button with className submit',()=>{
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    })
    it('lifecycle method renders correctly',()=>{
        wrapper.instance().componentWillMount();
    })
    // it('simulate form  submit',()=>{
    //     wrapper.find('form').simulate('submit', { preventDefault () {} },);
    // })
})