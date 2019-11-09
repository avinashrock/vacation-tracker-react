import React, { Component } from 'react';
import './AssociateLeave.css';
import axios from 'axios';
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
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
class AssociateLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      reason: '',
    }
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
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
      userId: sessionStorage.getItem("username"), startDate: this.state.startDate.format("YYYY-MM-DD"),
      endDate: this.state.endDate.format("YYYY-MM-DD"), reason: this.state.reason,name: sessionStorage.getItem("name")
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
      window.location = '#/LoginForm'
    }
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
        <div class="container">
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
                  disabledDays={{ daysOfWeek: [0, 6] }}

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
                  disabledDays={{ daysOfWeek: [0, 6] }}

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
      </React.Fragment>
    );

  }

}
export default AssociateLeave;