import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import swal from 'sweetalert';
class LeaveTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            key:0
        }
        this.onAccept = this.onAccept.bind(this);
        this.onReject = this.onReject.bind(this);
    }
    componentWillReceiveProps(){
        this.render();
    }
    onAccept = (e) =>{
        this.setState({key:e.target.value});
        swal({
            title: "Leave got accepted",
            icon: "success",
            confirmButtonText: 'OK',
        }).then((value)=>{
            let empid = document.getElementsByClassName('accept');
            value = localStorage.getItem(empid[this.state.key].value);
            swal(`your leaveId is ${value}`);
            let store = document.getElementsByClassName('detail');
            store[this.state.key].style.display = 'none';
        });
    }
    onReject = (e)=>{
        this.setState({key:e.target.value});
        swal({
            title: "Sorry, Your leave was not accepted",
            icon: "warning",
            confirmButtonText: 'OK',
        }).then((value)=>{
            let empid = document.getElementsByClassName('reject');
            value = localStorage.getItem(empid[this.state.key].value);
            swal(`your leaveId is ${value}`);
            let store = document.getElementsByClassName('detail');
            store[this.state.key].style.display = 'none';
        });
    }
    render(){
        if(this.props.data !== null && this.props.data.length > 0) {
            const rows = this.props.data.map((val, i) => {
                localStorage.setItem(i,val.leaveId)
                if(val.leaveStatus===0){
                    val.leaveStatus='Pending'
                }
                return <tr key={i} className="detail" >
                            <td>{val.leaveId}</td>
                            <td>{val.name}</td>
                            <td>{val.startDate}</td>
                            <td>{val.endDate}</td>
                            <td>{val.reason}</td>
                            <td>{val.leaveStatus}</td>
                            <td><button id='accept' className="accept" value={i} onClick={this.onAccept}>Accept</button></td>
                            <td><button id='reject' className="reject" value={i} onClick={this.onReject}>Reject</button></td>
    
                       </tr>
            })
            return (
                <Table responsive striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>LeaveId</th>
                            <th>Name</th>
                            <th>StartDate</th>
                            <th>EndDate</th>
                            <th>Reason</th>
                            <th>LeaveStatus</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            );
    }
    else {
        return (
            <section></section>
        );
    }

}
}
export default LeaveTable;