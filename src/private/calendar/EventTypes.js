import { Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useState } from "react";

export default function EventTypes({ closeMenu, open }) {
    const [colors, setColors] = useState({
        lesson: "#b5b5da",
        groupLesson: "#33cfbc",
        recital: "#f9ac1f",
        makeUpLesson: "#ee7d68",
        vacation: "#b0d9f4",
        birthday: "#b95b67"
    })

    function handleChange(e) {
        const key = e.target.name
        const value = e.target.value
        setColors({ ...colors, [key]: value })
    }

    function handleClose() {
        console.log(colors)
        closeMenu()
    }

    return (
        <Dialog
            maxWidth='sm'
            fullWidth
            open={open}
        >
            <DialogTitle id="alert-confirm-send-login-emails">
                Event Types
            </DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Type</TableCell>
                                <TableCell>Color</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Lesson</TableCell>
                                <TableCell><input type='color' name="lesson" value={colors.lesson} onChange={handleChange} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Make-Up Lesson</TableCell>
                                <TableCell><input type='color' name="makeupUpLesson" value={colors.makeUpLesson} onChange={handleChange} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Group Lesson</TableCell>
                                <TableCell><input type='color' name="groupLesson" value={colors.groupLesson} onChange={handleChange} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Recital</TableCell>
                                <TableCell><input type='color' name="recital" value={colors.recital} onChange={handleChange} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Vacation</TableCell>
                                <TableCell><input type='color' name="vacation" value={colors.vacation} onChange={handleChange} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Birthday</TableCell>
                                <TableCell><input type='color' name="birthday" value={colors.birthday} onChange={handleChange} /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
                <DialogActions>
                <Button
                    onClick={closeMenu}
                    variant='outlined'
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleClose}
                    variant='contained'
                    color="primary"
                >
                    Save
                </Button>
                </DialogActions>
        </Dialog>
    )
}
