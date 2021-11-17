import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button, Divider, Typography } from "@mui/material";
import { Formik } from 'formik';
import { useSelector } from "react-redux";
import { useUpdateSettingsMutation } from "../../features/api";

export default function EventTypes({ closeMenu, open }) {
    const settings = useSelector(state => state.settings.attributes);
    const id = useSelector(state => state.settings.id);
    const [updateSettings] = useUpdateSettingsMutation();
    
    const initialValues = {
        id: id,
        lessonColor: settings.lessonColor,
        groupLessonColor: settings.groupLessonColor,
        recitalColor: settings.recitalColor,
        makeUpLessonColor: settings.makeUpLessonColor,
        vacationColor: settings.vacationColor,
        birthdayColor: settings.birthdayColor,
    };

    return (
        <Dialog open={open}>
            <DialogTitle id="alert-confirm-send-login-emails">
                Event Types
            </DialogTitle>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    updateSettings(values);
                    closeMenu();
                }}
            >{({ values, handleChange, handleSubmit }) => (<>
                <DialogContent>
                    
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography variant="button" component="p">Event Type</Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant="button" component="p">Color</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={6}>
                            Lesson
                        </Grid>
                        <Grid item xs={6}>
                            <input className="color-input" type='color' name="lessonColor" id="lessonColor" value={values.lessonColor} onChange={handleChange}/>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={6}>
                            Make-Up Lesson
                        </Grid>
                        <Grid item xs={6}>
                            <input className="color-input" type='color' name="makeUpLessonColor" id="makeUpLessonColor" value={values.makeUpLessonColor} onChange={handleChange}/>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={6}>
                            Group Lesson
                        </Grid>
                        <Grid item xs={6}>
                            <input className="color-input" type='color' name="groupLessonColor" id="groupLessonColor" value={values.groupLessonColor} onChange={handleChange}/>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={6}>
                            Recital
                        </Grid>
                        <Grid item xs={6}>
                            <input className="color-input" type='color' name="recitalColor" id="recitalColor" value={values.recitalColor} onChange={handleChange}/>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={6}>
                            Vacation
                        </Grid>
                        <Grid item xs={6}>
                            <input className="color-input" type='color' name="vacationColor" id="vacationColor" value={values.vacationColor} onChange={handleChange}/>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={6}>
                            Birthday
                        </Grid>
                        <Grid item xs={6}>
                            <input className="color-input" type='color' name="birthdayColor" id="birthdayColor" value={values.birthdayColor} onChange={handleChange}/>
                        </Grid>

                    </Grid>
                   
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closeMenu}
                        variant='outlined'
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        color="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                </DialogActions>
            </>)}
            </Formik>
        </Dialog>
    )
}
