import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const LoginEmailConfirmation = ({ open, handleClose, selected }) => {

    function sendLoginEmails() {
        console.log('Sending Login Emails to', names)
    }

    const names = selected.map(s => <li key={s.id}>{s.firstName}{s.lastName} - {s.email}</li>)

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
                    Send login emails to:
                    <ul>
                        {names}
                    </ul>
                </DialogContentText>
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

    const names = selected.map(s => <li key={s.id}>{s.firstName}{s.lastName} - credits: {s.makeUpCredits}</li>)

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
                    Reset make-up credits to 0 for the following students?
                    <ul>
                        {names}
                    </ul>
                    This action cannot be undone.
                </DialogContentText>
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

    function deleteSelected() {
        console.log('deleting selected', names)
    }

    const names = selected.map(s => <li key={s.id}>{s.firstName}{s.lastName}</li>)

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-confirm-delete-students"
            aria-describedby="alert-confirm-delete-students-description"
        >
            <DialogTitle id="alert-confirm-delete-students">
                Delete Students?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-confirm-delete-students-description">
                    Delete the following students?
                    <ul>
                        {names}
                    </ul>
                    This action cannot be undone. 
                    {/* Associated parents will also be deleted if no other students from this family exist. */}
                </DialogContentText>
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
                    onClick={deleteSelected}
                    autoFocus
                    variant='contained'
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )

}
