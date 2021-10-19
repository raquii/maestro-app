import { DataGrid, 
    GridToolbarContainer, 
    GridToolbarColumnsButton, 
    GridToolbarDensitySelector, 
    GridToolbarExport, } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector } from 'react-redux'
import { Tooltip, IconButton } from '@mui/material'
import * as dayjs from 'dayjs'

import { useCallback } from 'react'


export default function StudentGrid({ search, view, setSelection }) {
    const students = useSelector(state => state.students)
    const editUser = useCallback((id)=>()=>{
        console.log('edit', id)
    },[]);

    const escapeRegExp = (value) => {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    const searchRegex = new RegExp(escapeRegExp(search), 'i');
    const updatedRows = search.length > 0 ? students.filter(row => Object.keys(row).some(col => searchRegex.test(row[col]))) : students

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            renderHeader: () => (<EditIcon fontSize='small' />),
            width: 30,
            renderCell: (params) => (
                  <IconButton
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ borderRadius:10}}
                    onClick={editUser(params.id)}
                  >
                    <Tooltip title="Edit"><EditIcon /></Tooltip>
                  </IconButton>
              ),
        },
        {
            field: "firstName",
            headerName: 'First Name',
            width: 125,
            hide: false
        },
        {
            field: "lastName",
            headerName: 'Last Name',
            width: 125,
            hide: false
        },
        {
            field: "age",
            headerName: 'Age',
            hide: true,
            valueGetter: (params)=>{
                let result = ""
                if(params.row.birthday){
                    let today = dayjs()
                    let birthday = dayjs(params.row.birthday)
                    result = today.diff(birthday, 'year')
                }
                return result
            },
            sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
        },
        {
            field: "birthday",
            headerName: 'Birthday',
            hide: true,
        },
        {
            field: "defaultLessonDuration",
            headerName: 'Lesson Duration',
            hide: true,
        },
        {
            field: "defaultLessonPrice",
            headerName: 'Default Price',
            hide: true,
        },
        {
            field: "email",
            headerName: 'Email',
            width: 200,
            hide: false
        },
        {
            field: "phone",
            headerName: 'Phone',
            width: 110,
            hide: false
        },
        {
            field: "family",
            headerName: 'Family',
            hide: true
        },
        {
            field: "gender",
            headerName: 'Gender',
            hide: true,
        },
        {
            field: "school",
            headerName: 'School',
            hide: true,
        },
        {
            field: "makeUpCredits",
            headerName: 'Make-Up Credits',
            hide: false,
        },
        {
            field: "status",
            headerName: 'Status',
            hide: false,
        },
    ]

    return (
        <DataGrid
            rows={updatedRows}
            columns={columns}
            components={{
                Toolbar: CustomToolbar,
            }}
            filterModel={{
                items: [
                    {
                        columnField: 'status',
                        operatorValue: 'equals',
                        value: view
                    },
                ],
            }}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => {
                const selectedIds = new Set(ids);
                const selectedRows = updatedRows.filter(r => selectedIds.has(r.id.toString()))
                setSelection(selectedRows)
            }}

            hideFooter
        />
    )
}
