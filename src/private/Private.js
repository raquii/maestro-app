import { Route, Switch } from "react-router";
import { Box } from "@mui/material";

import Sidebar from "./Sidebar";

export default function Private() {
    //I want a header at the top, that renders the users name in the right corner
    //a sidebar navigation menu with link components for routes
    
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Switch>
                <Route path='/dashboard'>
                    <h1>Home</h1>
                </Route>
                <Route path='/students'>
                    <h1>Students</h1>
                </Route>
                <Route path='/calendar'>
                    <h1>Calendar</h1>
                </Route>
                <Route path='/billing'>
                    <h1>Biling</h1>
                </Route>
                <Route path='/settings'>
                    <h1>Settings</h1>
                </Route>
            </Switch>
        </Box>
    )
}
