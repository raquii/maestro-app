import { Container, Grid, Paper} from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"

import { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { useStudentsMutation } from "../features/api";

import PageHeader from "./components/PageHeader"
import StudentGrid from "./students/StudentGrid";
import StudentToolbar from "./students/StudentToolbar";




export default function Students() {
    const [search, setSearch] = useState("")
    const [view, setView] = useState('')
    const match = useRouteMatch();
   
    const [fetchStudents] = useStudentsMutation();
  
    const getStudents = async () => {
        try {
            await fetchStudents()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getStudents()
    }, [])



    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                        flexDirection: {xs:'column', sm:'row'}
                    }}>
                        <StudentToolbar 
                            match={match} 
                            search={search}
                            setSearch={setSearch}
                            view={view}
                            setView={setView}
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
                        />
                    </Paper>
                </Grid>
            </Grid>

            <Switch>
                <Route path={`${match.path}/new-student`}>
                    <h1>New Student</h1>
                </Route>
            </Switch>
        </Container>
    )
}
