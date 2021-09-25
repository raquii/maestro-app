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
    IconButton
} from '@mui/material';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }; 

    return (
        <Container component="main" maxWidth="xs">
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
                                    .matches(/([^<>@{}[\]!#$%^&*()=+?:;|0-9])+/)
                                    .trim()
                                    .required('Required'),
                                lastName: yup.string()
                                    .min(2, 'First name should be at least 2 characters')
                                    .max(50, 'First name should be less than 50 characters')
                                    .matches(/([^<>@{}[\]!#$%^&*()=+?:;|0-9])+/)
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
                        onSubmit={(values) => {
                            const newUser = {user:{
                                ...values}
                            }
                            fetch('http://localhost:3000/sign_up',{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(newUser)
                            })
                            .then(r=>r.json())
                            .then(data=>console.log(data))
                        }}>
                        {({ errors, touched, values, handleSubmit }) => (
                            <Form>
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
                                            id="new-email"
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
                                    <Grid item xs={12} sm={6}>
                                        <Button color="primary" variant="contained" type="submit" onSubmit={handleSubmit}>
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
