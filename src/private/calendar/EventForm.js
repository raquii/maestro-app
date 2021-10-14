import { useState } from "react";
import {
    Container,
    Box,
    Paper,
    Grid,
    TextField,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    MenuItem,
    InputAdornment,
    Typography,
    Button,
    Autocomplete,
    Checkbox,
    Divider
} from "@mui/material"
import { styled } from '@mui/material/styles';
import EventIcon from "@mui/icons-material/Event";
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from "react-redux";
import { Field, Formik } from 'formik';
import * as yup from 'yup';

import PageHeader from "../components/PageHeader";
import eventHelper from "../../util/eventHelper";



const validationSchema = yup.object({
    defaultLesson: yup.boolean(),
    type: yup.string()
        .matches(/(lesson|makeUpLesson|groupLesson|recital|vacation|birthday)/),
    duration: yup.number()
        .integer(),
    allDay: yup.boolean(),
    date: yup.date()
        .required(),
    time: yup.string()
        .matches(/(\d{2}:\d{2})/, "Invalid time selection"),
    recurring: yup.boolean(),
    endRecur: yup.date(),
    price: yup.number()
        .min(0, "Must be a positive number")
        .lessThan(1000, "Whew. You're expensive. Must be less than 1000"),
    allowRegistration: yup.boolean(),
    makeUpCreditRequired: yup.boolean(),
    visible: yup.boolean(),
    title: yup.string()
        .max(50, "Must be less than 50 characters"),
    location: yup.string(),
})

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        textAlign: 'center'
    },
}))


