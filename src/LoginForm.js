import React, { Component } from 'react';
import './LoginForm.css';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { darkBlack } from 'material-ui/styles/colors';

let center = {
    textAlign: 'center',
    color:darkBlack,
    fontSize:75,
}
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: '',
            open: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        

    }
    componentWillMount(){
        const {history} = this.props; 
        if(sessionStorage.getItem('username') !== null && sessionStorage.getItem('username') !== ''){
        if(sessionStorage.getItem('reportee') === "true")
            history.push('/ManagerLeave');
        else {
            history.push('/AssociateLeave');
        }
    }
    }
    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onCloseModal() {
        this.setState({ open: false });
    }
    handleClick(event) {
        event.preventDefault();
        const { history } = this.props;
        this.setState({ loggedIn: false });
        axios.post('http://localhost:8080/service/Vacation-Tracker/login', { username: this.refs.username.value, password: this.refs.password.value })
            .then(response => {
                sessionStorage.setItem("username",this.refs.username.value);
                sessionStorage.setItem("name",response.data.name);
                sessionStorage.setItem("reportee",response.data.reportee);

                if ((response.status === 200 && response.data.reportee === false)) {
                    this.setState({ loggedIn: true });
                    history.push({
                        pathname: '/AssociateLeave',
                        state: { detail: response.data }
                    })
                }
                else if ((response.status === 200 && response.data.reportee === true)) {
                    this.setState({ loggedIn: true });
                    history.push({
                        pathname: '/ManagerLeave',
                        state: { detail: response.data }
                    })
                }
            }, error => {
                this.setState({ open: true });
            }
            ).catch(error => {
                alert("internal server error");
            }
        );
    }

    render(){
       return (
        <React.Fragment>
            <div>
            <h3 style={center}>
                Vacation Tracker</h3>
           </div>
                <div>
                    <div className="body"></div>
                    <div className="grad"></div>
                    <br />
                    <div className="login" >
                    
                        <form action="" onSubmit={(event) => this.handleClick(event)}>
                            <input type="text" ref="username" placeholder="AssociateId" name="username" onChange={this.onChange} required /><br />
                            <input type="password" ref="password" placeholder="Password" name="password " onChange={this.onChange} required /><br />
                            <div className="loginButton">
                                <button type="submit" className="submit" >Assocaite Login</button>
                            </div>
                        </form> 
                    </div>
                </div>
                <div>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <h3>Unauthorized Client error</h3>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }

}
export default LoginForm;