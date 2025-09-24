import React, {Component} from "react";
import UserConsumer from "../context.jsx";
import axios from "axios";
import {withRouter} from "../withRouter";


class UpdateUser extends Component {
    state = {
        name: "",
        department: "",
        salary: "",
        error: false

    };
    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    componentDidMount = async () => {
        const {id} = this.props.router.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`);
        const {name, salary, department} = response.data;
        this.setState({name, salary, department});
    };
    validateForm = () => {
        const {name, salary, department} = this.state
        if (name === "" || salary === "" || department === "") {
            return false;
        }
        return true;
    }


    UpdateUser = async (dispatch, e) => {
        e.preventDefault();
        const {name, department, salary} = this.state;
        const {id} = this.props.router.params;
        const updatedUser = {
            name,
            salary,
            department
        };
        const response = await axios.put(`http://localhost:3004/users/${id}`, updatedUser);
        dispatch({type: "UPDATE_USER", payload: response.data});
        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

    };


    render() {
        const {name, department, salary, error} = this.state;

        return (
            <UserConsumer>
                {value => (
                    <div className="col-sm-4 mx-auto mb-4">
                        <div className="card" style={{backgroundColor: '#EAFAEA'}}>
                            <div className="card-header">
                                <h4>Update User Form</h4>
                            </div>
                            <div className="card-body">
                                {
                                    error ?
                                        <div className="alert alert-danger">
                                            Lütfen Bilgilerinizi Kontrol edin.
                                        </div>
                                        : null
                                }
                                <form onSubmit={(e) => this.UpdateUser(value.dispatch, e)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter Name"
                                            className="form-control"
                                            value={name}
                                            onChange={this.changeInput}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="department">Department</label>
                                        <input
                                            type="text"
                                            name="department"
                                            id="department"
                                            placeholder="Enter Department"
                                            className="form-control"
                                            value={department}
                                            onChange={this.changeInput}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="salary">Salary</label>
                                        <input
                                            type="text"
                                            name="salary"
                                            id="salary"
                                            placeholder="Enter Salary"
                                            className="form-control"
                                            value={salary}
                                            onChange={this.changeInput}
                                        />
                                    </div>
                                    <button  type="submit" className="btn  w-100 mt-2" style={{backgroundColor:"#B6CEB4"}} >
                                        Update User
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                )}
            </UserConsumer>
        );
    }
}

export default withRouter(UpdateUser);
