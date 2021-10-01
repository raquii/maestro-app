import { Route, Switch } from "react-router";
import { Box, Toolbar } from "@mui/material";

import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard"
import Students from "./Students";
import Calendar from "./Calendar"
import Settings from "./Settings";
import Profile from "./Profile";
import Billing from "./Billing";

export default function Private() {
    //I want a header at the top, that renders the users name in the right corner
    //a sidebar navigation menu with link components for routes

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box 
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    mt: 8
                }} 
            >
                {/* <Toolbar /> */}
                <Switch>
                    <Route path='/dashboard'>
                        <Dashboard />
                    </Route>
                    <Route path='/students'>
                        <Students />
                    </Route>
                    <Route path='/calendar'>
                        <Calendar />
                    </Route>
                    <Route path='/billing'>
                        <Billing />
                    </Route>
                    <Route path='/settings'>
                        <Settings />
                    </Route>
                    <Route path='/profile'>
                        <Profile />
                    </Route>
                </Switch>
            </Box>
        </Box>
    )
}
