import { Container, Grid, Paper, InputBase, Button, ButtonGroup, Popover, Menu, MenuItem, MenuList, Divider, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { styled, alpha } from '@mui/material/styles';
import GroupsIcon from "@mui/icons-material/Groups"
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import BuildIcon from '@mui/icons-material/Build';
import ViewListIcon from '@mui/icons-material/ViewListRounded';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

import { useStudentsMutation } from "../features/api";
import PageHeader from "./components/PageHeader"


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: alpha(theme.palette.background.default, 0.75),
    '&:hover': {
        backgroundColor: alpha(theme.palette.background.default, 0.95),
    },
    borderRadius: 6,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));




export default function Students() {
    const match = useRouteMatch();
    const [search, setSearch] = useState("")
    const [popover, setPopover] = useState({
        anchor: null,
        menu: -1
    })

    const [fetchStudents, { isLoading }] = useStudentsMutation();
    const students = useSelector(state => state.students)
    const [viewSettings, setViewSettings] = useState({
        age: false,
        birthday: false,
        defaultDuration: true,
        defaultPrice: true,
        email: true,
        family: false,
        gender: false,
        groups: true,
        makeupCredits: true,
        status: true,
        phone: false
    })

    const handleCheckChanges = (e => {
        const key = e.target.id
        const value = e.target.checked
        setViewSettings({ ...viewSettings, [key]: value })
    })

    const columns = ["age", "birthday", "defaultDuration", "defaultPrice", "email", "family", "gender", "groups", "makeupCredits", "status", "phone"]

    const viewChecks = columns.map(c => {
        return (<MenuItem key={c} disableRipple>
            <FormControlLabel label={c.charAt(0).toUpperCase() + c.slice(1)}
                control={
                    <Checkbox
                        id={c}
                        checked={viewSettings[c]}
                        onChange={handleCheckChanges}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
            />
        </MenuItem>)
    })



    const getStudents = async () => {
        try {
            await fetchStudents()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getStudents()
    }, [])



    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PageHeader
                icon={<GroupsIcon fontSize="large" sx={{ mr: 1 }} />}
                page="Students"
            />
            <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <ButtonGroup sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button component={Link} to={`${match.url}/new-student`}>
                                <AddIcon color="secondary" />
                                add
                            </Button>

                            <Button
                                variant={popover.menu === 1 ? "contained" : "outlined"}
                                onClick={(e) => setPopover({ anchor: e.currentTarget, menu: 1 })}>
                                <EmailIcon color="secondary" />
                                email
                            </Button>

                            <Button
                                variant={popover.menu === 2 ? "contained" : "outlined"}
                                onClick={(e) => setPopover({ anchor: e.currentTarget, menu: 2 })}>
                                <BuildIcon color="secondary" />
                                tools
                            </Button>

                            <Button
                                variant={popover.menu === 3 ? "contained" : "outlined"}
                                onClick={(e) => setPopover({ anchor: e.currentTarget, menu: 3 })}>
                                <ViewListIcon color="secondary" />
                                View
                            </Button>
                        </ButtonGroup>
                        <Popover
                            id='popover'
                            open={popover.anchor !== null}
                            onClose={() => setPopover({ anchor: null, menu: -1 })}
                            anchorEl={popover.anchor}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                        >
                            {popover.menu === 1 &&
                                <MenuList
                                    autoFocusItem={popover.anchor !== null}
                                >
                                    <MenuItem>New Email</MenuItem>
                                    <MenuItem>Email Selected Students</MenuItem>
                                    <MenuItem>Email Selected Parents</MenuItem>
                                    <MenuItem>Email Selected Students and Parents</MenuItem>
                                    <Divider />
                                    <MenuItem>Send Login Email to Students</MenuItem>
                                    <MenuItem>Send Login Email to Parents</MenuItem>
                                </MenuList>
                            }
                            {popover.menu === 2 &&
                                <MenuList
                                    autoFocusItem={popover.anchor !== null}
                                >
                                    <MenuItem>Reset Make-Up Credits</MenuItem>
                                    <MenuItem>Delete Selected Students</MenuItem>
                                    <Divider />
                                    <MenuItem>Set Status to Active</MenuItem>
                                    <MenuItem>Set Status to Trial</MenuItem>
                                    <MenuItem>Set Status to Inactive</MenuItem>
                                    <MenuItem>Set Status to Waiting</MenuItem>
                                    <MenuItem>Set Status to Lead</MenuItem>
                                </MenuList>
                            }
                            {popover.menu === 3 &&
                                <MenuList
                                    autoFocusItem={popover.anchor !== null}
                                >
                                    {viewChecks}
                                </MenuList>
                            }

                        </Popover>

                        <Search >
                            <SearchIconWrapper>
                                <SearchIcon color="primary" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        First Name
                                    </TableCell>
                                    <TableCell>
                                        Last Name
                                    </TableCell>
                                    <TableCell>
                                        Phone
                                    </TableCell>
                                    <TableCell>
                                        Email
                                    </TableCell>
                                    <TableCell>
                                        address
                                    </TableCell>
                                    <TableCell>
                                        grade
                                    </TableCell>
                                    <TableCell>
                                        Lesson $
                                    </TableCell>
                                    <TableCell>
                                        Lesson Duration
                                    </TableCell>
                                    <TableCell>
                                        make up credits
                                    </TableCell>
                                    <TableCell>
                                        Status
                                    </TableCell>
                                    <TableCell>
                                        adult
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map(student => (
                                    <TableRow
                                        key={student.id}
                                    >
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.firstName}
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.lastName}
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.phone}
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.address}
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.studentProfile.grade}
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.studentProfile.default_lesson_price}
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.studentProfile.default_lesson_duration}
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.studentProfile.make_up_credits}
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.studentProfile.status}
                                        </TableCell>
                                        <TableCell>
                                            {student.attributes.studentProfile.adult}
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
            <Switch>
                <Route path={`${match.path}/new-student`}>
                    <h1>New Student</h1>
                </Route>
            </Switch>
        </Container>
    )
}
