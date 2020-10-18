
import React, {Component} from 'react';
import './App.css';

import PurchaseOrder from "./components/PurchaseOrder";
import Home from "./components/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { NavLink } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/"> Home </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/department"> Department </NavLink>
                    </nav>

                    <main role="main">
                        <div className="jumbotron">
                            <div className="container text-center">
                                <br/>
                                <h1>Procurement for construction industry</h1>
                            </div>
                        </div>
                    </main>


                    <Switch>
                        <Route path='/' exact> <PurchaseOrder/> </Route>
                        <Route path='/department'> <PurchaseOrder/> </Route>
                    </Switch>

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