export default function EventForm({ event }) {
    const settings = useSelector(state => state.settings.attributes)
    const teacherId = useSelector(state => state.user.id)
    const students = useSelector(state => state.students)
    const [inputValue, setInputValue] = useState('')

    const initialValues = event ? event : {
        student: null,
        defaultLesson: false,
        type: "lesson",
        duration: "",
        allDay: false,
        date: "",
        time: "",
        recurring: false,
        endRecur: "",
        price: settings.defaultLessonPrice,
        allowRegistration: false,
        makeUpCreditRequired: false,
        visible: settings.defaultEventVisibility,
        title: "",
        location: settings.location,
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PageHeader
                icon={<EventIcon fontSize="large" sx={{ mr: 1 }} color="primary" />}
                page="Event Details"
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    let formData = {teacherId: teacherId, ...values}
                    console.log(eventHelper(formData));
                }}
            >
                {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                    <Box component="form" sx={{ textAlign: 'left', display: 'flex', flexFlow: 'column' }}>
                        <Paper sx={{ p: 3, mb: 2, }}>
                            <ResponsiveGrid container spacing={2}>

                                <ResponsiveGrid container item xs={12} md={3}>
                                    <Typography variant="button" color="initial">
                                        Student Attendees
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} md={9} alignSelf='center'>
                                    <Autocomplete
                                        autoFocus
                                        size='small'
                                        sx={{ mt: 1, width: 250 }}
                                        value={values.student}
                                        onChange={(e, value) => setFieldValue("student", value)}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        inputValue={inputValue}
                                        onInputChange={(e, value) => setInputValue(value)}
                                        id="student"
                                        options={students}
                                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Select a student"
                                            />
                                        )}
                                    />
                                </Grid>

                                <ResponsiveGrid container item xs={12} md={3}>
                                    <Typography variant="button" color="initial">
                                        Event Title
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} md={9} alignSelf='center'>
                                    <TextField
                                        id="title"
                                        name="title"
                                        sx={{ width: 250 }}
                                        hiddenLabel
                                        size="small"
                                        value={values.title}
                                        error={touched.title && Boolean(errors.title)}
                                        helperText={touched.title && errors.title}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <ResponsiveGrid container item xs={12} md={3}>
                                    <Typography variant="button" color="initial">
                                        Event Location
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} md={9} alignSelf='center'>
                                    <TextField
                                        id="location"
                                        name="location"
                                        multiline
                                        minRows={3}
                                        hiddenLabel
                                        size="small"
                                        value={values.location}
                                        error={touched.location && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <ResponsiveGrid container item xs={12} md={3}>
                                    <Typography variant="button" color="initial">
                                        Event Type*
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} md={3} alignSelf='center'>
                                    <TextField
                                        id="type"
                                        name="type"
                                        label=""
                                        select
                                        size="small"
                                        value={values.type}
                                        error={touched.type && Boolean(errors.type)}
                                        helperText={touched.type && errors.type}
                                        onChange={handleChange}
                                        aria-label="event-type"
                                        sx={{ width: 200 }}
                                    >
                                        <MenuItem value="lesson">Lesson</MenuItem>
                                        <MenuItem value="groupLesson">Group Lesson</MenuItem>
                                        <MenuItem value="makeUpLesson">Make-Up Lesson</MenuItem>
                                        <MenuItem value="recital">Recital</MenuItem>
                                        <MenuItem value="vacation">Vacation</MenuItem>
                                    </TextField>
                                </Grid>

                                <ResponsiveGrid item container xs={3} md={2} alignSelf='center'>
                                    <Typography variant="button" color="initial">
                                        Default Lesson
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={9} md={4} alignSelf='center'>
                                    <Field
                                        type='checkbox'
                                        component={Checkbox}
                                        name='defaultLesson'
                                        value={values.defaultLesson}
                                        onChange={() => {
                                            setFieldValue("defaultLesson", !values.defaultLesson)
                                            setFieldValue("recurring", !values.recurring)
                                        }}
                                    />
                                </Grid>

                                <ResponsiveGrid container item xs={12} md={3}>
                                    <Typography variant="button" color="initial">
                                        Event Price
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} md={9} alignSelf='center'>
                                    <TextField
                                        id="price"
                                        name="price"
                                        sx={{ width: 200 }}
                                        hiddenLabel
                                        size="small"
                                        value={values.price}
                                        error={touched.price && Boolean(errors.price)}
                                        helperText={touched.price && errors.price}
                                        onChange={handleChange}
                                        inputProps={{ style: { textAlign: 'left' }, }}
                                        InputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <ResponsiveGrid container item xs={12} md={3}>
                                    <Typography variant="button" color="initial">
                                        Event Duration*
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={12} md={3} alignSelf='center'>
                                    <TextField
                                        id="duration"
                                        name="duration"
                                        sx={{ width: 200 }}
                                        hiddenLabel
                                        disabled={values.allDay ? true : false}
                                        size="small"
                                        value={values.duration}
                                        error={touched.duration && Boolean(errors.duration)}
                                        helperText={touched.duration && errors.duration}
                                        onChange={handleChange}
                                        inputProps={{ style: { textAlign: 'center' }, }}
                                        InputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <ResponsiveGrid item container xs={4} md={2} alignSelf='center'>
                                    <Typography variant="button" color="initial">
                                        All-Day
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={8} md={3} alignSelf='center'>
                                    <Field
                                        type='checkbox'
                                        component={Checkbox}
                                        name='allDay'
                                        value={values.allDay}
                                        onChange={() => setFieldValue("allDay", !values.allDay)}
                                    />
                                </Grid>

                                <ResponsiveGrid container item xs={2} md={3}>
                                    <Typography variant="button" color="initial" >
                                        Date*
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={9} md={9} alignSelf='center'>
                                    <TextField
                                        id="date"
                                        name="date"
                                        sx={{ width: 170 }}
                                        hiddenLabel
                                        size="small"
                                        value={values.date}
                                        error={touched.date && Boolean(errors.date)}
                                        helperText={touched.date && errors.date}
                                        onChange={handleChange}
                                        inputProps={{ style: { textAlign: 'center' }, }}
                                        type='date'
                                    />
                                </Grid>

                                <ResponsiveGrid container item xs={2} md={3}>
                                    <Typography variant="button" color="initial">
                                        Time
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={9} md={9} alignSelf='center'>
                                    <TextField
                                        id="time"
                                        name="time"
                                        sx={{ width: 170 }}
                                        disabled={values.allDay ? true : false}
                                        hiddenLabel
                                        size="small"
                                        value={values.time}
                                        error={touched.time && Boolean(errors.time)}
                                        helperText={touched.time && errors.time}
                                        onChange={handleChange}
                                        inputProps={{ style: { textAlign: 'center' }, }}
                                        type='time'
                                    />
                                </Grid>

                                {(values.defaultLesson === false) && <>
                                <ResponsiveGrid item container xs={7} md={3} alignSelf='center'>
                                    <Typography variant="button" color="initial">
                                        Recurring Event
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={5} md={3} alignSelf='center'>
                                    <Field
                                        type='checkbox'
                                        component={Checkbox}
                                        name='recurring'
                                        value={values.recurring}
                                        onChange={() => setFieldValue("recurring", !values.recurring)}
                                    />
                                </Grid>
                                </>}
                                {(values.recurring ||values.defaultLesson) && <>
                                    <ResponsiveGrid container item xs={2} md={3}>
                                        <Typography variant="button" color="initial">
                                            End Recur
                                        </Typography>
                                    </ResponsiveGrid>
                                    <Grid item xs={9} md={3} alignSelf='center'>
                                        <TextField
                                            id="endRecur"
                                            name="endRecur"
                                            sx={{ width: 170 }}
                                            hiddenLabel
                                            size="small"
                                            value={values.endRecur}
                                            error={touched.endRecur && Boolean(errors.endRecur)}
                                            helperText={touched.endRecur && errors.endRecur}
                                            onChange={handleChange}
                                            type='date'
                                        />
                                    </Grid>
                                </>}

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <ResponsiveGrid item container xs={12} md={5} alignSelf='center'>
                                    <Grid item>
                                        <Typography variant="button" color="initial">
                                            Allow Registration
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography variant="caption" color="initial">
                                            Allow students to self-register for this event.
                                        </Typography>
                                    </Grid>
                                </ResponsiveGrid>
                                <Grid item xs={12} md={5} alignSelf='center'>
                                    <FormControl component="fieldset">
                                        <RadioGroup row
                                            aria-label="allow-registration"
                                            id="allowRegistration"
                                            name="allowRegistration"
                                            value={values.allowRegistration.toString()}
                                            onChange={handleChange}>
                                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                {(values.allowRegistration === 'true' || values.allowRegistration === true) && <>
                                    <ResponsiveGrid item container xs={12} md={5} alignSelf='center'>
                                        <Grid item>
                                            <Typography variant="button" color="initial">
                                                Make-Up Credit Required
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={9}>
                                            <Typography variant="caption" color="initial">
                                                An available credit is required for registration.
                                            </Typography>
                                        </Grid>
                                    </ResponsiveGrid>
                                    <Grid item xs={12} md={5} alignSelf='center'>
                                        <FormControl component="fieldset">
                                            <RadioGroup row
                                                aria-label="require-make-up-credit"
                                                id="makeUpCreditRequired"
                                                name="makeUpCreditRequired"
                                                value={values.makeUpCreditRequired.toString()}
                                                onChange={handleChange}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </>}
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <ResponsiveGrid item container xs={12} md={5} alignSelf='center'>

                                    <Grid item>
                                        <Typography variant="button" color="initial">
                                            Event Visibility
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography variant="caption" color="initial">
                                            Allow all students in your studio to see this event in the portal calendar.
                                        </Typography>
                                    </Grid>
                                </ResponsiveGrid>
                                <Grid item xs={12} md={5} alignSelf='center'>
                                    <FormControl component="fieldset">
                                        <RadioGroup row
                                            aria-label="event-visibility"
                                            id="visible"
                                            name="visible"
                                            value={values.visible.toString()}
                                            onChange={handleChange}>
                                            <FormControlLabel value="true" control={<Radio />} label="Public" />
                                            <FormControlLabel value="false" control={<Radio />} label="Private" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sx={{textAlign:'right'}}>
                                    <Typography variant="caption" color="secondary" >
                                        *required field
                                    </Typography>
                                </Grid>
                            </ResponsiveGrid>
                        </Paper>

                        <Box sx={{
                            position: 'sticky',
                            bottom: 10,
                            zIndex: 100,
                            alignSelf: 'end'
                        }}>
                            <Button
                                size='large'
                                variant="contained"
                                color="secondary"
                                type="submit"
                                onClick={handleSubmit}
                                startIcon={<SaveIcon />}
                                sx={{ borderRadius: 10 }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box >
                )
                }
            </Formik >
        </Container >
    )
}
