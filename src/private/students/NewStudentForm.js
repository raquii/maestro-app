
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { useHistory } from 'react-router';
import {
    Button,
    Grid,
    InputAdornment,
    Container,
    Backdrop,
    CircularProgress,
    Alert,
    Paper,
    MenuItem,
    Switch,
    TextField,
    Checkbox
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PageHeader from '../components/PageHeader';




export default function NewStudentForm() {
    const [responseErrors, setResponseErrors] = useState([]);

    const history = useHistory();
    const renderedErrors = responseErrors.map(error => <Alert key={error} severity="error">{error}</Alert>)

    const formik = useFormik({
        initialValues:{
            firstName: "",
            lastName: "",
            email: "",
            birthday: "",
            address: "",
            adult: false,
            defaultLessonPrice: 0,
            defaultLessonDuration: 0,
            status: 0,
            gender: "",
            role: 1
        },
        validationSchema:
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
                    .trim(),
                birthday: yup.date(),
                address: yup.string(),
                adult: yup.boolean(),
                defaultLessonPrice: yup.number()
                    .lessThan(1000, "Invalid lesson price: Please enter a value less than 1000"),
                defaultLessonDuration: yup.number('Lesson Duration should be a number in minutes')
                    .integer()
                    .min(0, "Invalid Duration")
                    .max(120, "Invalid Lesson Length. Please select a length less than 120 minutes"),
                status: yup.number()
                    .integer()
                    .min(0, "Invalid Status")
                    .max(4, "Invalid Status")
                    .required('Please set a status for the student'),
                gender: yup.string(),
            })
        ,
        onSubmit: values => {
            console.log(values)
        }, 
    })

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
           
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Paper sx={{mt:5}}>
                            <Grid container
                                sx={{
                                    pl: 4,
                                    pr: 4,
                                    pb: 5,
                                    pt: 2,
                                    alignItems: 'center',
                                    textAlign: 'left'
                                }}
                                spacing={2}
                            >
                                <Grid item xs={4}>
                                    First Name
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        name="firstName"
                                        label="First Name*"
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    Last Name
                                </Grid>

                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        name="lastName"
                                        label="Last Name*"
                                        value={formik.values.lastName}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    Email
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        value={formik.values.email}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    Phone
                                </Grid>
                                <Grid item xs={8} >
                                    <TextField
                                        variant="outlined"
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        type="text"
                                        value={formik.values.phone}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    Address
                                </Grid>
                                <Grid item xs={8} >
                                    <TextField
                                        variant="outlined"
                                        id="address"
                                        name="address"
                                        label="Address"
                                        type="address"
                                        value={formik.values.address}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                        onChange={formik.handleChange}

                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    Default Lesson Price
                                </Grid>
                                <Grid item xs={8} >
                                    <TextField
                                        variant="outlined"
                                        id="defaultLessonPrice"
                                        name="defaultLessonPrice"
                                        label="Default Price"
                                        type="number"
                                        value={formik.values.defaultLessonPrice}
                                        error={formik.touched.defaultLessonPrice && Boolean(formik.errors.defaultLessonPrice)}
                                        helperText={formik.touched.defaultLessonPrice && formik.errors.defaultLessonPrice}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            style: { width: '110pt' },
                                            startAdornment: (<InputAdornment position="start">
                                                $
                                            </InputAdornment>)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    Default Lesson Duration
                                </Grid>
                                <Grid item xs={8} >
                                    <TextField
                                        variant="outlined"
                                        id="defaultLessonDuration"
                                        name="defaultLessonDuration"
                                        label="Default Duration"
                                        type="number"
                                        value={formik.values.defaultLessonDuration}
                                        error={formik.touched.defaultLessonDuration && Boolean(formik.errors.defaultLessonDuration)}
                                        helperText={formik.touched.defaultLessonDuration && formik.errors.defaultLessonDuration}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            style: { width: '110pt' },
                                            endAdornment: (<InputAdornment
                                                variant='filled'
                                                position="end">
                                                minutes
                                            </InputAdornment>)
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    Gender
                                </Grid>
                                <Grid item xs={8} >
                                    <TextField
                                        variant="outlined"
                                        id="gender"
                                        name="gender"
                                        label="Gender"
                                        type="gender"
                                        value={formik.values.gender}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                        helperText={formik.touched.gender && formik.errors.gender}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    Adult Student?
                                </Grid>
                                <Grid item xs={8} >
                                    <FormControlLabel
                                        label="Adult"
                                        checked={formik.values.adult}
                                        onChange={formik.handleChange}
                                        control={
                                            <Checkbox id='adult' />
                                        } />
                                </Grid>

                                <Grid item xs={4}>
                                    Enrollment Status
                                </Grid>
                                <Grid item xs={8} >
                                    <TextField
                                        variant="outlined"
                                        id="status"
                                        name="status"
                                        label="Status"
                                        select
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                        >
                                        <MenuItem value={0}>Active</MenuItem>
                                        <MenuItem value={1}>Lead</MenuItem>
                                        <MenuItem value={2}>Waiting</MenuItem>
                                        <MenuItem value={3}>Trial</MenuItem>
                                        <MenuItem value={4}>Inactive</MenuItem>
                                    </TextField>
                                </Grid>
                                {responseErrors.length > 0 &&
                                    <Grid item xs={12}>
                                        {renderedErrors}
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        type="submit">
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
        </Container>
    )
}
