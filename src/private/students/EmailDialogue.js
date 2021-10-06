import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { useState } from 'react';


export default function EmailDialogue({open, handleClose}) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    return (
        <Dialog
            maxWidth='sm'
            fullWidth
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-email"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-email">
                New Email
            </DialogTitle>
            <DialogContent>
                <TextField
                 autoFocus
                 margin="dense"
                 id="name"
                 label="Email Address"
                 type="email"
                 fullWidth
                 variant="standard"/>
                <Editor 
                    editorState={editorState} 
                    onEditorStateChange={setEditorState} 
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>console.log('cancel')}>Cancel</Button>
                <Button onClick={()=>console.log('send')} autoFocus>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    )
}
