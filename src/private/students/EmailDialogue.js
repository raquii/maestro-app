import { TextField, Autocomplete} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './styles.css'


export default function EmailDialogue({ settings, handleClose, selected }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [value, setValue] = useState([]);
    const [showToolbar, setShowToolbar] = useState(false)

    const students = useSelector(state => state.students);
    const toOptions = students.map(s => ({ name: `${s.firstName} ${s.lastName}`, email: s.email }));

    
    useEffect(() => {
        function setToSelected(){
            if(settings.selectedStudents && settings.selectedParents){
                //TODO parent emails
            }else if(settings.selectedStudents){
                setValue((state)=>selected.map(s=>({ name: `${s.firstName} ${s.lastName}`, email: s.email })))
            }else if(settings.selectedParents){
                //TODO parent emails
            }else{
                setValue([])
            }
        }
        setToSelected()
    }, [selected, settings])

    return (
        <Dialog
            maxWidth='sm'
            fullWidth
            open={settings.open}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose();
                }
            }}
            aria-labelledby="alert-dialog-email"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-email">
                New Email
            </DialogTitle>
            <DialogContent>
                <Autocomplete
                    autoFocus
                    size='small'
                    sx={{mt:1}}
                    multiple
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    isOptionEqualToValue={(option, value) => option.email === value.email}
                    id="email-to-line"
                    options={toOptions}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="To"
                            placeholder="Select Recipients"
                        />
                    )}
                />
                <TextField
                    margin="dense"
                    id="subject"
                    label="Subject"
                    type="text"
                    size='small'
                    fullWidth
                    variant="outlined" />
                <Button
                    fullWidth
                    size='small'
                    onClick={()=>setShowToolbar(!showToolbar)}
                    color='secondary'
                    variant='outlined'
                    sx={{mb:1, mt:1}}
                >
                    {showToolbar ? 'Close Toolbar' : 'Open Toolbar'}
                </Button>
                <Editor
                    editorState={editorState}
                    placeholder='Body'
                    ariaLabel='email-body'
                    onEditorStateChange={setEditorState}
                    toolbarClassName="draft-toolbar"
                    wrapperClassName="draft-wrapper"
                    editorClassName="draft-editor"
                    toolbarHidden={showToolbar ? false : true}
                    toolbar={{ options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'emoji'] }}
                />
                
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
                    onClick={() => console.log('send')}
                    variant='contained'
                >
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    )
}
