import { useState } from "react";
import { useSelector } from "react-redux";
import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Typography,
    Snackbar,
    Divider,
} from "@mui/material"
import { TextField } from "formik-material-ui";
import SaveIcon from '@mui/icons-material/Save';
import AccountBox from "@mui/icons-material/AccountBox"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Field, getIn, Form } from 'formik';
import * as yup from 'yup';

import PageHeader from "./components/PageHeader";
import ResponsiveGrid from "./components/ResponsiveGrid";
import { useUpdateTeacherProfileMutation } from "../features/api";


const validationSchema = yup.object({
    firstName: yup.string()
        .min(2, 'First name should be at least 2 characters')
        .max(50, 'First name should be less than 50 characters')
        .matches(/^([A-ZÀ-ÿa-z][-,À-ÿa-z. ']+[ ]*)+$/, "Invalid name characters")
        .trim()
        .required('Required'),
    lastName: yup.string()
        .min(2, 'First name should be at least 2 characters')
        .max(50, 'First name should be less than 50 characters')
        .matches(/^([A-ZÀ-ÿa-z][-,À-ÿa-z. ']+[ ]*)+$/, "Invalid name characters")
        .trim()
        .required('Required'),
    email: yup.string()
        .email('Enter a valid email')
        .trim()
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password should be at least 8 characters')
        .max(20, "Password should be less than 20 characters")
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}/, 'Must contain an upper and lowercase character, a number, and a special character'),
    passwordConfirmation: yup.string()
        .test('match-password', 'Passwords must match.', (value, context) => value === context.parent.password),
    phone: yup.string(),
    address: yup.string(),
    studio:yup.object({
        name:yup.string()
    })
})


export default function Profile() {
    const [updateTeacherProfile] = useUpdateTeacherProfileMutation();

    const user = useSelector(state => state.user)
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [responseErrors, setResponseErrors] = useState("");

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} variant="filled" elevation={6} severity="success" sx={{ width: '100%' }}>
                    Changes Saved!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} elevation={6} severity="error" sx={{ width: '100%' }}>
                    Uh oh! Something went wrong: { responseErrors}
                </Alert>
            </Snackbar>
            <PageHeader
                icon={<AccountBox fontSize="large" sx={{ mr: 1 }} />}
                page="Profile"
            />

            <Formik
                initialValues={{
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: "",
                    passwordConfirmation: "",
                    phone: user.phone,
                    address: user.address,
                    studio: {
                        name: user.studioName
                    }
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if (values.password) {
                        //send to user route
                    } else {
                        updateTeacherProfile(values).unwrap()
                        .then((data) => setOpenSuccess(true))
                        .catch((error) => {
                            setOpenError(true)
                            setResponseErrors([error.data.error])
                        })
                    }
                }}
            >
            {({ values, errors, touched, handleSubmit}) => (
                <Form>
                <Box sx={{ textAlign: 'left', display: 'flex', flexFlow: 'column' }}>
                    <Paper sx={{ p: 4, mb: 2, }}>
                        <ResponsiveGrid container spacing={2}>

                            <ResponsiveGrid container item xs={12} md={5}>
                                <Grid item>
                                    <Typography variant="button" color="initial">
                                        First Name
                                    </Typography>
                                </Grid>
                            </ResponsiveGrid>
                            <Grid item xs={12} md={3} alignSelf='center'>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    value={values.firstName}
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                />
                            </Grid>

                            <ResponsiveGrid item container xs={12} md={5}>
                                <Grid item>
                                    <Typography variant="button" color="initial">
                                        Last Name
                                    </Typography>
                                </Grid>
                            </ResponsiveGrid>
                            <Grid item xs={12} md={3} alignSelf='center'>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    name="lastName"
                                    label="Last Name"
                                    value={values.lastName}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                />
                            </Grid>

                            <ResponsiveGrid item container xs={12} md={5}>
                                <Grid item>
                                    <Typography variant="button" color="initial">
                                        Studio Name
                                    </Typography>
                                </Grid>
                            </ResponsiveGrid>
                            <Grid item xs={12} md={5} alignSelf='center'>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="studio.name"
                                    label="Studio Name"
                                    value={values.studio.name}
                                    error={Boolean(getIn(touched, 'studio.name') && getIn(errors, 'studio.name'))}
                                    helperText={getIn(touched, 'studi.name') && getIn(errors, 'studi.name')}
                                />
                            </Grid>

                            <ResponsiveGrid item xs={12} md={5}>
                                <Grid item>
                                    <Typography variant="button" color="initial">
                                        Email
                                    </Typography>
                                </Grid>
                            </ResponsiveGrid>
                            <Grid item xs={12} md={5}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={values.email}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}

                                />
                            </Grid>

                            <ResponsiveGrid item xs={12} md={5}>
                                <Grid item>
                                    <Typography variant="button" color="initial">
                                        Phone Number
                                    </Typography>
                                </Grid>
                            </ResponsiveGrid>
                            <Grid item xs={12} md={5}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    id="phone"
                                    name="phone"
                                    label="Phone"
                                    type="text"
                                    value={values.phone}
                                    error={touched.phone && Boolean(errors.phone)}
                                    helperText={touched.phone && errors.phone}

                                />
                            </Grid>

                            <ResponsiveGrid item xs={12} md={5}>
                                <Grid item>
                                    <Typography variant="button" color="initial">
                                        Studio Address
                                    </Typography>
                                </Grid>
                            </ResponsiveGrid>
                            <Grid item xs={12} md={5}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    id="address"
                                    name="address"
                                    label="Studio Address"
                                    type="text"
                                    multiline
                                    value={values.address}
                                    error={touched.address && Boolean(errors.address)}
                                    helperText={touched.address && errors.address}

                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ mb: 2 }} />
                            </Grid>

                            <ResponsiveGrid item container xs={12} md={5} alignSelf='center'>
                                <Grid item>
                                    <Typography variant="button" color="initial">
                                        New Password
                                    </Typography>
                                </Grid>
                            </ResponsiveGrid>
                            <Grid item xs={12} md={5} alignSelf='center'>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        endAdornment: (<InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>)
                                    }}
                                    label="Password"
                                />
                            </Grid>

                            <ResponsiveGrid item container xs={12} md={5} alignSelf='center'>
                                <Grid item>
                                    <Typography variant="button" color="initial">
                                        Confirm New Password
                                    </Typography>
                                </Grid>
                            </ResponsiveGrid>
                            <Grid item xs={12} md={5} alignSelf='center'>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    name="passwordConfirmation"
                                    label="Confirm Password"
                                    type={showPassword ? "text" : "password"}
                                    value={values.passwordConfirmation}
                                    error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                                    helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                                />
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
                </Form>
            )
            }
        </Formik >
        </Container >
    )
}
