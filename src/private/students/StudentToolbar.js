import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import BuildIcon from '@mui/icons-material/Build';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { InputBase, Button, ButtonGroup, Popover, MenuItem, MenuList, Divider } from "@mui/material"
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';


//creating custom search bar
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

//search bar icon custom theming
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

//custom input bar theming
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

const ShowButton = styled(Button)(({ theme }) => ({
    '&.Mui-disabled, &:disabled': {
        color: theme.palette.primary.main,
        borderColor: alpha(theme.palette.primary.main,.5),
        backgroundColor:theme.palette.background.default,
    }
}));

export default function StudentToolbar({ match, search, setSearch, view, setView }) {
    //allows all popovers to be controlled by single piece of state
    const [popover, setPopover] = useState({
        anchor: null,
        menu: -1
    })

    function handleViewMenuClick(e) {
        setPopover({anchor: null, menu: -1})
        setView(e.target.id)
    }

    return (
        <>
            <ButtonGroup sx={{marginBottom: { xs: 1, sm: 0 }}}>
                <Button
                    aria-label="add student"
                    size='small'
                    component={Link}
                    to={`${match.url}/new-student`}
                    sx={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderRightColor: 'transparent'
                    }}>
                    <AddIcon color="secondary" />
                    Add
                </Button>

                <Button
                    id='student-email-menu-button'
                    aria-haspopup="listbox"
                    aria-controls="email-menu"
                    aria-label="email menu"
                    aria-expanded={popover.menu === 1 ? 'true' : undefined}
                    variant={popover.menu === 1 ? "contained" : "outlined"}
                    sx={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        ml: 0,
                    }}
                    size='small'
                    onClick={(e) => setPopover({ anchor: e.currentTarget, menu: 1 })}>
                    <EmailIcon color="secondary" />
                    email
                </Button>

                <Button
                    id='student-tools-button'
                    aria-haspopup="listbox"
                    aria-controls="tools-menu"
                    aria-label="student tools"
                    aria-expanded={popover.menu === 2 ? 'true' : undefined}
                    variant={popover.menu === 2 ? "contained" : "outlined"}
                    size='small'
                    onClick={(e) => setPopover({ anchor: e.currentTarget, menu: 2 })}>
                    <BuildIcon color="secondary" />
                    tools
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
                        aria-labelledby='student-email-menu-button'
                        role='listbox'
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
                        aria-labelledby='student-tools-button'
                        role='listbox'
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
                        aria-labelledby='display-status-button'
                        role='listbox'
                        autoFocusItem={popover.anchor !== null}
                    >
                        <MenuItem
                            id='active'
                            onClick={handleViewMenuClick}
                        >
                            Active
                        </MenuItem>
                        <MenuItem
                            id='trial'
                            onClick={handleViewMenuClick}
                        >
                            Trial
                        </MenuItem>
                        <MenuItem
                            id='inactive'
                            onClick={handleViewMenuClick}
                        >
                            Inactive
                        </MenuItem>
                        <MenuItem
                            id='waiting'
                            onClick={handleViewMenuClick}
                        >
                            Waiting
                        </MenuItem>
                        <MenuItem
                            id='lead'
                            onClick={handleViewMenuClick}
                        >
                            Lead
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            id=''
                            onClick={handleViewMenuClick}
                        >
                            All
                        </MenuItem>
                    </MenuList>
                }
            </Popover>
            <ButtonGroup id='student-status-display-controls'>
                <ShowButton
                    disabled
                    classes={{ disabled: 'btn' }}
                    sx={{
                        '& .MuiButtonBase-root-MuiButton-root': {
                            "&:disabled": {

                            }
                        }
                    }}
                >
                    <ViewListIcon color="secondary" />
                    Show:
                </ShowButton>

                <Button
                    size="small"
                    id='display-status-button'
                    aria-haspopup="listbox"
                    aria-controls="status-menu"
                    aria-label="show status"
                    aria-expanded={popover.menu === 3 ? 'true' : undefined}
                    variant={popover.menu === 3 ? "contained" : "outlined"}
                    onClick={(e) => setPopover({ anchor: e.currentTarget, menu: 3 })}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    {view.length > 0 ? view : 'All'}
                </Button>
            </ButtonGroup>
            <Search sx={{
                order: { xs: -1, sm: 2 },
                marginBottom: { xs: 1, sm: 0 }
            }}>
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
        </>
    )
}
