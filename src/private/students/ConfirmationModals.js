import { Alert, AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

export const NoSelectedStudents = ({ open, handleClose }) => {
    const handleOkClick = () => {
        handleClose({
            noSelection: false,
            makeups: false,
            delete: false,
            loginEmail: { display: false, to: "" }
        })
    }

    return (
        <Dialog
            open={open}
            onClose={handleOkClick}
            aria-describedby="alert-no-selection-description"
        >
            <DialogContent>
                <DialogContentText id="alert-no-selection-description">
                    Please select a student first!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleOkClick}
                    color='secondary'
                    variant='contained'
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export const LoginEmailConfirmation = ({ open, handleClose, selected, to }) => {

    function sendLoginEmails() {
        console.log('Sending Login Emails to', names)
    }

    const names = to === 'students' ?
        selected.map(s => <li key={s.id}>{s.firstName} {s.lastName} - {s.email}</li>) :
        selected.map(s => <li key={s.id}>{s.firstName} {s.lastName}'s Parents</li>)

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-confirm-send-login-emails"
            aria-describedby="alert-send-login-emails-description"
        >
            <DialogTitle id="alert-confirm-send-login-emails">
                Send Login Emails
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-send-login-emails-description">
                    Send login emails to the following {to}?
                </DialogContentText>
                <ul>
                    {names}
                </ul>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color='secondary'
                    variant='outlined'
                >
                    Cancel
                </Button>
                <Button
                    onClick={sendLoginEmails}
                    autoFocus
                    variant='contained'
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export const ResetMakeUpCreditsConfirmation = ({ open, handleClose, selected }) => {

    function resetCredits() {
        console.log('resetting credits for', names)
    }

    const names = selected.map(s => <li key={s.id}>{s.firstName} {s.lastName} - Current Credits: {s.makeUpCredits}</li>)

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-confirm-reset-makeup-credits"
            aria-describedby="alert-reset-makeups-description"
        >
            <DialogTitle id="alert-confirm-reset-makeup-credits">
                Reset Make-Up Credits
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-reset-makeups-description">
                    Reset make-up credits for the following student(s)?
                </DialogContentText>
                <ul>
                    {names}
                </ul>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color='secondary'
                    variant='outlined'
                >
                    Cancel
                </Button>
                <Button
                    onClick={resetCredits}
                    autoFocus
                    variant='contained'
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export const DeleteSelectedConfirmation = ({ open, handleClose, selected }) => {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(countdown => countdown - 1)
        }, 1000);

        if(countdown === 0){
            clearInterval(intervalId)
        }

        return () => {
            clearInterval(intervalId)
        }
    }, [countdown])


    function deleteSelected() {
        console.log('deleting selected', names)
    }

    const names = selected.map(s => <li key={s.id}>{s.firstName} {s.lastName}</li>)

    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-confirm-delete-students"
            aria-describedby="alert-confirm-delete-students-description"
        >
            <DialogTitle id="alert-confirm-delete-students">
                Confirm Deletion
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-confirm-delete-students-description">
                    Delete the following student(s)?

                    {/* Associated parents will also be deleted if no other students from this family exist. */}
                </DialogContentText>
                <ul>
                    {names}
                </ul>
                <Alert severity="warning">
                    This action cannot be undone.
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color='secondary'
                    variant='outlined'
                >
                    Cancel
                </Button>
                <Button
                    disabled={countdown > 0 ? true : false}
                    onClick={deleteSelected}
                    autoFocus
                    variant='contained'
                >
                    Confirm {countdown > 0 && `(${countdown})`}
                </Button>
            </DialogActions>
        </Dialog>
    )

}
