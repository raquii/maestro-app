import { Button, AppBar, Toolbar, Typography, SvgIcon} from "@mui/material"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from '../motif.svg';

export default function Nav() {
    return (

        <AppBar
            position="static"
            elevation={0}
            sx={{ backgroundColor: "#8bb6b8", borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar
                component="nav"
                align='left'
                sx={{ flexWrap: 'wrap' }}
            >
                <Button
                    component={Link}
                    to='/welcome'
                >
                    <SvgIcon
                        component={Logo}
                        sx={{ fontSize: "35pt", }}
                        viewBox="0 0 132.29 132.29"
                    />
                </Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flexGrow: 1, fontFamily: 'Merriweather', fontStyle: 'italic', }}
                >
                    { } motif
                </Typography>
                <Button
                    component={Link}
                    to='/signup'
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Sign Up
                </Button>
                <Button
                    component={Link}
                    to='/signin'
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Sign In
                </Button>
            </Toolbar>
        </AppBar>

    )
}
