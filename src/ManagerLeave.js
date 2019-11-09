import React, { Component } from 'react';
import './ManagerLeave.css';
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import LeaveTable from './LeaveTable';
import axios from 'axios';
import { brown400 } from 'material-ui/styles/colors';

let center = {
    textAlign: 'center',
    fontSize: 50,
    color: brown400
}
let right = {
    float: "right",
    fontSize: 50
}

let styles = {
    position: 'center',
}

class ManagerLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment(),
            reason: '',
            data: [],
            loadTable: true,
            showview: 'block',
            showLoader: 'none',
            flag: 1,
            fetchdata: null,
        }
        this.View = this.View.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);

    }
    logout = (e) => {
        sessionStorage.clear();
        const { history } = this.props;
        history.push({
            pathname: '/LoginForm',
        })
    }
    View(e) {
        if(this.state.flag === 1) {
            this.setState({ flag: 2 });
            if(this.state.fetchdata == null){
                this.setState({ showLoader: 'block'})
                axios.get('http://localhost:8080/service/Vacation-Tracker/leave/viewLeaveStatus', {
                    params: {
                        userId: this.state.userId,
                    }
                }).then(response => {
                    this.setState({ data: response.data });
                    this.setState({fetchdata:this.state.data})
                    this.setState({ showLoader: 'none' })
                })
            }
            else{
                this.setState({showLoader:'none'})
            }
        }
        else {
            this.setState({ showLoader: 'none' })
            this.setState({ flag: 1 });
        }
        if (this.state.loadTable) {
            this.setState({ showview: 'none' })
            e.target.innerText = 'Apply Leave'
            this.setState({ loadTable: false })
        }
        else {
            e.target.innerText = 'View Leave Reportees'
            this.setState({ showview: 'block' })
            this.setState({ loadTable: true })
        }

    }
    handleStartDate(date) {
        if (date.diff(moment(), 'days') >= 0) {
            this.setState({
                startDate: date,
                endDate: date
            });
        }
    }
    handleEndDate(date) {
        if (date.diff(this.state.startDate, 'days') > 0) {
            this.setState({
                endDate: date
            });
        }
        else {
            alert('End date must be greater than start date ')
        }
    }
    handleClick(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/service/Vacation-Tracker/leave', {
            userId: sessionStorage.getItem("username"), startDate: this.state.startDate,
            endDate: this.state.endDate, reason: this.state.reason, name: sessionStorage.getItem("name")
        }).then(response => {
            if (response.data.success) {
                swal("Hurray!", "Leave Applied Successfully", "success");
            }
            else {
                swal({
                    title: "Leave exists in the date range selected",
                    text: "select different date range ",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: 'OK',

                });
            }
        }, error => {
            swal("Server Down", "Please bear with us", "error");
        })
    }
    componentWillMount() {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            window.location = '#/AssociateLeave'
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <i style={right} class="fa fa-sign-out" onClick={this.logout}></i>
                    <h3 style={center}>
                        Apply for Leave</h3>
                </div>

                <div className="Name">
                    Welcome  {sessionStorage.getItem("name")}
                </div>
                <br />
                &nbsp;&nbsp;&nbsp;<button type="button" style={styles} class="btn btn-primary" onClick={(event) => this.View(event)}>View Leave Reportees</button>
                <br /><br />
                <div class="container" style={{ display: this.state.showview }}>
                    <form action="" onSubmit={(event) => this.handleClick(event)}>
                        <div class="row">
                            <div class="col-25">
                                <label for="fname">Start-Date</label>
                            </div>
                            <div class="col-75">
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDate}
                                    className='datepick'
                                    id="startDate"
                                    minDate={moment()}

                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="lname">End-Date</label>
                            </div>
                            <div class="col-75">
                                <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleEndDate}
                                    className='datepick'
                                    ref="endDate"
                                    id="endDate"
                                    minDate={this.state.startDate}

                                />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-25">
                                <label for="subject">Reason</label>
                            </div>
                            <div class="col-75">
                                <input type="varchar" id="reason" ref="reason" name="reason" placeholder="Enter your reason" onChange={this.onChange} required />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <br />

                </div>
                <br />
                {
                    !this.state.loadTable ? <LeaveTable data={this.state.data} /> : null
                }
                <div class="loader" style={{ display: this.state.showLoader }}></div>

            </React.Fragment>
        );
    }

}
export default ManagerLeave;