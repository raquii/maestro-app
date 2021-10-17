import { Formik, getIn, Field } from 'formik';
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
    FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
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
    const settings = useSelector(state => state.settings.attributes);
    const families = useSelector(state => state.families);
    // const history = useHistory();
    const renderedErrors = responseErrors.map(error => <Alert key={error} severity="error">{error}</Alert>);

    const existingFamilies = families.map(fam => <MenuItem key={fam.id} value={fam.id}>{fam.names}</MenuItem>);

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
                        familyId: "",
                    },
                    existingFamily: false,
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
                            <Grid container columnSpacing={1} rowSpacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" component="h2" gutterBottom color="primary">Student Information</Typography>
                                    <Divider />
                                </Grid>

                                <Grid container item columnSpacing={.5} rowSpacing={2} alignItems="center" >
                                    <Grid item xs={12} md={2} >
                                        <Typography variant="button" color="initial">
                                            Student Name
                                        </Typography>
                                    </Grid>
                                    <Grid item md={10}>
                                        <TextField
                                            id="student.firstName"
                                            name="student.firstName"
                                            size="small"
                                            label="First Name"
                                            value={values.student.firstName}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'student.firstName') && getIn(errors, 'student.firstName'))}
                                            helperText={getIn(touched, 'student.firstName') && getIn(errors, 'student.firstName')}
                                            sx={{ mr: { xs: 0, sm: 1 }, mb: { xs: 1, md: 0 } }}
                                        />
                                        <TextField
                                            id="student.lastName"
                                            name="student.lastName"
                                            size="small"
                                            label="Last Name"
                                            value={values.student.lastName}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'student.lastName') && getIn(errors, 'student.lastName'))}
                                            helperText={getIn(touched, 'student.lastName') && getIn(errors, 'student.lastName')}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <Typography id="date-of-birth" variant="button" color="initial">
                                            Birthday
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <TextField
                                            id="studentProfile.birthday"
                                            name="studentProfile.birthday"
                                            size="small"
                                            aria-labelledby="date-of-birth"
                                            InputLabelProps={{ shrink: true }}
                                            value={values.studentProfile.birthday}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'studentProfile.birthday') && getIn(errors, 'studentProfile.birthday'))}
                                            helperText={getIn(touched, 'studentProfile.birthday') && getIn(errors, 'studentProfile.birthday')}
                                            type='date'
                                            sx={{ mr: { xs: 0, sm: 2 } }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={1}>
                                        <Typography id="gender" variant="button" color="initial">
                                            Gender
                                        </Typography>
                                    </Grid>
                                    <Grid item md={5} >
                                        <TextField
                                            id="studentProfile.gender"
                                            name="studentProfile.gender"
                                            size="small"
                                            aria-labelledby="gender"
                                            value={values.studentProfile.gender}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'studentProfile.gender') && getIn(errors, 'studentProfile.gender'))}
                                            helperText={getIn(touched, 'studentProfile.gender') && getIn(errors, 'studentProfile.gender')}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <Typography id="student-address" variant="button" color="initial">
                                            Address
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={10}>
                                        <TextField
                                            id="student.address"
                                            name="student.address"
                                            size="small"
                                            multiline
                                            minRows={2}
                                            aria-labelledby="student-address"
                                            value={values.student.address}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'student.address') && getIn(errors, 'student.address'))}
                                            helperText={getIn(touched, 'student.address') && getIn(errors, 'student.address')}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <Typography id="phone" variant="button" color="initial">
                                            Phone
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <TextField
                                            id="student.phone"
                                            name="student.phone"
                                            size="small"
                                            aria-labelledby="phone"
                                            value={values.student.phone}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'student.phone') && getIn(errors, 'student.phone'))}
                                            helperText={getIn(touched, 'student.phone') && getIn(errors, 'student.phone')}
                                            sx={{ mr: { xs: 0, sm: 2 } }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={1}>
                                        <Typography id="email" variant="button" color="initial">
                                            Email
                                        </Typography>
                                    </Grid>
                                    <Grid item md={5}>
                                        <TextField
                                            id="student.email"
                                            name="student.email"
                                            size="small"
                                            aria-labelledby="email"
                                            value={values.student.email}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'student.email') && getIn(errors, 'student.email'))}
                                            helperText={getIn(touched, 'student.email') && getIn(errors, 'student.email')}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>

                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Typography id="sms-lesson-reminders" variant="button" color="initial">
                                            Send Lesson Reminders
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Typography id="sms-lesson-reminders" variant="caption" color="initial">
                                            Text
                                        </Typography>
                                        <Field
                                            type='checkbox'
                                            component={Checkbox}
                                            aria-labelledby="sms-lesson-reminders"
                                            disabled={values.student.phone.length > 9 ? false : true}
                                            name='student.lessonReminderSms'
                                            value={values.student.lessonReminderSms}
                                            onChange={() => setFieldValue("student.lessonReminderSms", !values.student.lessonReminderSms)}
                                        />
                                        <Typography id="sms-lesson-reminders" variant="caption" color="initial">
                                            Email
                                        </Typography>
                                        <Field
                                            type='checkbox'
                                            component={Checkbox}
                                            aria-labelledby="email-lesson-reminders"
                                            disabled={values.student.email.length > 0 ? false : true}
                                            name='student.lessonReminderEmails'
                                            value={values.student.lessonReminderEmails}
                                            onChange={() => setFieldValue("student.lessonReminderEmails", !values.student.lessonReminderEmails)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <Typography id="school" variant="button" color="initial">
                                            School
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <TextField
                                            id="studentProfile.school"
                                            name="studentProfile.school"
                                            size="small"
                                            aria-labelledby="school"
                                            value={values.studentProfile.school}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'studentProfile.school') && getIn(errors, 'studentProfile.school'))}
                                            helperText={getIn(touched, 'studentProfile.school') && getIn(errors, 'studentProfile.school')}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={1}>
                                        <Typography variant="button" color="initial">
                                            Grade
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <TextField
                                            id="studentProfile.grade"
                                            name="studentProfile.grade"
                                            size="small"
                                            hiddenLabel

                                            value={values.studentProfile.grade}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'studentProfile.grade') && getIn(errors, 'studentProfile.grade'))}
                                            helperText={getIn(touched, 'studentProfile.grade') && getIn(errors, 'studentProfile.grade')}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md="auto">
                                        <Typography variant="button" color="initial">
                                            Default Lesson Duration
                                        </Typography>
                                    </Grid>
                                    <Grid item md={3}>
                                        <TextField
                                            id="studentProfile.defaultLessonDuration"
                                            name="studentProfile.defaultLessonDuration"
                                            size="small"
                                            hiddenLabel
                                            sx={{ width: 130 }}
                                            value={values.studentProfile.defaultLessonDuration}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'studentProfile.defaultLessonDuration') && getIn(errors, 'studentProfile.defaultLessonDuration'))}
                                            helperText={getIn(touched, 'studentProfile.defaultLessonDuration') && getIn(errors, 'studentProfile.defaultLessonDuration')}
                                            inputProps={{ style: { textAlign: 'center' }, }}
                                            InputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                                endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md="auto">
                                        <Typography variant="button" color="initial">
                                            Default Lesson Price
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <TextField
                                            id="studentProfile.defaultLessonPrice"
                                            name="studentProfile.defaultLessonPrice"
                                            size="small"
                                            hiddenLabel
                                            sx={{ width: 120 }}
                                            value={values.studentProfile.defaultLessonPrice}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'studentProfile.defaultLessonPrice') && getIn(errors, 'studentProfile.defaultLessonPrice'))}
                                            helperText={getIn(touched, 'studentProfile.defaultLessonPrice') && getIn(errors, 'studentProfile.defaultLessonPrice')}
                                            inputProps={{ style: { textAlign: 'center' }, }}
                                            InputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="button" color="initial">
                                            Status
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <TextField
                                            id="studentProfile.status"
                                            name="studentProfile.status"
                                            size="small"
                                            hiddenLabel
                                            value={values.studentProfile.status}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'studentProfile.status') && getIn(errors, 'studentProfile.status'))}
                                            helperText={getIn(touched, 'studentProfile.status') && getIn(errors, 'studentProfile.status')}
                                            select
                                        >
                                            <MenuItem value="active">Active</MenuItem>
                                            <MenuItem value="trial">Trial</MenuItem>
                                            <MenuItem value="inactive">Inactive</MenuItem>
                                            <MenuItem value="waiting">Waiting</MenuItem>
                                            <MenuItem value="lead">Lead</MenuItem>
                                        </TextField>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Paper>

                        <Paper sx={{ p: 3, mb: 2, }}>
                            <ResponsiveGrid container spacing={2}>

                                <Grid item xs={12}>
                                    <Typography variant="h4" component="h2" gutterBottom color="primary">Family Information</Typography>
                                    <Divider />
                                </Grid>

                                <Grid item >
                                    <Typography variant="button" color="initial">
                                        Add to Existing Family?
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                <FormControl component="fieldset">
                                        <RadioGroup row
                                            aria-label='existing-Family'
                                            id='existingFamily'
                                            name='existingFamily'
                                            value={values.existingFamily}
                                            onChange={(e)=>{
                                                handleChange(e)
                                                if(e.target.value === 'false'){
                                                    setFieldValue('student.familyId', "")
                                                }
                                            }}>
                                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                {(values.existingFamily === 'true' || values.existingFamily === true)  && <>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="button" color="initial">
                                        Select Family
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <TextField
                                        id="student.familyId"
                                        name="student.familyId"
                                        size="small"
                                        label="Select Family"
                                        disabled={values.existingFamily === 'true' ? false : true}
                                        sx={{minWidth:200}}
                                        value={values.student.familyId}
                                        onChange={handleChange}
                                        error={Boolean(getIn(touched, 'student.familyId') && getIn(errors, 'student.familyId'))}
                                        helperText={getIn(touched, 'student.familyId') && getIn(errors, 'student.familyId')}
                                        select
                                        
                                    >
                                        {existingFamilies}
                                    </TextField>
                                </Grid>
                                </>}

                                <Grid item xs={2} sm={1} >
                                    <Typography variant="button" color="initial">
                                        Adult
                                    </Typography>
                                </Grid>
                                <Grid item xs={5} sm={1}>
                                    <Field
                                        type='checkbox'
                                        component={Checkbox}
                                        name='studentProfile.adult'
                                        value={values.studentProfile.adult}
                                        onChange={() => setFieldValue("studentProfile.adult", !values.studentProfile.adult)}
                                    />
                                </Grid>

        
                                <Grid item xs={12}>
                                    <Button variant="outlined" color="primary">
                                      Add Parent/Guardian
                                    </Button>
                                </Grid>

                            </ResponsiveGrid>
                        </Paper>

                        <Paper sx={{ p: 3, mb: 2, }}>
                            <ResponsiveGrid container spacing={2}>

                                <Grid item xs={12} md={12}>
                                    <Typography variant="h4" component="h2" gutterBottom color="primary">Guardian Information</Typography>
                                    <Divider />
                                </Grid>

                                <ResponsiveGrid item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        First Name
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        id="guardian1.firstName"
                                        name="guardian1.firstName"
                                        size="small"
                                        hiddenLabel
                                        value={values.guardian1.firstName}
                                        onChange={handleChange}
                                        error={Boolean(getIn(touched, 'guardian1.firstName') && getIn(errors, 'guardian1.firstName'))}
                                        helperText={getIn(touched, 'guardian1.firstName') && getIn(errors, 'guardian1.firstName')}
                                    />
                                </Grid>

                                <ResponsiveGrid item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Last Name
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        id="guardian1.lastName"
                                        name="guardian1.lastName"
                                        size="small"
                                        hiddenLabel
                                        value={values.guardian1.lastName}
                                        onChange={handleChange}
                                        error={Boolean(getIn(touched, 'guardian1.lastName') && getIn(errors, 'guardian1.lastName'))}
                                        helperText={getIn(touched, 'guardian1.lastName') && getIn(errors, 'guardian1.lastName')}
                                    />
                                </Grid>

                                <ResponsiveGrid item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Phone
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        id="guardian1.phone"
                                        name="guardian1.phone"
                                        size="small"
                                        hiddenLabel
                                        value={values.guardian1.phone}
                                        onChange={handleChange}
                                        error={Boolean(getIn(touched, 'guardian1.phone') && getIn(errors, 'guardian1.phone'))}
                                        helperText={getIn(touched, 'guardian1.phone') && getIn(errors, 'guardian1.phone')}
                                    />
                                </Grid>

                                <ResponsiveGrid item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Send Lesson SMS Reminders
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    <Field
                                        type='checkbox'
                                        component={Checkbox}
                                        name='guardian1.lessonReminderSms'
                                        value={values.guardian1.lessonReminderSms}
                                        onChange={() => setFieldValue("guardian1.lessonReminderSms", !values.guardian1.lessonReminderSms)}
                                    />
                                </Grid>

                                <ResponsiveGrid item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Email
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        id="guardian1.email"
                                        name="guardian1.email"
                                        size="small"
                                        hiddenLabel
                                        value={values.guardian1.email}
                                        onChange={handleChange}
                                        error={Boolean(getIn(touched, 'guardian1.email') && getIn(errors, 'guardian1.email'))}
                                        helperText={getIn(touched, 'guardian1.email') && getIn(errors, 'guardian1.email')}
                                    />
                                </Grid>

                                <ResponsiveGrid item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Send Lesson Email Reminders
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    <Field
                                        type='checkbox'
                                        component={Checkbox}
                                        name='guardian1.lessonReminderEmails'
                                        value={values.guardian1.lessonReminderEmails}
                                        onChange={() => setFieldValue("guardian1.lessonReminderEmails", !values.guardian1.lessonReminderEmails)}
                                    />
                                </Grid>

                                <ResponsiveGrid item xs={12} sm={3}>
                                    <Typography variant="button" color="initial">
                                        Address
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        id="guardian1.address"
                                        name="guardian1.address"
                                        size="small"
                                        multiline
                                        minRows={2}
                                        hiddenLabel
                                        value={values.guardian1.address}
                                        onChange={handleChange}
                                        error={Boolean(getIn(touched, 'guardian1.address') && getIn(errors, 'guardian1.address'))}
                                        helperText={getIn(touched, 'guardian1.address') && getIn(errors, 'guardian1.address')}
                                    />
                                </Grid>

                            </ResponsiveGrid>
                        </Paper>

                    </Box>
                )}
            </Formik>
        </Container >
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