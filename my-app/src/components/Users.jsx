import React, {Component} from 'react';
import User from "./User.jsx";
import UserConsumer from "../context.jsx";

class Users extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const {users} = value;
                        return (
                            <div >
                                {
                                    users.map(user => {
                                        return (
                                            <User
                                                key={user.id}
                                                id={user.id}
                                                name={user.name}
                                                salary={user.salary}
                                                department={user.department}

                                            />
                                        )

                                    })

                                }

                            </div>
                        )
                    }
                }

            </UserConsumer>


        );
        User.PropTypes = {
            name: PropTypes.string.isRequired,
            salary: PropTypes.string.isRequired,
            department: PropTypes.string.isRequired
        }
    }
}

export default Users;