import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Reminders from "./reminders/reminders";
import CreateReminder from "./create-reminder/create-reminder";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    transition: transitions.SCALE
};

export default function RouteHandler() {
    return (
        <BrowserRouter>
            <Switch>    
                    <Route exact path="/" render={routerProps => 
                        <Provider template={AlertTemplate} {...options}>
                            <Reminders/>
                        </Provider>
                    }/>
                    <Route exact path="/create" render={routerProps => 
                        <Provider template={AlertTemplate} {...options}>
                            <CreateReminder/>
                        </Provider>
                    }/>
            </Switch>
        </BrowserRouter>
    )
}