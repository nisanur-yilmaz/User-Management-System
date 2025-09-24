import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App.jsx";
import {UserProvider} from "./context.jsx";

ReactDOM.render(
<UserProvider>
    <App/>
</UserProvider>
    ,
    document.getElementById('root'));