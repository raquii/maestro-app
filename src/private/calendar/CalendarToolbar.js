import { useState } from "react"
import { Button, ButtonGroup, Popover, MenuList, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import PrintIcon from "@mui/icons-material/Print";
import ListIcon from '@mui/icons-material/ListAlt';
import CalendarIcon from '@mui/icons-material/DateRange';
import MonthViewIcon from '@mui/icons-material/CalendarViewMonth'
import WeekViewIcon from '@mui/icons-material/CalendarViewWeek'
import DayViewIcon from '@mui/icons-material/CalendarViewDay'
import RepeatIcon from '@mui/icons-material/Repeat';
import { Link } from "react-router-dom";

import { print } from "../../util/print";

export default function CalendarToolbar({handleMenus, calendarRef, url}) {
    //allows all popovers to be controlled by single piece of state
    const [popover, setPopover] = useState({
        anchor: null,
        menu: -1
    })

    const handleViewChange=(view)=>{
        calendarRef.current.getApi().changeView(view)
    }

    return (
        <>
            <ButtonGroup sx={{ marginBottom: { xs: 1, sm: 0 } }}>
                <Button
                    id='add-event-button'
                    aria-haspopup="listbox"
                    aria-controls="add-event-menu"
                    aria-label="add-event"
                    size='small'
                    aria-expanded={popover.menu === 1 ? 'true' : undefined}
                    variant={popover.menu === 1 ? "contained" : "outlined"}
                    onClick={(e) => setPopover({ anchor: e.currentTarget, menu: 1 })}
                >
                    <AddIcon color="secondary" />
                    Add
                </Button>
                <Button
                    id='event-types-button'
                    aria-label="calendar event-types button"
                    size='small'
                    onClick={()=>handleMenus('eventTypes')}
                >
                    <ListIcon color="secondary" />
                    Event Types
                </Button>
                <Button
                    id='calendar-settings-menu-button'
                    aria-label="settings-menu"
                    size='small'
                >
                    <SettingsIcon color="secondary" />
                    Settings
                </Button>
                <Button
                    id='student-print-button'
                    aria-label="calendar print button"
                    size='small'
                    onClick={()=>print('calendar')}
                >
                    <PrintIcon color="secondary" />
                    Print
                </Button>
            </ButtonGroup>
            <Button
                id='calendar-view-menu-button'
                aria-haspopup="listbox"
                aria-controls="view-menu"
                aria-label="view menu"
                aria-expanded={popover.menu === 2 ? 'true' : undefined}
                variant={popover.menu === 2 ? "contained" : "outlined"}
                size='small'
                onClick={(e) => setPopover({ anchor: e.currentTarget, menu: 2 })}
            >
                <CalendarIcon color="secondary" />
                View
            </Button>
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
                        aria-labelledby='add-event'
                        role='listbox'
                        autoFocusItem={popover.anchor !== null}
                    >
                        <MenuItem component={Link} to={`${url}/event-details`} >
                            <ListItemIcon>
                                <AddIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>New Event</ListItemText>
                        </MenuItem>
                        <MenuItem component={Link} to={`${url}/default-event-details`}>
                        <ListItemIcon>
                                <RepeatIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>New Default Lesson</ListItemText>
                        </MenuItem>
                    </MenuList>
                }
                {popover.menu === 2 &&
                    <MenuList
                        aria-labelledby='view-menu'
                        role='listbox'
                        autoFocusItem={popover.anchor !== null}
                    >
                        <MenuItem onClick={()=>handleViewChange('dayGridMonth')}>
                            <ListItemIcon>
                                <MonthViewIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Month</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={()=>handleViewChange('timeGridWeek')}>
                            <ListItemIcon>
                                <WeekViewIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Week</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={()=>handleViewChange('timeGridDay')}>
                            <ListItemIcon>
                                <DayViewIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Day</ListItemText>
                        </MenuItem>
                    </MenuList>
                }

            </Popover>

        </>
    )
}
