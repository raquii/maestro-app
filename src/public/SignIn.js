import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    Backdrop
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useHistory } from 'react-router';
import { useLoginMutation } from '../features/api';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function SignIn() {
    const history = useHistory();
    const [errors, setErrors] = useState("")
    const [login, { isLoading }] = useLoginMutation();

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const signInObj = {
            user: {
                email: data.get('email'),
                password: data.get('password'),
            }
        }
        localStorage.removeItem("token")
        try {
            await login(signInObj)
                .unwrap()
                .then(data => {
                    localStorage.setItem("token", data.token)
                    history.push('/dashboard')
                })
                .catch(error => setErrors(error.data.error))

        } catch (error) {
            console.log(error)
        }
    }

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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {errors.length > 0 &&
                        <Alert severity="error">{errors}</Alert>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Link to='/welcome'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to='/signup'>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
