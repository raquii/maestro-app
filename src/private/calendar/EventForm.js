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
    Divider,
    Backdrop,
    CircularProgress,
} from "@mui/material"
import TrashIcon from "@mui/icons-material/Delete"
import EventIcon from "@mui/icons-material/Event";
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from "react-redux";
import { Field, Formik } from 'formik';
import { useHistory } from "react-router";
import * as yup from 'yup';
import dayjs from "dayjs";

import { RecurringEventModal } from "./RecurringEventModal";
import PageHeader from "../components/PageHeader";
import eventHelper from "../../util/eventHelper";
import { useCreateEventMutation, useCreateRecurringEventMutation, useUpdateEventMutation } from "../../features/api";
import ResponsiveGrid from "../components/ResponsiveGrid";


const validationSchema = yup.object({
    defaultLesson: yup.boolean(),
    eventType: yup.string()
        .matches(/(lesson|make_up_lesson|group_lesson|recital|vacation|birthday)/),
    duration: yup.number()
        .integer(),
    allDay: yup.boolean(),
    date: yup.date()
        .required(),
    time: yup.string()
        .matches(/(\d{2}:\d{2})/, "Invalid time selection"),
    recurring: yup.boolean(),
    endDate: yup.date()
    .nullable(),
    price: yup.number()
        .min(0, "Must be a positive number")
        .lessThan(1000, "Whew. You're expensive. Must be less than 1000"),
    allowRegistration: yup.boolean(),
    makeUpCreditRequired: yup.boolean(),
    visible: yup.boolean(),
    title: yup.string()
        .max(50, "Must be less than 50 characters"),
    location: yup.string()
        .nullable(),
})

