import React, {Component} from "react";
import UserConsumer from "../context.jsx";
import {motion, AnimatePresence} from "framer-motion";
import axios from "axios";

class AddUser extends Component {
    state = {
        name: "",
        department: "",
        salary: "",
        visible: false,
        error: false
    };

    componentDidMount() {
        const savedVisible = localStorage.getItem("addUserVisible") === "true";
        this.setState({visible: savedVisible});
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    changeVisibility = () => {
        const newVisible = !this.state.visible;
        this.setState({visible: newVisible});
        localStorage.setItem("addUserVisible", newVisible);
    };
    validateForm = () => {
        const {name, salary, department} = this.state
        if (name === "" || salary === "" || department === "") {
            return false;
        }
        return true;
    }


    addUser = async (dispatch, e) => {
        e.preventDefault();
        const {name, department, salary} = this.state;

        const newUser = {name, department, salary}
        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        dispatch({type: "ADD_USER", payload: newUser});

        await axios.post("http://localhost:3004/users", newUser);
        this.setState({name: "", department: "", salary: ""});
    };

    render() {
        const {name, department, salary, visible, error} = this.state;

        return (
            <UserConsumer>
                {value => (
                    <div className="col-sm-4 mx-auto mb-4">
                        <button
                            onClick={this.changeVisibility}
                            className="btn btn-dark w-100 mb-2"
                        >
                            {visible ? "Hide Form" : "Show Form"}
                        </button>

                        <AnimatePresence>
                            {visible && (
                                <motion.div
                                    className="card"
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: visible ? 1 : 0, height: visible ? 'auto' : 0}}
                                    transition={{duration: 0.3}}
                                    style={{overflow: 'hidden' ,backgroundColor: '#EAFAEA'}}
                                >
                                    <div className="card-header">
                                        <h4>Add User Form</h4>
                                    </div>
                                    <div className="card-body">
                                        {
                                            error ?
                                                <div className="alert alert-danger">
                                                    Lütfen Bilgilerinizi Kontrol edin.
                                                </div>
                                                : null
                                        }
                                        <form onSubmit={(e) => this.addUser(value.dispatch, e)}>
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
                                            <button type="submit" className="btn  w-100 mt-2" style={{backgroundColor:"#B6CEB4"}}>
                                                Add User
                                            </button>
                                        </form>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </UserConsumer>
        );
    }
}

export default AddUser;
