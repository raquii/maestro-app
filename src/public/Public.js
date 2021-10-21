import { Switch, Route } from "react-router-dom"
import Welcome from "./Welcome"
import Nav from "./Nav"
import SignUp from "./SignUp"
import SignIn from "./SignIn"


export default function Public() {
    return (
        <>
            <Nav />
            <main>
                <Switch>
                    <Route path='/welcome'>
                        <Welcome />
                    </Route>
                    <Route path='/signup'>
                        <SignUp />
                    </Route>
                    <Route path='/signin'>
                        <SignIn />
                    </Route>
                </Switch>

            </main>
        </>
    )
}
