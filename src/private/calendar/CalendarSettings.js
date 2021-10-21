import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { Formik } from 'formik';
import * as yup from 'yup';
import ResponsiveGrid from "../components/ResponsiveGrid";
import { useUpdateSettingsMutation } from "../../features/api";

const validationSchema = yup.object({
    permitEventRegistration: yup.boolean(),
    eventRegistrationDeadline: yup.number()
        .min(0, "Must be a positive number")
        .max(168, "Must be less than 169")
        .integer('Please use a whole number'),
    defaultEventVisibility: yup.boolean(),
    initialView: yup.string()
        .matches(/(dayGridMonth|timeGridWeek|timeGridDay)/, "Invalid selection"),
    slotMinTime: yup.string()
        .matches(/(\d{2}:\d{2})/, "Invalid time selection"),
    slotMaxTime: yup.string()
        .matches(/(\d{2}:\d{2})/, "Invalid time selection"),
    weekends: yup.boolean(),
    location: yup.string()
        .nullable(),
});


export default function CalendarSettings({ open, handleClose }) {
    const settings = useSelector(state => state.settings.attributes)
    const id = useSelector(state => state.settings.id)
    const [updateSettings] = useUpdateSettingsMutation();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
        >
            <Formik
                initialValues={settings}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const castValues = { id: id, ...validationSchema.cast(values) }
                    updateSettings(castValues)
                        .unwrap()
                        .then((p) => {
                            handleClose()
                        })
                        .catch((error) => console.log(error))
                }}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (<>
                        <DialogContent>
                            <Box sx={{ p: 2, mb: 2, }} component="form">
                                <ResponsiveGrid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="h4" component="h2" gutterBottom color="primary">Calendar Settings</Typography>
                                        <Divider />
                                    </Grid>
                                    <ResponsiveGrid item container xs={12} md={5}>
                                        <Grid item >
                                            <Typography variant="button" color="initial">
                                                Default Calendar View
                                            </Typography>
                                        </Grid>
                                    </ResponsiveGrid>
                                    <Grid item xs={12} md={5} alignSelf='center'>
                                        <TextField
                                            id="initialView"
                                            name="initialView"
                                            select
                                            hiddenLabel
                                            size="small"
                                            value={values.initialView}
                                            aria-label="initial-calendar-view-setting"
                                            error={touched.initialView && Boolean(errors.initialView)}
                                            helperText={touched.initialView && errors.initialView}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="dayGridMonth">Month</MenuItem>
                                            <MenuItem value="timeGridWeek">Week</MenuItem>
                                            <MenuItem value="timeGridDay">Day</MenuItem>
                                        </TextField>

                                    </Grid>
                                    <ResponsiveGrid item container xs={12} md={5}>
                                        <Grid item >
                                            <Typography variant="button" color="initial">
                                                Calendar Display Hours
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={9}>
                                            <Typography variant="caption" color="initial">
                                                Set the hours visible on your calendar when in 'Week' or 'Day' view.
                                            </Typography>
                                        </Grid>
                                    </ResponsiveGrid>
                                    <ResponsiveGrid container item xs={12} md={4} alignItems='center'>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="slotMinTime"
                                                name="slotMinTime"
                                                hiddenLabel
                                                select
                                                variant="standard"
                                                size="small"
                                                value={values.slotMinTime}
                                                error={touched.slotMinTime && Boolean(errors.slotMinTime)}
                                                helperText={touched.slotMinTime && errors.slotMinTime}
                                                onChange={handleChange}
                                                aria-label="start-time-calendar-display"
                                            >
                                                <MenuItem value="00:00">12 am</MenuItem>
                                                <MenuItem value="01:00">1 am</MenuItem>
                                                <MenuItem value="02:00">2 am</MenuItem>
                                                <MenuItem value="03:00">3 am</MenuItem>
                                                <MenuItem value="04:00">4 am</MenuItem>
                                                <MenuItem value="05:00">5 am</MenuItem>
                                                <MenuItem value="06:00">6 am</MenuItem>
                                                <MenuItem value="07:00">7 am</MenuItem>
                                                <MenuItem value="08:00">8 am</MenuItem>
                                                <MenuItem value="09:00">9 am</MenuItem>
                                                <MenuItem value="10:00">10 am</MenuItem>
                                                <MenuItem value="11:00">11 am</MenuItem>
                                                <MenuItem value="12:00">12 pm</MenuItem>
                                                <MenuItem value="13:00">1 pm</MenuItem>
                                                <MenuItem value="14:00">2 pm</MenuItem>
                                                <MenuItem value="15:00">3 pm</MenuItem>
                                                <MenuItem value="16:00">4 pm</MenuItem>
                                                <MenuItem value="17:00">5 pm</MenuItem>
                                                <MenuItem value="18:00">6 pm</MenuItem>
                                                <MenuItem value="19:00">7 pm</MenuItem>
                                                <MenuItem value="20:00">8 pm</MenuItem>
                                                <MenuItem value="21:00">9 pm</MenuItem>
                                                <MenuItem value="22:00">10 pm</MenuItem>
                                                <MenuItem value="23:00">11 pm</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Typography variant="button" component="p" color="initial">
                                                to
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} >
                                            <TextField
                                                id="slotMaxTime"
                                                name="slotMaxTime"
                                                select
                                                hiddenLabel
                                                variant="standard"
                                                value={values.slotMaxTime}
                                                size="small"
                                                aria-label="end-time-calendar-display"
                                                error={touched.slotMaxTime && Boolean(errors.slotMaxTime)}
                                                helperText={touched.slotMaxTime && errors.slotMaxTime}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="00:00">12 am</MenuItem>
                                                <MenuItem value="01:00">1 am</MenuItem>
                                                <MenuItem value="02:00">2 am</MenuItem>
                                                <MenuItem value="03:00">3 am</MenuItem>
                                                <MenuItem value="04:00">4 am</MenuItem>
                                                <MenuItem value="05:00">5 am</MenuItem>
                                                <MenuItem value="06:00">6 am</MenuItem>
                                                <MenuItem value="07:00">7 am</MenuItem>
                                                <MenuItem value="08:00">8 am</MenuItem>
                                                <MenuItem value="09:00">9 am</MenuItem>
                                                <MenuItem value="10:00">10 am</MenuItem>
                                                <MenuItem value="11:00">11 am</MenuItem>
                                                <MenuItem value="12:00">12 pm</MenuItem>
                                                <MenuItem value="13:00">1 pm</MenuItem>
                                                <MenuItem value="14:00">2 pm</MenuItem>
                                                <MenuItem value="15:00">3 pm</MenuItem>
                                                <MenuItem value="16:00">4 pm</MenuItem>
                                                <MenuItem value="17:00">5 pm</MenuItem>
                                                <MenuItem value="18:00">6 pm</MenuItem>
                                                <MenuItem value="19:00">7 pm</MenuItem>
                                                <MenuItem value="20:00">8 pm</MenuItem>
                                                <MenuItem value="21:00">9 pm</MenuItem>
                                                <MenuItem value="22:00">10 pm</MenuItem>
                                                <MenuItem value="23:00">11 pm</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </ResponsiveGrid>
                                    <ResponsiveGrid item container xs={12} md={5} alignItems='center'>
                                        <Grid item >
                                            <Typography variant="button" color="initial">
                                                Show Weekends
                                            </Typography>
                                        </Grid>
                                    </ResponsiveGrid>
                                    <Grid item xs={12} md={5} alignItems='center'>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend"></FormLabel>
                                            <RadioGroup row
                                                aria-label="display-weekends"
                                                name="weekends"
                                                id="weekends"
                                                value={values.weekends.toString()}
                                                onChange={handleChange}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    <ResponsiveGrid item container xs={12} md={5} alignItems='center'>
                                        <Grid item >
                                            <Typography variant="button" color="initial">
                                                Default Event Visibility
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={9}>
                                            <Typography variant="caption" color="initial">
                                                Toggle the default visibility of new calendar events.
                                                <br />
                                                <em>Students can always see events they are registered for.</em>
                                            </Typography>
                                        </Grid>
                                    </ResponsiveGrid>
                                    <Grid item xs={12} md={5} alignItems='center'>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend"></FormLabel>
                                            <RadioGroup row
                                                aria-label="default-event-visiblity"
                                                name="defaultEventVisibility"
                                                id="defaultEventVisibility"
                                                value={values.defaultEventVisibility.toString()}
                                                onChange={handleChange}>
                                                <FormControlLabel value="true" control={<Radio />} label="Public" />
                                                <FormControlLabel value="false" control={<Radio />} label="Private" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Grid item >
                                            <Typography variant="button" color="initial">
                                                Allow Students to Register for Events
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={9}>
                                            <Typography variant="caption" color="initial">
                                                Allow students to register for events with open student slots.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={5} alignItems='center'>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend"></FormLabel>
                                            <RadioGroup row
                                                aria-label="permit-event-registration"
                                                name="permitEventRegistration"
                                                id="permitEventRegistration"
                                                value={values.permitEventRegistration.toString()}
                                                onChange={handleChange}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                            </RadioGroup>

                                        </FormControl>
                                    </Grid>
                                    {(values.permitEventRegistration === 'true' || values.permitEventRegistration === true) && <>
                                        <ResponsiveGrid container item xs={12} md={5}>
                                            <Grid item >
                                                <Typography variant="button" color="initial">
                                                    Event Registration Deadline
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={9}>
                                                <Typography variant="caption" color="initial">
                                                    Specify how soon before an event a student must register.
                                                </Typography>
                                            </Grid>
                                        </ResponsiveGrid>
                                        <Grid item xs={12} md={5} alignItems='center'>
                                            <TextField
                                                id="eventRegistrationDeadline"
                                                name="eventRegistrationDeadline"
                                                hiddenLabel
                                                size="small"
                                                sx={{ width: 140 }}
                                                value={values.eventRegistrationDeadline}
                                                error={touched.eventRegistrationDeadline && Boolean(errors.eventRegistrationDeadline)}
                                                helperText={touched.eventRegistrationDeadline && errors.eventRegistrationDeadline}
                                                onChange={handleChange}
                                                inputProps={{ style: { textAlign: 'center' }, }}
                                                InputProps={{
                                                    inputMode: 'numeric',
                                                    pattern: '[0-9]*',
                                                    endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                                                }}
                                            />
                                        </Grid>
                                    </>}

                                </ResponsiveGrid>
                            </Box>
                        </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color='secondary'
                        variant='outlined'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                        variant='contained'
                        type='submit'
                    >
                        Save
                    </Button>
                </DialogActions>
                </>)}
            </Formik>
        </Dialog>
    )
}
