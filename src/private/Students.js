import { Container, Grid, Paper } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"
import { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import PageHeader from "./components/PageHeader"
import StudentGrid from "./students/StudentGrid";
import StudentToolbar from "./students/StudentToolbar";
import NewStudentForm from "./students/NewStudentForm";
import EmailDialogue from "./students/EmailDialogue";
import {
    ResetMakeUpCreditsConfirmation,
    LoginEmailConfirmation,
    DeleteSelectedConfirmation,
    NoSelectedStudents
} from "./students/ConfirmationModals";
import { useUpdateStudentsMutation } from "../features/api";


export default function Students() {
    const [updateStudents] = useUpdateStudentsMutation();
    const [search, setSearch] = useState("")
    const [view, setView] = useState('')
    const [emailDialogue, setEmailDialogue] = useState({
        open: false,
        selectedStudents: false,
        selectedParents: false
    })
    const [selection, setSelection] = useState([]);
    const [displayConfirmation, setDisplayConfirmation] = useState({
        noSelection: false,
        makeups: false,
        delete: false,
        loginEmail: { display: false, to: "" }
    })

    const match = useRouteMatch();

    function toggleShowEmail() {
        setEmailDialogue((state => ({
            ...state, open: !state.open, selectedStudents: false,
            selectedParents: false
        })))
    }

    function handleConfirmationDialogues(e) {
        const type = selection.length > 0 ? e.target.id : 'noSelection'

        switch (type) {
            case 'noSelection':
                setDisplayConfirmation(state => ({ ...state, noSelection: true }))
                break;
            case 'loginEmailsStudents':
                setDisplayConfirmation(state => ({ ...state, loginEmail: { display: true, to: 'students' } }))
                break;
            case 'loginEmailsParents':
                setDisplayConfirmation(state => ({ ...state, loginEmail: { display: true, to: 'parents' } }))
                break;
            case 'resetMUC':
                setDisplayConfirmation(state => ({ ...state, makeups: true }))
                break;
            case 'deleteStudents':
                setDisplayConfirmation(state => ({ ...state, delete: true }))
                break;

            default:
                setDisplayConfirmation({
                    noSelection: false,
                    makeups: false,
                    delete: false,
                    loginEmail: { display: false, to: "" }
                })
                break;
        }
    }

    async function handleStatusChange(newStatus) {
        const studentsToUpdate = { ids: selection.map(s => (s.id)), status: newStatus }
        console.log(studentsToUpdate)

        if (selection.length === 0) {
            handleConfirmationDialogues()
        } else {
            try {
                await updateStudents(studentsToUpdate).unwrap()
            } catch (err) {
                console.log(err)
            }

        }
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {emailDialogue.open && <EmailDialogue
                settings={emailDialogue}
                handleClose={toggleShowEmail}
                includeParents={emailDialogue.selectedParents}
                includeStudents={emailDialogue.selectedStudents}
                selected={selection}
            />}
            <NoSelectedStudents
                open={displayConfirmation.noSelection}
                handleClose={setDisplayConfirmation}
            />
            {displayConfirmation.makeups && <ResetMakeUpCreditsConfirmation
                open={displayConfirmation.makeups}
                handleClose={handleConfirmationDialogues}
                selected={selection}
            />}
            {displayConfirmation.loginEmail.display && <LoginEmailConfirmation
                open={displayConfirmation.loginEmail.display}
                handleClose={handleConfirmationDialogues}
                selected={selection}
                to={displayConfirmation.loginEmail.to}
            />}
            {displayConfirmation.delete && <DeleteSelectedConfirmation
                open={displayConfirmation.delete}
                closeMenu={setDisplayConfirmation}
                selected={selection}
                setSelection={setSelection}
            />}
            <Switch>
                <Route path={`${match.path}/new-student`}>
                    <NewStudentForm />
                </Route>
                <Route exact path={`${match.path}`}>

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
                                    handleConfirmationDialogues={handleConfirmationDialogues}
                                    handleStatusChange={handleStatusChange}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{
                                height: 600,
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
                <Route path={`${match.path}/:studentId`}>

                </Route>
            </Switch>
        </Container>
    )
}
