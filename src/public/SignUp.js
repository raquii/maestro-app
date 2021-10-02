import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
    Avatar,
    Button,
    Grid,
    Box,
    InputAdornment,
    Typography,
    Container,
    IconButton,
    Backdrop,
    CircularProgress,
    Alert
} from '@mui/material';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';

import { useSignupMutation } from '../features/api';
import { useHistory } from 'react-router';


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [responseErrors, setResponseErrors] = useState([]);
    const [signup, { isLoading }] = useSignupMutation();

    const history = useHistory();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const renderedErrors = responseErrors.map(error => <Alert key={error} severity="error">{error}</Alert>)

    return (
        <Container component="main" maxWidth="xs">
            <Backdrop
                sx={{ color: '#fff', zIndex: 10 }}
                open={isLoading}
            >
                <CircularProgress />
            </Backdrop>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            passwordConfirmation: "",
                        }}
                        validationSchema={
                            yup.object({
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
                                    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}/, 'Must contain an upper and lowercase character, a number, and a special character')
                                    .required('Password is required'),
                                passwordConfirmation: yup.string()
                                    .test('match-password', 'Passwords must match.', (value, context) => value === context.parent.password)
                                    .required('Password is required'),
                            })
                        }
                        onSubmit={async (values) => {
                            const newUser = {
                                user: { ...values }
                            }

                            try {
                                await signup(newUser)
                                    .unwrap()
                                    .then(data => {
                                        localStorage.setItem("token", data.token)
                                        history.push('/dashboard')
                                    })
                                    .catch(error => setResponseErrors(error.data.errors))
                            } catch (error) {
                                console.log(error)
                            }
                        }}>
                        {({ errors, touched, values, handleSubmit }) => (
                            <Form autoComplete="off">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            name="firstName"
                                            label="First Name"
                                            error={touched.firstName && Boolean(errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
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
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            component={TextField}
                                            variant="outlined"
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                            value={values.email}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
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
                                    <Grid item xs={12} sm={6}>
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
                                    {responseErrors.length > 0 &&
                                        <Grid item xs={12}>
                                            {renderedErrors}
                                        </Grid>
                                    }
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            onSubmit={handleSubmit}>
                                            Submit
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Container>
    )
}