export default function EventForm({ event, defaultLesson = false }) {
    const history = useHistory();
    const settings = useSelector(state => state.settings.attributes);
    const students = useSelector(state => state.students);
    const [createEvent, { isLoading}] = useCreateEventMutation();
    const [createRecurringEvent] = useCreateRecurringEventMutation();
    const [updateEvent] = useUpdateEventMutation();
    const [inputValue, setInputValue] = useState('');
    const [recurringModal, setRecurringModal] = useState({
        open: false,
        type: "",
        eventObj: {}
    });
    console.log('event:', event)
    const initialValues = event.id ?
        {   ...event,
            duration: dayjs(event.end).diff(event.start, 'm'),
            time: dayjs(event.start).format('HH:mm'),
            date: dayjs(event.start).format('YYYY-MM-DD'),
            endDate: event.endDate ? event.endDate : ""
        } : {
            studentProfile: null,
            defaultLesson: defaultLesson,
            eventType: "lesson",
            duration: "",
            allDay: false,
            date: "",
            time: "",
            recurring: defaultLesson,
            endDate: "",
            price: settings.defaultLessonPrice,
            allowRegistration: false,
            makeUpCreditRequired: false,
            visible: settings.defaultEventVisibility,
            title: "",
            location: settings.location,
            recurringGroupId: null
        }
        console.log('initialValues:', initialValues)
    function handleUpdatingEvent(formattedEvent) {
        if (event.recurring) {
            setRecurringModal({
                open: true,
                type: 'Update',
                eventObj: formattedEvent
            })
        } else {
            updateEvent(formattedEvent)
            .unwrap()
            .then(()=>history.push('/calendar'))
            .catch((error)=>console.log(error))
        }
    }

    function handleNewEvent(formattedEvent) {
        console.log('new', formattedEvent)
        if (formattedEvent.recurringGroup){
            createRecurringEvent(formattedEvent)
            .unwrap()
            .then(() => history.push('/calendar'))
            .catch((errors) => console.log(errors))
        }else{
        createEvent(formattedEvent)
            .unwrap()
            .then(() => history.push('/calendar'))
            .catch((errors) => console.log(errors))
        }
    }

    function handleClose() {
        setRecurringModal({
            open: false,
            type: "",
            eventObj: {}
        })
    }

    function handleDeleteEvent() {
        if (event.recurring) {
            setRecurringModal({
                open: true,
                type: 'Delete',
                eventObj: event
            })
        } else {
            console.log("deleting event", event)
        }
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {recurringModal &&
                <RecurringEventModal
                    open={recurringModal.open}
                    handleClose={handleClose}
                    type={recurringModal.type}
                    eventObj={recurringModal.eventObj}
                />
            }

            <Backdrop
                sx={{ color: '#fff', zIndex: 10 }}
                open={isLoading}
            >
                <CircularProgress />
            </Backdrop>
            <PageHeader
                icon={<EventIcon fontSize="large" sx={{ mr: 1 }} color="primary" />}
                page="Event Details"
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const formattedEvent = eventHelper(values)
                    console.log('formatted:', formattedEvent)
                    event ? handleUpdatingEvent(formattedEvent) : handleNewEvent(formattedEvent)
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
                                        onChange={(e, value) => {
                                            setFieldValue("studentProfile", value)
                                        }}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        inputValue={inputValue}
                                        onInputChange={(e, value) => setInputValue(value)}
                                        id="studentProfile"
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
                                <Grid item xs={12} md={4} alignSelf='center'>
                                    <TextField
                                        id="eventType"
                                        name="eventType"
                                        label=""
                                        select
                                        size="small"
                                        value={values.eventType}
                                        error={touched.eventType && Boolean(errors.eventType)}
                                        helperText={touched.eventType && errors.eventType}
                                        onChange={handleChange}
                                        aria-label="event-type"
                                        sx={{ width: 200 }}
                                    >
                                        <MenuItem value="lesson">Lesson</MenuItem>
                                        <MenuItem value="group_lesson">Group Lesson</MenuItem>
                                        <MenuItem value="make_up_lesson">Make-Up Lesson</MenuItem>
                                        <MenuItem value="recital">Recital</MenuItem>
                                        <MenuItem value="vacation">Vacation</MenuItem>
                                    </TextField>
                                </Grid>

                                <ResponsiveGrid item container xs={3} md={2} alignSelf='center'>
                                    <Typography variant="button" color="initial">
                                        Default Lesson
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={9} md={3} alignSelf='center'>
                                    <Field
                                        type='checkbox'
                                        component={Checkbox}
                                        id="defaultLesson"
                                        name='defaultLesson'
                                        value={values.defaultLesson}
                                        checked={values.defaultLesson}
                                        onChange={(e) => {
                                            setFieldValue("defaultLesson", e.target.checked);
                                            setFieldValue("recurring", e.target.checked);
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

                                <ResponsiveGrid container item xs={2} md={3}>
                                    <Typography variant="button" color="initial" >
                                        Date*
                                    </Typography>
                                </ResponsiveGrid>
                                <Grid item xs={9} md={3} alignSelf='center'>
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

                                {!values.allDay && <>
                                    <ResponsiveGrid container item xs={2} md={3}>
                                        <Typography variant="button" color="initial">
                                            Time
                                        </Typography>
                                    </ResponsiveGrid>
                                    <Grid item xs={9} md={3} alignSelf='center'>
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

                                    <ResponsiveGrid container item xs={12} md={2}>
                                        <Typography variant="button" color="initial">
                                            Event Duration*
                                        </Typography>
                                    </ResponsiveGrid>
                                    <Grid item xs={12} md={4} alignSelf='center'>
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
                                </>}

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
                                        disabled={values.defaultLesson ? true : false}
                                        value={values.recurring}
                                        checked={values.recurring}
                                        onChange={() => setFieldValue("recurring", !values.recurring)}
                                    />
                                </Grid>

                                {values.recurring && <>
                                    <ResponsiveGrid container item xs={2} md={3}>
                                        <Typography variant="button" color="initial">
                                            End Recur
                                        </Typography>
                                    </ResponsiveGrid>
                                    <Grid item xs={9} md={3} alignSelf='center'>
                                        <TextField
                                            id="endDate"
                                            name="endDate"
                                            sx={{ width: 170 }}
                                            hiddenLabel
                                            size="small"
                                            value={values.endDate}
                                            error={touched.endDate && Boolean(errors.endDate)}
                                            helperText={touched.endDate && errors.endDate}
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

                                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                    <Typography variant="caption" color="secondary" >
                                        *required field
                                    </Typography>
                                </Grid>
                                {event && <Grid item xs={12} >
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<TrashIcon />}
                                        onClick={handleDeleteEvent}
                                    >
                                        Delete Event
                                    </Button>
                                </Grid>}
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
