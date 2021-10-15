import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button, Divider, Typography } from "@mui/material";
import { useHistory } from 'react-router';

export default function EventSummary({ url, event, closeMenu, open, setSelectedEvent }) {
    const history = useHistory();

    function handleEdit(id){
        history.push(`${url}/event-details/${id}`);
        closeMenu();
    }

    function handleClose(){
        setSelectedEvent({});
        closeMenu();
    }

    return (
        <Dialog open={open}>
            <DialogTitle id="alert-confirm-send-login-emails">
                Event Summary
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        {event.title}
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={12}>

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
                    onClick={()=>handleEdit(event.id)}
                    variant='contained'
                    color="primary"
                >
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
