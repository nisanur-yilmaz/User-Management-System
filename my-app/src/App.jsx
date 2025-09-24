import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { UserProvider } from "./context.jsx";
import AddUser from "./forms/AddUser.jsx";
import UpdateUser from "./forms/UpdateUser.jsx";
import Users from "./components/Users.jsx";
import Navbar from "./layout/Navbar.jsx";
import NotFound from "./pages/NotFound.jsx";
import Contribute from "./pages/Contribute.jsx";



function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Navbar title="User App" />
                <div className="container">
                    <div className="row">

                        <hr />
                        <Routes>
                            <Route path="/" element={<Users />} />
                            <Route path="/add" element={<AddUser />} />
                            <Route path="/github" element={<Contribute />} />
                            <Route path="/update/:id" element={<UpdateUser />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>

                </div>

            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
