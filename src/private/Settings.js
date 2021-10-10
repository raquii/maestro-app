import {
    Container,
    Box,
    Paper,
    Grid,
    TextField,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    MenuItem,
    InputAdornment,
    Typography,
    Button,
    Divider,
} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from "react-redux";
import { Formik} from 'formik';
import * as yup from 'yup';

import { useUpdateSettingsMutation } from "../features/api";
import PageHeader from "./components/PageHeader";


const validationSchema = yup.object({
    cancellationDeadline: yup.number()
        .min(0, "Must be a positive number")
        .max(168, "Must be less than 169")
        .integer('Please use a whole number'),
    permitCancellations: yup.boolean(),
    permitEventRegistration: yup.boolean(),
    eventRegistrationDeadline: yup.number()
        .min(0, "Must be a positive number")
        .max(168, "Must be less than 169")
        .integer('Please use a whole number'),
    permitMakeUpCredits: yup.boolean(),
    issueMakeUpCreditBeforeDeadline: yup.boolean(),
    expireMakeUpCredits: yup.boolean(),
    maxCreditAge: yup.number()
        .min(0, "Must be a positive number")
        .max(365, "Must be less than 366")
        .integer('Please use a whole number'),
    limitTotalMakeUpCredits: yup.boolean(),
    maxTotalMakeUpCredits: yup.number()
        .min(0, "Must be a positive number")
        .max(50, "Must be less than 50")
        .integer("Please use a whole number"),
    cancellationPolicySummary: yup.string()
        .nullable(),
    defaultEventVisibility: yup.boolean(),
    defaultLessonPrice: yup.number()
        .min(0, "Must be a positive number")
        .lessThan(1000, "Whew. You're expensive. Must be less than 1000"),
    defaultLessonDuration: yup.number()
        .min(0, "Must be a positive number")
        .integer("Please use a whole number")
        .lessThan(480, "Must be less than 480 minutes"),
    initialView: yup.string()
        .matches(/(dayGridMonth|timeGridWeek|timeGridDay)/, "Invalid selection"),
    slotMinTime: yup.string()
        .matches(/(\d{2}:\d{2})/, "Invalid time selection"),
    slotMaxTime: yup.string()
        .matches(/(\d{2}:\d{2})/, "Invalid time selection"),
    weekends: yup.boolean(),
    location: yup.string()
        .nullable(),
    studentsCanEditProfile: yup.boolean(),
})

