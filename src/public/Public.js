import Nav from "./Nav"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import { Switch, Route } from "react-router-dom"

export default function Public() {
    return (
        <>
            <Nav />
            <main>
                <Switch>
                    <Route path='/welcome'>

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
