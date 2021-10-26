import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useHistory } from 'react-router';

export default function EventSummary({ url, event, closeMenu, open, setSelectedEvent }) {
    const history = useHistory();

    function handleEdit(id) {
        history.push(`${url}/event-details/${id}`);
        closeMenu();
    }

    function handleClose() {
        setSelectedEvent({});
        closeMenu();
    }

    return (
        <Dialog open={open}>
            <DialogTitle id="alert-confirm-send-login-emails">
                {event.title}
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="overline" color="initial" fontSize="medium">
                            {dayjs(event.start).format('MMMM D, YYYY')}  • {event.allDay ? "All Day" : `${dayjs(event.start).format('h:mm a')} - ${dayjs(event.end).format('h:mm a')}`}
                        </Typography>
                    </Grid>

                </Grid>

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant='outlined'
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => handleEdit(event.id)}
                    variant='contained'
                    color="primary"
                >
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
