import { Formik, getIn, Field } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router';
import SaveIcon from "@mui/icons-material/Save"
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PageHeader from '../components/PageHeader';
import ResponsiveGrid from '../components/ResponsiveGrid';
import { useCreateStudentMutation } from '../../features/api';

export default function NewStudentForm() {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const history = useHistory();
    const [createStudent]=useCreateStudentMutation();

    const [responseErrors, setResponseErrors] = useState([]);
    const [addGuardian, setAddGuardian] = useState({a: false, b: false});

    const settings = useSelector(state => state.settings.attributes);
    const families = useSelector(state => state.families);
    const studioId= useSelector(state=> state.user.studioId)

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
                    studentProfile: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        address: "",
                        lessonReminderEmails: false,
                        lessonReminderSms: false,
                        familyId: "",
                        grade: "",
                        school: "",
                        birthday: "",
                        adult: false,
                        defaultLessonPrice: settings.defaultLessonPrice,
                        defaultLessonDuration: settings.defaultLessonDuration,
                        status: "active",
                        gender: "",
                        studioId: studioId
                    },
                    existingFamily: false,
                    guardianProfileA: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        address: "",
                        lessonReminderEmails: false,
                        lessonReminderSms: false,
                        studioId: studioId
                    },
                    guardianProfileB: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        address: "",
                        lessonReminderEmails: false,
                        lessonReminderSms: false,
                        studioId: studioId
                    }
                }}
                onSubmit={values => {
                    createStudent(values)

                    if (values.errors) {
                        setResponseErrors(values.errors)
                    }else{
                        history.push('/students')
                    }
                }}>
                {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                    <Box component="form" sx={{ textAlign: 'left', display: 'flex', flexFlow: 'column', pb: 8 }}>
                        <Paper sx={{ p: 3, mb: 3, }}>
                            <Grid container columnSpacing={1} rowSpacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" component="h2" gutterBottom color="primary">Student Information</Typography>
                                    <Divider />
                                </Grid>

                                <Grid container item spacing={3} columns={4}>
                                    <Grid item container spacing={2} >
                                        <Grid item xs={4} md={2}>
                                            <TextField
                                                id="studentProfile.firstName"
                                                name="studentProfile.firstName"
                                                size="small"
                                                label="First Name"
                                                fullWidth
                                                required
                                                value={values.studentProfile.firstName}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.firstName') && getIn(errors, 'studentProfile.firstName'))}
                                                helperText={getIn(touched, 'studentProfile.firstName') && getIn(errors, 'studentProfile.firstName')}

                                            />
                                        </Grid>
                                        <Grid item xs={4} md={2}>
                                            <TextField
                                                id="studentProfile.lastName"
                                                name="studentProfile.lastName"
                                                required
                                                fullWidth
                                                size="small"
                                                label="Last Name"
                                                value={values.studentProfile.lastName}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.lastName') && getIn(errors, 'studentProfile.lastName'))}
                                                helperText={getIn(touched, 'studentProfile.lastName') && getIn(errors, 'studentProfile.lastName')}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={4} md={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="studentProfile.birthday"
                                                name="studentProfile.birthday"
                                                size="small"
                                                label="Date of Birth"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                value={values.studentProfile.birthday}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.birthday') && getIn(errors, 'studentProfile.birthday'))}
                                                helperText={getIn(touched, 'studentProfile.birthday') && getIn(errors, 'studentProfile.birthday')}
                                                type='date'
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: 2 }}>
                                            <Typography id="adult-student" variant="button" color="primary">
                                                Adult Student:
                                            </Typography>
                                            <Field
                                                type='checkbox'
                                                component={Checkbox}
                                                aria-labelledby='adult-student'
                                                name='studentProfile.adult'
                                                value={values.studentProfile.adult}
                                                onChange={() => setFieldValue("studentProfile.adult", !values.studentProfile.adult)}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={4} md="auto">
                                        <TextField
                                            id="studentProfile.gender"
                                            name="studentProfile.gender"
                                            size="small"
                                            label="Gender"
                                            fullWidth={!smallScreen}
                                            value={values.studentProfile.gender}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'studentProfile.gender') && getIn(errors, 'studentProfile.gender'))}
                                            helperText={getIn(touched, 'studentProfile.gender') && getIn(errors, 'studentProfile.gender')}
                                        />
                                    </Grid>

                                    <Grid item xs={4} md={2}>
                                        <TextField
                                            id="studentProfile.address"
                                            name="studentProfile.address"
                                            size="small"
                                            multiline
                                            fullWidth
                                            minRows={3}
                                            label="Address"
                                            value={values.studentProfile.address}
                                            onChange={handleChange}
                                            error={Boolean(getIn(touched, 'studentProfile.address') && getIn(errors, 'studentProfile.address'))}
                                            helperText={getIn(touched, 'studentProfile.address') && getIn(errors, 'studentProfile.address')}
                                        />
                                    </Grid>

                                    <ResponsiveGrid item container columnSpacing={8} rowSpacing={3}>
                                        <Grid item xs={4} md={2}>
                                            <TextField
                                                id="studentProfile.school"
                                                name="studentProfile.school"
                                                size="small"
                                                label="School"
                                                fullWidth
                                                value={values.studentProfile.school}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.school') && getIn(errors, 'studentProfile.school'))}
                                                helperText={getIn(touched, 'studentProfile.school') && getIn(errors, 'studentProfile.school')}
                                            />
                                        </Grid>

                                        <Grid item >
                                            <TextField
                                                id="studentProfile.grade"
                                                name="studentProfile.grade"
                                                size="small"
                                                label="Grade"
                                                sx={{ width: 120 }}
                                                value={values.studentProfile.grade}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.grade') && getIn(errors, 'studentProfile.grade'))}
                                                helperText={getIn(touched, 'studentProfile.grade') && getIn(errors, 'studentProfile.grade')}
                                            />
                                        </Grid>
                                    </ResponsiveGrid>

                                    <Grid item container spacing={1} >
                                        <Grid item xs={4} md={1}>
                                            <TextField
                                                id="studentProfile.phone"
                                                name="studentProfile.phone"
                                                size="small"
                                                label="Phone Number"
                                                fullWidth={!smallScreen}
                                                value={values.studentProfile.phone}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.phone') && getIn(errors, 'studentProfile.phone'))}
                                                helperText={getIn(touched, 'studentProfile.phone') && getIn(errors, 'studentProfile.phone')}
                                                sx={{ mr: { xs: 0, sm: 2 } }}
                                            />
                                        </Grid>

                                        <Grid item xs={4} md={2}>
                                            <TextField
                                                id="studentProfile.email"
                                                name="studentProfile.email"
                                                size="small"
                                                label="Email Address"
                                                fullWidth
                                                value={values.studentProfile.email}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.email') && getIn(errors, 'studentProfile.email'))}
                                                helperText={getIn(touched, 'studentProfile.email') && getIn(errors, 'studentProfile.email')}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Divider />
                                    </Grid>

                                    <Grid item xs={4} sx={{ textAlign: 'center', }}>
                                        <Typography id="sms-lesson-reminders" gutterBottom variant="button" color="primary" sx={{ fontSize: 'body1.fontSize' }}>
                                            Send Lesson Reminders
                                        </Typography>
                                        <br />
                                        <Typography id="sms-lesson-reminders" variant="caption" color="initial">
                                            Text
                                        </Typography>
                                        <Field
                                            type='checkbox'
                                            component={Checkbox}
                                            aria-labelledby="sms-lesson-reminders"
                                            disabled={values.studentProfile.phone.length > 9 ? false : true}
                                            name='studentProfile.lessonReminderSms'
                                            value={values.studentProfile.lessonReminderSms}
                                            onChange={() => setFieldValue("studentProfile.lessonReminderSms", !values.studentProfile.lessonReminderSms)}
                                        />
                                        <Typography id="sms-lesson-reminders" variant="caption" color="initial">
                                            Email
                                        </Typography>
                                        <Field
                                            type='checkbox'
                                            component={Checkbox}
                                            aria-labelledby="email-lesson-reminders"
                                            disabled={values.studentProfile.email.length > 0 ? false : true}
                                            name='studentProfile.lessonReminderEmails'
                                            value={values.studentProfile.lessonReminderEmails}
                                            onChange={() => setFieldValue("studentProfile.lessonReminderEmails", !values.studentProfile.lessonReminderEmails)}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 2 }}>
                                        <Divider />
                                    </Grid>

                                    <Grid container item rowSpacing={3} columnSpacing={10} justifyContent="center">

                                        <Grid item >
                                            <TextField
                                                id="studentProfile.defaultLessonDuration"
                                                name="studentProfile.defaultLessonDuration"
                                                size="small"
                                                label="Default Lesson Duration"
                                                InputLabelProps={{ shrink: true }}
                                                value={values.studentProfile.defaultLessonDuration}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.defaultLessonDuration') && getIn(errors, 'studentProfile.defaultLessonDuration'))}
                                                helperText={getIn(touched, 'studentProfile.defaultLessonDuration') && getIn(errors, 'studentProfile.defaultLessonDuration')}
                                                inputProps={{ style: { textAlign: 'center' }, }}
                                                sx={{ width: 200 }}
                                                InputProps={{
                                                    inputMode: 'numeric',
                                                    pattern: '[0-9]*',
                                                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                                                }}
                                            />
                                        </Grid>

                                        <Grid item >
                                            <TextField
                                                id="studentProfile.defaultLessonPrice"
                                                name="studentProfile.defaultLessonPrice"
                                                size="small"
                                                label="Default Lesson Price"
                                                InputLabelProps={{ shrink: true }}
                                                value={values.studentProfile.defaultLessonPrice}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.defaultLessonPrice') && getIn(errors, 'studentProfile.defaultLessonPrice'))}
                                                helperText={getIn(touched, 'studentProfile.defaultLessonPrice') && getIn(errors, 'studentProfile.defaultLessonPrice')}
                                                inputProps={{ style: { textAlign: 'center' }, }}
                                                sx={{ width: 200 }}
                                                InputProps={{
                                                    inputMode: 'numeric',
                                                    pattern: '[0-9]*',
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                        </Grid>

                                        <Grid item >
                                            <TextField
                                                id="studentProfile.status"
                                                name="studentProfile.status"
                                                size="small"
                                                label="Status"
                                                required
                                                InputLabelProps={{ shrink: true }}
                                                value={values.studentProfile.status}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.status') && getIn(errors, 'studentProfile.status'))}
                                                helperText={getIn(touched, 'studentProfile.status') && getIn(errors, 'studentProfile.status')}
                                                select
                                                sx={{ width: 200 }}
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

                            </Grid>
                        </Paper>

                        <Paper sx={{ p: 3, mb: 3, }}>
                            <ResponsiveGrid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" component="h2" gutterBottom color="primary">Family Information</Typography>
                                    <Divider />
                                </Grid>

                                <Grid item container rowSpacing={2} columnSpacing={2} columns={3} sx={{ textAlign: 'center' }} alignItems="center" justifyContent="center">
                                    <Grid item xs={3} >
                                        <Typography variant="button" color="initial">
                                            Does this student belong to an existing family?
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}  >
                                        <FormControl component="fieldset">
                                            <RadioGroup row
                                                aria-label='existing-Family'
                                                id='existingFamily'
                                                name='existingFamily'
                                                value={values.existingFamily}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    if (e.target.value === 'false') {
                                                        setFieldValue('studentProfile.familyId', "")
                                                    }
                                                }}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {(values.existingFamily === 'true' || values.existingFamily === true) && <>
                                        <Grid item xs={3} >
                                            <TextField
                                                id="studentProfile.familyId"
                                                name="studentProfile.familyId"
                                                size="small"
                                                label="Select Family"
                                                disabled={values.existingFamily === 'true' ? false : true}
                                                sx={{ minWidth: 200, width: 300 }}
                                                value={values.studentProfile.familyId}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'studentProfile.familyId') && getIn(errors, 'studentProfile.familyId'))}
                                                helperText={getIn(touched, 'studentProfile.familyId') && getIn(errors, 'studentProfile.familyId')}
                                                select
                                            >
                                                {existingFamilies}
                                            </TextField>
                                        </Grid>
                                    </>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                {values.studentProfile.adult === false &&

                                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                                        <Button variant="outlined" color={addGuardian.a ? "secondary" : "primary"} onClick={() => setAddGuardian({...addGuardian, a: !addGuardian.a})}>
                                            {addGuardian.a ? "Remove" : "Add"} Primary Parent/Guardian
                                        </Button>
                                    </Grid>
                                }
                                {(addGuardian.a && values.studentProfile.adult === false) &&
                                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                                        <Button variant="outlined" color={addGuardian.b ? "secondary" : "primary"} onClick={() => setAddGuardian({...addGuardian, b: !addGuardian.b})}>
                                            {addGuardian.b ? "Remove" : "Add"} Secondary Parent/Guardian
                                        </Button>
                                    </Grid>
                                }
                            </ResponsiveGrid>
                        </Paper>

                        {addGuardian.a &&
                            <Paper sx={{ p: 3, mb: 2, }}>
                                <ResponsiveGrid container spacing={2}>

                                    <Grid item xs={12} md={12}>
                                        <Typography variant="h4" component="h2" gutterBottom color="primary">Primary Guardian Information</Typography>
                                        <Divider />
                                    </Grid>

                                    <Grid container item spacing={3} columns={4}>
                                        <Grid item container spacing={2} >
                                            <Grid item sm={4}>
                                                <TextField
                                                    id="guardianProfileA.firstName"
                                                    name="guardianProfileA.firstName"
                                                    size="small"
                                                    label="Guardian First Name"
                                                    fullWidth={!smallScreen}
                                                    required
                                                    value={values.guardianProfileA.firstName}
                                                    onChange={handleChange}
                                                    error={Boolean(getIn(touched, 'guardianProfileA.firstName') && getIn(errors, 'guardianProfileA.firstName'))}
                                                    helperText={getIn(touched, 'guardianProfileA.firstName') && getIn(errors, 'guardianProfileA.firstName')}
                                                />
                                            </Grid>
                                            <Grid item xs={4} >
                                                <TextField
                                                    id="guardianProfileA.lastName"
                                                    name="guardianProfileA.lastName"
                                                    required
                                                    fullWidth={!smallScreen}
                                                    size="small"
                                                    label="Guardian Last Name"
                                                    value={values.guardianProfileA.lastName}
                                                    onChange={handleChange}
                                                    error={Boolean(getIn(touched, 'guardianProfileA.lastName') && getIn(errors, 'guardianProfileA.lastName'))}
                                                    helperText={getIn(touched, 'guardianProfileA.lastName') && getIn(errors, 'guardianProfileA.lastName')}
                                                />
                                            </Grid>
                                        </Grid>


                                        <Grid item xs={4} md={2}>
                                            <TextField
                                                id="guardianProfileA.address"
                                                name="guardianProfileA.address"
                                                size="small"
                                                multiline
                                                fullWidth
                                                minRows={3}
                                                label="Address"
                                                value={values.guardianProfileA.address}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'guardianProfileA.address') && getIn(errors, 'guardianProfileA.address'))}
                                                helperText={getIn(touched, 'guardianProfileA.address') && getIn(errors, 'guardianProfileA.address')}
                                            />
                                        </Grid>

                                        <Grid item container spacing={1} >
                                            <Grid item xs={4}>
                                                <TextField
                                                    id="guardianProfileA.phone"
                                                    name="guardianProfileA.phone"
                                                    size="small"
                                                    label="Phone Number"
                                                    fullWidth={!smallScreen}
                                                    value={values.guardianProfileA.phone}
                                                    onChange={handleChange}
                                                    error={Boolean(getIn(touched, 'guardianProfileA.phone') && getIn(errors, 'guardianProfileA.phone'))}
                                                    helperText={getIn(touched, 'guardianProfileA.phone') && getIn(errors, 'guardianProfileA.phone')}
                                                />
                                            </Grid>

                                            <Grid item xs={4} md={2}>

                                                <TextField
                                                    id="guardianProfileA.email"
                                                    name="guardianProfileA.email"
                                                    size="small"
                                                    label="Email Address"
                                                    fullWidth
                                                    value={values.guardianProfileA.email}
                                                    onChange={handleChange}
                                                    error={Boolean(getIn(touched, 'guardianProfileA.email') && getIn(errors, 'guardianProfileA.email'))}
                                                    helperText={getIn(touched, 'guardianProfileA.email') && getIn(errors, 'guardianProfileA.email')}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={4} sx={{ textAlign: 'center', }}>
                                            <Typography gutterBottom variant="button" color="primary" sx={{ fontSize: 'body1.fontSize' }}>
                                                Send Lesson Reminders
                                            </Typography>
                                            <br />
                                            <Typography id="sms-lesson-reminders1" variant="caption" color="initial">
                                                Text
                                            </Typography>

                                            <Field
                                                type='checkbox'
                                                component={Checkbox}
                                                name='guardianProfileA.lessonReminderSms'
                                                aria-labelledby="sms-lesson-reminders1"
                                                disabled={values.guardianProfileA.phone.length > 9 ? false : true}
                                                value={values.guardianProfileA.lessonReminderSms}
                                                onChange={() => setFieldValue("guardianProfileA.lessonReminderSms", !values.guardianProfileA.lessonReminderSms)}
                                            />
                                            <Typography id="email-lesson-reminders1" variant="caption" color="initial">
                                                Email
                                            </Typography>

                                            <Field
                                                type='checkbox'
                                                component={Checkbox}
                                                name='guardianProfileA.lessonReminderEmails'
                                                aria-labelledby="email-lesson-reminders"
                                                disabled={values.guardianProfileA.email.length > 0 ? false : true}
                                                value={values.guardianProfileA.lessonReminderEmails}
                                                onChange={() => setFieldValue("guardianProfileA.lessonReminderEmails", !values.guardianProfileA.lessonReminderEmails)}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={{ mb: 2 }}>
                                            <Divider />
                                        </Grid>

                                    </Grid>

                                </ResponsiveGrid>
                            </Paper>}

                            {addGuardian.b &&
                            <Paper sx={{ p: 3, mb: 2, }}>
                                <ResponsiveGrid container spacing={2}>

                                    <Grid item xs={12} md={12}>
                                        <Typography variant="h4" component="h2" gutterBottom color="primary">Secondary Guardian Information</Typography>
                                        <Divider />
                                    </Grid>

                                    <Grid container item spacing={3} columns={4}>
                                        <Grid item container spacing={2} >
                                            <Grid item sm={4}>
                                                <TextField
                                                    id="guardianProfileB.firstName"
                                                    name="guardianProfileB.firstName"
                                                    size="small"
                                                    label="Guardian First Name"
                                                    fullWidth={!smallScreen}
                                                    required
                                                    value={values.guardianProfileB.firstName}
                                                    onChange={handleChange}
                                                    error={Boolean(getIn(touched, 'guardianProfileB.firstName') && getIn(errors, 'guardianProfileB.firstName'))}
                                                    helperText={getIn(touched, 'guardianProfileB.firstName') && getIn(errors, 'guardianProfileB.firstName')}
                                                />
                                            </Grid>
                                            <Grid item xs={4} >
                                                <TextField
                                                    id="guardianProfileB.lastName"
                                                    name="guardianProfileB.lastName"
                                                    required
                                                    fullWidth={!smallScreen}
                                                    size="small"
                                                    label="Guardian Last Name"
                                                    value={values.guardianProfileB.lastName}
                                                    onChange={handleChange}
                                                    error={Boolean(getIn(touched, 'guardianProfileB.lastName') && getIn(errors, 'guardianProfileB.lastName'))}
                                                    helperText={getIn(touched, 'guardianProfileB.lastName') && getIn(errors, 'guardianProfileB.lastName')}
                                                />
                                            </Grid>
                                        </Grid>


                                        <Grid item xs={4} md={2}>
                                            <TextField
                                                id="guardianProfileB.address"
                                                name="guardianProfileB.address"
                                                size="small"
                                                multiline
                                                fullWidth
                                                minRows={3}
                                                label="Address"
                                                value={values.guardianProfileB.address}
                                                onChange={handleChange}
                                                error={Boolean(getIn(touched, 'guardianProfileB.address') && getIn(errors, 'guardianProfileB.address'))}
                                                helperText={getIn(touched, 'guardianProfileB.address') && getIn(errors, 'guardianProfileB.address')}
                                            />
                                        </Grid>

                                        <Grid item container spacing={1} >
                                            <Grid item xs={4}>
                                                <TextField
                                                    id="guardianProfileB.phone"
                                                    name="guardianProfileB.phone"
                                                    size="small"
                                                    label="Phone Number"
                                                    fullWidth={!smallScreen}
                                                    value={values.guardianProfileB.phone}
                                                    onChange={handleChange}
                                                    error={Boolean(getIn(touched, 'guardianProfileB.phone') && getIn(errors, 'guardianProfileB.phone'))}
                                                    helperText={getIn(touched, 'guardianProfileB.phone') && getIn(errors, 'guardianProfileB.phone')}
                                                />
                                            </Grid>

                                            <Grid item xs={4} md={2}>

                                                <TextField
                                                    id="guardianProfileB.email"
                                                    name="guardianProfileB.email"
                                                    size="small"
                                                    label="Email Address"
                                                    fullWidth
                                                    value={values.guardianProfileB.email}
                                                    onChange={handleChange}
                                                    error={Boolean(getIn(touched, 'guardianProfileB.email') && getIn(errors, 'guardianProfileB.email'))}
                                                    helperText={getIn(touched, 'guardianProfileB.email') && getIn(errors, 'guardianProfileB.email')}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={4} sx={{ textAlign: 'center', }}>
                                            <Typography gutterBottom variant="button" color="primary" sx={{ fontSize: 'body1.fontSize' }}>
                                                Send Lesson Reminders
                                            </Typography>
                                            <br />
                                            <Typography id="sms-lesson-reminders1" variant="caption" color="initial">
                                                Text
                                            </Typography>

                                            <Field
                                                type='checkbox'
                                                component={Checkbox}
                                                name='guardianProfileB.lessonReminderSms'
                                                aria-labelledby="sms-lesson-reminders1"
                                                disabled={values.guardianProfileB.phone.length > 9 ? false : true}
                                                value={values.guardianProfileB.lessonReminderSms}
                                                onChange={() => setFieldValue("guardianProfileB.lessonReminderSms", !values.guardianProfileB.lessonReminderSms)}
                                            />
                                            <Typography id="email-lesson-reminders1" variant="caption" color="initial">
                                                Email
                                            </Typography>

                                            <Field
                                                type='checkbox'
                                                component={Checkbox}
                                                name='guardianProfileB.lessonReminderEmails'
                                                aria-labelledby="email-lesson-reminders"
                                                disabled={values.guardianProfileB.email.length > 0 ? false : true}
                                                value={values.guardianProfileB.lessonReminderEmails}
                                                onChange={() => setFieldValue("guardianProfileB.lessonReminderEmails", !values.guardianProfileB.lessonReminderEmails)}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={{ mb: 2 }}>
                                            <Divider />
                                        </Grid>

                                    </Grid>

                                </ResponsiveGrid>
                            </Paper>}

                        <Grid container spacing={2} direction="row-reverse">
                            <Grid item>
                                <Button
                                    size='large'
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    onClick={handleSubmit}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    size='large'
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<ArrowBackIcon />}
                                    onClick={() => history.push('/students')}
                                >
                                    Back
                                </Button>
                            </Grid>
                            {responseErrors.length>0 &&
                            <Grid item>
                                {renderedErrors}
                            </Grid>}
                        </Grid>
                    </Box>
                )}
            </Formik>
        </Container >
    )
}