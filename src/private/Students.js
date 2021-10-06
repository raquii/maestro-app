import { Container, Grid, Paper } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"

import { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import PageHeader from "./components/PageHeader"
import StudentGrid from "./students/StudentGrid";
import StudentToolbar from "./students/StudentToolbar";
import NewStudentForm from "./students/NewStudentForm";
import EmailDialogue from "./students/EmailDialogue";


export default function Students() {
    const [search, setSearch] = useState("")
    const [view, setView] = useState('')
    
    const [emailDialogue, setEmailDialogue] = useState({
        open:false, 
        selectedStudents: false, 
        selectedParents: false
    })
    console.log('emailDialogue:', emailDialogue)
    const [selection, setSelection] = useState([]);
    const match = useRouteMatch();

    function toggleShowEmail(){
        setEmailDialogue((state=>({...state, open: !state.open, selectedStudents: false, 
            selectedParents: false})))
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <EmailDialogue
                settings={emailDialogue}
                handleClose={toggleShowEmail}
                includeParents={emailDialogue.selectedParents}
                includeStudents={emailDialogue.selectedStudents}
                selected={selection}
                />
            <Switch>
                <Route path={`${match.path}/new-student`}>
                    <NewStudentForm />
                </Route>
                <Route path="/">

                    <PageHeader
                        icon={<GroupsIcon fontSize="large" sx={{ mr: 1 }} />}
                        page="Students"
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={12}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: { xs: 'column', sm: 'row' }
                            }}>
                                <StudentToolbar
                                    match={match}
                                    search={search}
                                    setSearch={setSearch}
                                    view={view}
                                    setView={setView}
                                    setEmailRecipients={setEmailDialogue}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{
                                height: 400,
                                width: "100%"
                            }}>
                                <StudentGrid
                                    search={search}
                                    view={view}
                                    setSelection={setSelection}
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                </Route>
            </Switch>
        </Container>
    )
}
