import React, {Component} from 'react';
import PropTypes from "prop-types";
import UserConsumer from "../context.jsx";
import axios from "axios";
import {Link} from "react-router-dom";

class User extends Component {
    state = {
        isVisible: false
    }

    static defaultProps = {
        name: "Bilgi yok",
        salary: "Bilgi yok",
        department: "Bilgi yok",
    }

    onClickEvent = (e) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    onDeleteUser = async (dispatch, e) => {
        const {id} = this.props;
       await axios.delete(`http://localhost:3004/users/${id}`)
        dispatch({type: "DELETE_USER", payload: id});
    }

    render() {
        const { id,name, department, salary} = this.props;
        const {isVisible} = this.state;

        return (
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;

                        return (
                            <div className="col-sm-4 mx-auto mb-4">
                                <div className="card"

                                     style={isVisible ? {backgroundColor: "#EAFAEA", color: "black"} : {backgroundColor:"#D9E9CF"}}>
                                    <div className="card-header d-flex justify-content-between">
                                        <h4 className="d-inline" onClick={this.onClickEvent}>
                                            {name}
                                        </h4>
                                        <i
                                            onClick={this.onDeleteUser.bind(this, dispatch)}
                                            className="far fa-trash-alt"
                                            style={{cursor: "pointer"}}>
                                        </i>
                                    </div>
                                    {
                                        isVisible ? <div className="card-body">
                                            <p className="card-text">Maaş: {salary}</p>
                                            <p className="card-text">Department: {department}</p>
                                            <Link to={`update/${id}`} className="btn  w-100" style={{backgroundColor:"#B6CEB4"}}>Update User</Link>

                                        </div> : null
                                    }
                                </div>
                            </div>
                        );
                    }
                }
            </UserConsumer>
        )
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired

};

export default User;
