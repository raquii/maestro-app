import { Formik, Field } from 'formik';
import { useState } from 'react';
// import { useHistory } from 'react-router';
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Checkbox,
    Container,
    Divider,
    Grid,
    InputAdornment,
    MenuItem,
    Paper,
    TextField, 
    Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import studentValidationSchema from './studentValidationSchema';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PageHeader from '../components/PageHeader';
import ResponsiveGrid from '../components/ResponsiveGrid';



export default function NewStudentForm() {
    const [responseErrors, setResponseErrors] = useState([]);
    const settings = useSelector(state => state.settings.attributes)
    // const history = useHistory();
    const renderedErrors = responseErrors.map(error => <Alert key={error} severity="error">{error}</Alert>)


    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: 10 }}
                open={false}
            >
                <CircularProgress />
            </Backdrop>
            <PageHeader
                icon={<PersonAddIcon fontSize="large" sx={{ mr: 1 }} />}
                page="Add New Student"
            />

            <Formik
                initialValues={{
                    student: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        address: "",
                        lessonReminderEmails: false,
                        lessonReminderSms: false,
                        role: 1,
                        family_id: "",
                    },
                    existing_family: false,
                    studentProfile: {
                        grade: "",
                        school: "",
                        birthday: "",
                        adult: false,
                        defaultLessonPrice: settings.defaultLessonPrice,
                        defaultLessonDuration: settings.defaultLessonDuration,
                        status: "active",
                        gender: "",
                    },
                    guardian1: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        address: "",
                        lessonReminderEmails: false,
                        lessonReminderSms: false,
                        role: 2,
                    },
                    guardian2: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        address: "",
                        lessonReminderEmails: false,
                        lessonReminderSms: false,
                        role: 2,
                    }
                }}
                // validationSchema={studentValidationSchema}
                onSubmit={values => {
                    console.log(values)
                    if (values.errors) {
                        setResponseErrors(values.errors)
                    }
                }}>
                {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                    <Box component="form" sx={{ textAlign: 'left', display: 'flex', flexFlow: 'column' }}>
                        <Paper sx={{ p: 3, mb: 2, }}>
                            <ResponsiveGrid container spacing={2}>

                            <Grid item xs={12} md={12}>
                                    <Typography variant="h4" component="h2" gutterBottom color="primary">Student Information</Typography>
                                    <Divider />
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        First Name
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Last Name
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Phone
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Send Lesson SMS Reminders
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    CHECKBOX
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Email
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Send Lesson Email Reminders
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    CHECKBOX
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Address
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA - multiline
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Gender
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Birthday
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA - date
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Default Lesson Price
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA - numeric
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Default Lesson Duration
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA - numeric
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Status
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA - SELECT
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        School
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Grade
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                               
                            </ResponsiveGrid>
                        </Paper>

                        <Paper sx={{ p: 3, mb: 2, }}>
                            <ResponsiveGrid container spacing={2}>

                            <Grid item xs={12} md={12}>
                                    <Typography variant="h4" component="h2" gutterBottom color="primary">Family Information</Typography>
                                    <Divider />
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Member of Existing Family?
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    CHECKBOX
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Select Family
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA - SELECT - list of existing studio families
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Adult Student
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    CHECKBOX
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Add Guardian
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    BUTTON - to add guardian
                                </Grid>
                               
                            </ResponsiveGrid>
                        </Paper>

                        <Paper sx={{ p: 3, mb: 2, }}>
                            <ResponsiveGrid container spacing={2}>

                            <Grid item xs={12} md={12}>
                                    <Typography variant="h4" component="h2" gutterBottom color="primary">Guardian Information</Typography>
                                    <Divider />
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        First Name
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Last Name
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Phone
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Send Lesson SMS Reminders
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    CHECKBOX
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Email
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Send Lesson Email Reminders
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    CHECKBOX
                                </Grid>

                                <ResponsiveGrid container item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Address
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    TEXTAREA - multiline
                                </Grid>
                               
                            </ResponsiveGrid>
                        </Paper>

                    </Box>
                )}
            </Formik>
        </Container>
    )
}

{/* 
<ResponsiveGrid container item xs={12} sm={3}>
<Typography variant="button" color="initial">
    HEADER HERE
</Typography>
</ResponsiveGrid>
<Grid item xs={12} sm={9}>
FORM INPUT HERE
</Grid> 

*/}