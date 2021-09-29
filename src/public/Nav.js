
import { Button, Box, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function Nav() {
    return (
        <>
            <Toolbar
                component="nav"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    Maestro
                </Typography>
                <Box>
                    <Button
                        component={Link}
                        to='/signup'
                        variant="outlined"
                        size="small"
                    >
                        Sign Up
                    </Button>
                    <Button
                        component={Link}
                        to='/signin'
                        variant="outlined"
                        size="small"
                    >
                        Sign In
                    </Button>
                </Box>
            </Toolbar>

        </>
    )
}
