import { RadioGroup, FormControl, FormLabel, FormHelperText, FormControlLabel, Radio } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import {
    useDeleteAllEventOccurancesMutation,
    useDeleteFutureEventOccurancesMutation,
    useUpdateAllEventOccurancesMutation,
    useUpdateFutureEventOccurancesMutation,
    useUpdateEventMutation,
    useDeleteEventMutation
} from '../../features/api';
import { useHistory } from 'react-router-dom';

export const RecurringEventModal = ({ open, handleClose, type, eventObj}) => {
    const [deleteEvent] = useDeleteEventMutation();
    const [deleteFutureEvents] = useDeleteFutureEventOccurancesMutation();
    const [deleteAllEvents] = useDeleteAllEventOccurancesMutation();
    const [updateEvent] = useUpdateEventMutation();
    const [updateFutureEvents] = useUpdateFutureEventOccurancesMutation();
    const [updateAllEvents] = useUpdateAllEventOccurancesMutation();
    const history = useHistory();

    const [editRecurrence, setEditRecurrence] = useState('this')

    function handleConfirmation() {
        const selection = `${type.toLowerCase()} ${editRecurrence}`;
        switch (selection) {
            case 'delete this':
                deleteEvent(eventObj)
                .unwrap()
                .then(()=>history.push('/calendar'))
                .catch((errors)=> console.log(errors)); 
                break;
            case 'update this':
                updateEvent({...eventObj, recurringGroupId: null})
                .unwrap()
                .then(()=>history.push('/calendar'))
                .catch((errors)=> console.log(errors)); 
                break;
            case 'delete future':
                deleteFutureEvents(eventObj)
                .unwrap()
                .then(()=>history.push('/calendar'))
                .catch((errors)=> console.log(errors)); 
                break;
            case 'update future':
                updateFutureEvents(eventObj)
                .unwrap()
                .then(()=>history.push('/calendar'))
                .catch((errors)=> console.log(errors)); 
                break;
            case 'delete all':
                deleteAllEvents(eventObj)
                .unwrap()
                .then(()=>history.push('/calendar'))
                .catch((errors)=> console.log(errors)); 
                break;
            case 'update all':
                updateAllEvents(eventObj)
                .unwrap()
                .then(()=>history.push('/calendar'))
                .catch((errors)=> console.log(errors)); 
                break;

            default:
                break;
        }

        handleClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-confirm-reset-makeup-credits"
            aria-describedby="alert-reset-makeups-description"
        >
            <DialogContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{type} Recurring Event</FormLabel>
                    <RadioGroup aria-label={`${type}-recurring-events`} name="recurringEventAction" value={editRecurrence} onChange={(e) => setEditRecurrence(e.target.value)}>
                        <FormControlLabel value="this" control={<Radio />} label="This event" />
                        <FormControlLabel value="future" control={<Radio />} label="This and future events" />
                        <FormControlLabel value="all" control={<Radio />} label="All events" />
                    </RadioGroup>
                    <FormHelperText></FormHelperText>
                </FormControl>
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
                    onClick={handleConfirmation}
                    autoFocus
                    variant='contained'
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}