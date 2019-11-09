import React from 'react';
import {shallow,mount} from 'enzyme';
import ManagerLeave from '../ManagerLeave';
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios';

const historyMock = { push: jest.fn() };
const val = shallow(<ManagerLeave />);
describe('ManagerLeave Component', () => {
    var mock = new MockAdapter(axios);
    const wrapper = shallow(<ManagerLeave history={historyMock}/>);
    beforeAll(() => {
        let phy = {
            data: [
                {
                    leaveId: 1,
                    userId: 'AP062035',
                    startDate: '2018-09-10',
                    endDate:'2018-09-11',
                    reason:'sick',
                    leaveStatus:0,
                }
            ]
        }
        wrapper.setState({data: phy.data});
        mock.onGet('http://localhost:8080/service/Vacation-Tracker/leave/viewLeaveStatus').replyOnce(200, phy)
    })
    it('should render', () => {
        expect(wrapper.exists()).toBe(true);
    })
    it('should handle state changes ', () => {
      
        expect(wrapper.state().reason).toEqual('');
        wrapper.simulate('change',{target:{reason:"sick"}});
    })
    it('should handle state changes ', () => {
      
        expect(wrapper.state().loadTable).toEqual(true);
        wrapper.simulate('click',{target:{loadTable:false}});
    })
    it('should handle state changes ', () => {
      
        expect(wrapper.state().showLoader).toEqual('none');
        wrapper.simulate('click',{target:{showLoader:'block'}});
    })
    it('should handle state changes ', () => {
      
        expect(wrapper.state().showview).toEqual('block');
        wrapper.simulate('click',{target:{showview:'none'}});
    })
    it('should handle state changes ', () => {
      expect(wrapper.state().fetchdata).toEqual(null);
    })
    it('should handle state changes ', () => {
      
        expect(wrapper.state().flag).toEqual(1);
        wrapper.simulate('click',{target:{flag:2}});
    })
    it('logout instance',()=>{
        wrapper.instance().logout();
    })
    it('lifecycle method exists',()=>{
        wrapper.instance().componentWillMount();
    })
    it('logout icon renders at the right corner',()=>{
        it('className fa fa-sign-out exists',()=>{
            expect(wrapper.find('.fa fa-sign-out')).toHaveLength(1);
        });
    })
    it('class container exists',()=>{
        const component = mount(<div class="container" />);
        expect(component.exists('.container')).toEqual(true);
    })
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
    // it('view',()=>{
    //     wrapper.instance().View();
    // })
    it('button exists',()=>{
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    })
   it('axios post',()=>{
       mock.onPost('http://localhost:8080/service/Vacation-Tracker/leave').replyOnce(200);
   })
    
})