export default function Settings() {
    const settings = useSelector(state => state.settings.attributes)
    const [updateSettings] = useUpdateSettingsMutation();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PageHeader
                icon={<SettingsIcon fontSize="large" sx={{ mr: 1 }} color="primary" />}
                page="Settings"
            />
            <Formik
                    initialValues={settings}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const castValues = validationSchema.cast(values)
                        console.log(castValues)
                    }}>
                   {({values, errors, touched, handleChange, handleSubmit, setFieldValue}) => (
            <Box component="form" sx={{ textAlign: 'left', display: 'flex', flexFlow: 'column' }}>
                        {/* Studio Settings */ }
                        <Paper sx={{ p: 2, mb: 2, }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant="h4" component="h2" gutterBottom color="primary">Studio Settings</Typography>
                            <Divider />
                        </Grid>

                        <Grid item xs={5}>
                            Default Lesson Price
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="defaultLessonPrice"
                                name="defaultLessonPrice"
                                hiddenLabel
                                size="small"
                                value={values.defaultLessonPrice}
                                error={touched.defaultLessonPrice && Boolean(errors.defaultLessonPrice)}
                                helperText={touched.defaultLessonPrice && errors.defaultLessonPrice}
                                onChange={handleChange}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            Default Lesson Duration
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="defaultLessonDuration"
                                name="defaultLessonDuration"
                                hiddenLabel
                                size="small"
                                value={values.defaultLessonDuration}
                                error={touched.defaultLessonDuration && Boolean(errors.defaultLessonDuration)}
                                helperText={touched.defaultLessonDuration && errors.defaultLessonDuration}
                                onChange={handleChange}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            Studio Location
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="location"
                                size="small"
                                hiddenLabel
                                multiline
                                minRows={3}
                                value={values.location}
                                error={touched.location && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            Students Can Edit Their Profiles
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <RadioGroup row
                                    aria-label="students-can-edit-profile"
                                    id="studentsCanEditProfile"
                                    name="studentsCanEditProfile"
                                    value={values.studentsCanEditProfile.toString()}
                                    onChange={handleChange}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>

                {/* cancellation policy */}
                <Paper sx={{ p: 2, mb: 2, }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h2" gutterBottom color="primary">Cancellation Policies</Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={5}>
                            Cancellation Policy Summary
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="cancellationPolicySummary"
                                name="cancellationPolicySummary"
                                hiddenLabel
                                multiline
                                minRows={3}
                                value={values.cancellationPolicySummary}
                                error={touched.cancellationPolicySummary && Boolean(errors.cancellationPolicySummary)}
                                helperText={touched.cancellationPolicySummary && errors.cancellationPolicySummary}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            Allow Cancellations:
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <RadioGroup row
                                    aria-label="allow-cancellations"
                                    name="permitCancellations"
                                    id="permitCancellations"
                                    value={values.permitCancellations.toString()}
                                    onChange={handleChange}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {values.permitCancellations === 'true' &&
                            <>
                                <Grid item xs={5}>
                                    Cancellation Deadline:
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        id="cancellationDeadline"
                                        name="cancellationDeadline"
                                        hiddenLabel
                                        size="small"
                                        value={values.cancellationDeadline}
                                        error={touched.cancellationDeadline && Boolean(errors.cancellationDeadline)}
                                        helperText={touched.cancellationDeadline && errors.cancellationDeadline}
                                        onChange={handleChange}
                                        InputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                            </>
                        }
                        <Grid item xs={5}>
                            Allow Make-Up Credits
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row
                                    aria-label="allow-makeups"
                                    name="permitMakeUpCredits"
                                    id="permitMakeUpCredits"
                                    value={values.permitMakeUpCredits.toString()}
                                    onChange={handleChange}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>

                            </FormControl>
                        </Grid>
                        {values.permitMakeUpCredits === 'true' && <>
                            <Grid item xs={5}>
                                Make-Up Credits Expire
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend"></FormLabel>
                                    <RadioGroup row
                                        aria-label="expire-makeups"
                                        name="expireMakeUpCredits"
                                        id="expireMakeUpCredits"
                                        value={values.expireMakeUpCredits.toString()}
                                        onChange={handleChange}>
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>

                                </FormControl>
                            </Grid>
                            {values.expireMakeUpCredits === 'true' && <>
                                <Grid item xs={5}>
                                    Maximum Age for Credits
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        id="maxCreditAge"
                                        name="maxCreditAge"
                                        hiddenLabel
                                        size="small"
                                        value={values.maxCreditAge}
                                        error={touched.maxCreditAge && Boolean(errors.maxCreditAge)}
                                        helperText={touched.maxCreditAge && errors.maxCreditAge}
                                        onChange={handleChange}
                                        InputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            endAdornment: <InputAdornment position="end">days</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                            </>}
                            <Grid item xs={5}>
                                Limit Total Make-Up Credits
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend"></FormLabel>
                                    <RadioGroup row
                                        aria-label="limit-makeups"
                                        name="limitTotalMakeUpCredits"
                                        id="limitTotalMakeUpCredits"
                                        value={values.limitTotalMakeUpCredits.toString()}
                                        onChange={handleChange}>
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                           
                                </FormControl>
                            </Grid>
                            {values.limitTotalMakeUpCredits === 'true' && <>
                                <Grid item xs={5}>
                                    Maximum Total Make-Up Credits
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        id="maxTotalMakeUpCredits"
                                        name="maxTotalMakeUpCredits"
                                        hiddenLabel
                                        size="small"
                                        value={values.maxTotalMakeUpCredits}
                                        error={touched.maxTotalMakeUpCredits && Boolean(errors.maxTotalMakeUpCredits)}
                                        helperText={touched.maxTotalMakeUpCredits && errors.maxTotalMakeUpCredits}
                                        onChange={handleChange}
                                        InputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            endAdornment: <InputAdornment position="end">credits</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                            </>}
                            <Grid item xs={5}>
                                Issue Make-Up Credits Automatically
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl component="fieldset">
                                    <RadioGroup row
                                        aria-label="limit-makeups"
                                        name="issueMakeUpCreditBeforeDeadline"
                                        value={values.issueMakeUpCreditBeforeDeadline.toString()}
                                        onChange={handleChange}>
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                    
                            </FormControl>
                        </Grid>
                    </>}
                </Grid>
            </Paper>

            {/* Calendar Settings */}
            <Paper sx={{ p: 2, mb: 2, }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h2" gutterBottom color="primary">Calendar Settings</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={5}>
                        Default Calendar View
                    </Grid>
                    <Grid item xs={5}>

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
                            <MenuItem value="dayGridMonth">Day Grid - Month</MenuItem>
                            <MenuItem value="timeGridWeek">Time Grid - Week</MenuItem>
                            <MenuItem value="timeGridDay">Time Grid - Day</MenuItem>
                        </TextField>

                    </Grid>
                    <Grid item xs={5}>
                        Time Grid View: Show Hours
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="slotMinTime"
                            name="slotMinTime"
                            hiddenLabel
                            select
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
                    <Grid item xs={1}>
                        to
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="slotMaxTime"
                            name="slotMaxTime"
                            select
                            hiddenLabel
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
                    <Grid item xs={5}>
                        Show Weekends
                    </Grid>
                    <Grid item xs={5}>
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

                    <Grid item xs={5}>
                        Default Event Visibility
                    </Grid>
                    <Grid item xs={5}>
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
                    <Grid item xs={5}>
                        Allow Students to Register for Events
                    </Grid>
                    <Grid item xs={5}>
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
                    {values.permitEventRegistration === 'true' && <>
                        <Grid item xs={5}>
                            Registration Deadline
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="eventRegistrationDeadline"
                                name="eventRegistrationDeadline"
                                hiddenLabel
                                size="small"
                                value={values.eventRegistrationDeadline}
                                error={touched.eventRegistrationDeadline && Boolean(errors.eventRegistrationDeadline)}
                                helperText={touched.eventRegistrationDeadline && errors.eventRegistrationDeadline}
                                onChange={handleChange}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </>}
                    <Grid item xs={12}>

                    </Grid>
                </Grid>

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
                        sx={{borderRadius: 10}}
                    >
                        Save
                    </Button>
                </Box>
            </Box >
                        )}
                </Formik>
        </Container >
    )
}
