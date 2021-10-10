import { Container, Box, Paper, Grid, TextField, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, FormHelperText, Select, InputLabel, MenuItem, InputAdornment } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import { useSelector } from "react-redux"

import PageHeader from "./components/PageHeader"


export default function Settings() {
    const settings = useSelector(state => state.settings.attributes)

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PageHeader
                icon={<SettingsIcon fontSize="large" sx={{ mr: 1 }} />}
                page="Settings"
            />
            <Box>

                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        mb:2,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            Studio Settings
                        </Grid>
                        <Grid item xs={5}>
                            Default Lesson Price
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="defaultLessonPrice"
                                hiddenLabel
                                size="small"
                                value={settings.defaultLessonPrice}
                                onChange={() => console.log('change me!')}
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
                                hiddenLabel
                                size="small"
                                value={settings.defaultLessonDuration}
                                onChange={() => console.log('change me!')}
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
                                value={settings.location}
                                onChange={() => console.log('change me!')}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            Students Can Edit Their Profiles
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row aria-label="students-can-edit-profile" name="" value={settings.studentsCanEditProfile} onChange={() => console.log('change me!')}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>


                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        mb:2,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            Cancellation and Make-Up Policies
                        </Grid>
                        <Grid item xs={5}>
                            Allow Cancellations:
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row aria-label="allow-cancellations" name="" value={settings.permitCancellations} onChange={() => console.log('change me!')}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            Cancellation Deadline:
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="cancellationDeadline"
                                hiddenLabel
                                size="small"
                                value={settings.cancellationDeadline}
                                onChange={() => console.log('change me!')}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            Cancellation Policy Summary
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="cancellationPolicySummary"
                                hiddenLabel
                                multiline
                                minRows={3}
                                value={settings.cancellationPolicySummary}
                                onChange={() => console.log('change me!')}

                            />
                        </Grid>
                        <Grid item xs={5}>
                            Allow Make-Up Credits
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row aria-label="allow-makeups" name="" value={settings.permitMakeUpCredits} onChange={() => console.log('change me!')}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            Make-Up Credits Expire
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row aria-label="expire-makeups" name="" value={settings.expireMakeUpCredits} onChange={() => console.log('change me!')}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            Maximum Age for Credits
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="cancellationDeadline"
                                hiddenLabel
                                size="small"
                                value={settings.maxCreditAGe}
                                onChange={() => console.log('change me!')}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    endAdornment: <InputAdornment position="end">days</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            Limit Total Make-Up Credits
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row aria-label="limit-makeups" name="" value={settings.limitTotalMakeUpCredits} onChange={() => console.log('change me!')}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            Maximum Total Make-Up Credits
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="cancellationDeadline"
                                hiddenLabel
                                size="small"
                                value={settings.maxCreditAge}
                                onChange={() => console.log('change me!')}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    endAdornment: <InputAdornment position="end">days</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            Issue Make-Up Credits Automatically
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row aria-label="limit-makeups" name="" value={settings.issueMakeUpCreditBeforeDeadline} onChange={() => console.log('change me!')}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        mb:2,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            Calendar Settings
                        </Grid>
                        <Grid item xs={5}>
                            Default Calendar View
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <Select
                                    id="initialView"
                                    size="small"
                                    value={settings.initialView}
                                    aria-label="initial-calendar-view-setting"
                                    onChange={() => console.log('change me!')}
                                >
                                    <MenuItem value="dayGridMonth">Day Grid - Month</MenuItem>
                                    <MenuItem value="timeGridWeek">Time Grid - Week</MenuItem>
                                    <MenuItem value="timeGridDay">Time Grid - Day</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            Show Weekends
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row aria-label="display-weekends" name="" value={settings.weekends} onChange={() => console.log('change me!')}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            Start Time for Calendar Display
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <Select
                                    id="slotMinTime"
                                    value={settings.slotMinTime}
                                    size="small"
                                    aria-label="start-time-calendar-display"
                                    onChange={() => console.log('change me!')}
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
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            End Time for Calendar Display
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <Select
                                    id="slotMaxTime"
                                    value={settings.slotMaxTime}
                                    size="small"
                                    aria-label="end-time-calendar-display"
                                    onChange={() => console.log('change me!')}
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
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            Default Event Visibility
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row aria-label="default-event-visiblity" name="" value={settings.defaultEventVisibility} onChange={() => console.log('change me!')}>
                                    <FormControlLabel value="true" control={<Radio />} label="Public" />
                                    <FormControlLabel value="false" control={<Radio />} label="Private" />
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            Allow Students to Register for Events
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup row aria-label="permit-event-registration" name="" value={settings.permitEventRegistration} onChange={() => console.log('change me!')}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            Registration Deadline
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="eventRegistrationDeadline"
                                hiddenLabel
                                size="small"
                                value={settings.eventRegistrationDeadline}
                                onChange={() => console.log('change me!')}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container >
    )
}
