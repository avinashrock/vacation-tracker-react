import React from 'react';
import {shallow,mount} from 'enzyme';
import LeaveTable from '../LeaveTable';


const props = {
    data:{
        leaveId:0,
        userId:'AP062035',
        startDate:'2018-09-10',
        endDate:'2018-09-11',
        reason:'asassd',
        status:0,
        }
}
const wrapper = shallow(<LeaveTable {...props}/>);
describe('component renders without crashing',()=>{
    it('should render properly',()=>{
        expect(wrapper.exists()).toBe(true);
    })
    it('should match snapshot',()=>{
        expect(wrapper).toMatchSnapshot();
    })
    it('should handle state changes ', () => {
        expect(wrapper.state().key).toEqual(0);
        wrapper.simulate('click',{target:{key:1}});
    })
    it('lifecycle method exists',()=>{
        wrapper.instance().componentWillReceiveProps();
    })
    // it('onAccept',()=>{
    //     wrapper.instance().onAccept();
    // })
    
})