import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport, GridActionsCellItem, } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector } from 'react-redux'
import { Tooltip } from '@mui/material'
import * as dayjs from 'dayjs'
import { useFetchStudentsQuery } from '../../features/api'

const columns = [
    {
        field: 'actions',
        type: 'actions',
        renderHeader: () => (<EditIcon fontSize='small' />),
        width: 30,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<Tooltip title="Edit"><EditIcon /></Tooltip>}
                label="Edit"
                onClick={editUser(params.id)}
            />,
        ],
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
            if(params.row.studentProfile.birthday){
                let today = dayjs()
                let birthday = dayjs(params.row.studentProfile.birthday)
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
        valueGetter: (params)=>{
            let result = ""
            if(params.row.studentProfile.birthday){            
                result = dayjs(params.row.studentProfile.birthday).format("MM-DD-YYYY")
            }
            return result
        },
        sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
    },
    {
        field: "defaultLessonDuration",
        headerName: 'Lesson Duration',
        hide: true,
        valueGetter: (params)=>{
            let result = ""
            if(params.row.studentProfile.defaultLessonDuration){            
                result = params.row.studentProfile.defaultLessonDuration
            }
            return result
        },
        sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
    },
    {
        field: "defaultLessonPrice",
        headerName: 'Default Price',
        hide: true,
        valueGetter: (params)=>{
            let result = ""
            if(params.row.studentProfile.defaultLessonPrice){            
                result = params.row.studentProfile.defaultLessonPrice
            }
            return result
        },
        sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
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
        valueGetter: (params)=>{
            let result = ""
            if(params.row.studentProfile.gender){            
                result = params.row.studentProfile.gender
            }
            return result
        },
        sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
    },
    {
        field: "school",
        headerName: 'School',
        hide: true,
        valueGetter: (params)=>{
            let result = ""
            if(params.row.studentProfile.school){            
                result = params.row.studentProfile.school
            }
            return result
        },
        sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())

    },
    {
        field: "makeUpCredits",
        headerName: 'Make-Up Credits',
        hide: false,
        valueGetter: (params)=>{
            let result = ""
            if(params.row.studentProfile.makeUpCredits){            
                result = params.row.studentProfile.makeUpCredits
            }
            return result
        },
        sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
    },
    {
        field: "status",
        headerName: 'Status',
        hide: false,
        valueGetter: (params)=>{
            let result = ""
            if(params.row.studentProfile.status){            
                result = params.row.studentProfile.status
            }
            return result
        },
        sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
    },
]

function editUser(id) {
    // console.log('edit', id)
}



export default function StudentGrid({ search, view, setSelection }) {
    const { error, isLoading } = useFetchStudentsQuery(undefined, {selectFromResult: () => ({})});

    const students = useSelector(state => state.students)
    
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

    return (
        <DataGrid
            error={error}
            loading={isLoading}
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
