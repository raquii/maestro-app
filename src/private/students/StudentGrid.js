import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport, GridActionsCellItem, } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector } from 'react-redux'
import { Tooltip } from '@mui/material'

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
        hide: true
    },
    {
        field: "birthday",
        headerName: 'Birthday',
        hide: true
    },
    {
        field: "defaultLessonDuration",
        headerName: 'Lesson Duration',
        hide: true
    },
    {
        field: "defaultLessonPrice",
        headerName: 'Default Price',
        hide: true
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
        hide: false
    },
    {
        field: "gender",
        headerName: 'Gender',
        hide: true
    },
    {
        field: "groups",
        headerName: 'Groups',
        hide: true
    },
    {
        field: "makeupCredits",
        headerName: 'Make-Up Credits',
        hide: false
    },
    {
        field: "status",
        headerName: 'Status',
        hide: false
    },
]

function editUser(id) {
    // console.log('edit', id)
}

export default function StudentGrid({ search, view }) {
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
        <div style={{ height: 400, width: '100%' }}>
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
                hideFooter
            />
        </div>

    )
}
