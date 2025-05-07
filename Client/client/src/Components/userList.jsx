
import React, { useState, useEffect,useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import UserDetails from './userDetails';
import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery, useEditUserMutation } from '../slices/userApiSlice';

export default function UserList({usersOfTeam}) {
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const {data}=useGetUsersQuery()
    const [selectedUser, setSelectedUser] = useState([]);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [editUserById] = useEditUserMutation();
    const [addUser]=useAddUserMutation()
    const[deleteUserById]=useDeleteUserMutation()
    const toast = useRef(null)
    
    let emptyUser={
        name:'new User',
        Password:"user",
        email:'user@gmail.com'
    }
    
    const addUserToDB = async (user) => {
        try {
            const res = await addUser(user).unwrap();
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            console.log('res',res)
            return res;
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to create User', life: 3000 });
            throw error;
        }
    };
    

    const editUserToDB = async (user) => {
        try {
            await editUserById(user).unwrap();
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update user', life: 3000 });
        }
    };
const saveUser = async () => {
    setSubmitted(true);
    if (!user.name.trim()) return;

    let _user = { ...user};
    _user.teams = _user.teams?.map(team => team._id || team);

    console.log('user being sent:', _user);

    try {
        if (_user._id) {
            await editUserToDB(_user); 
            const updatedUser = users.map(t => t._id === _user._id ? _user : t);
            setUsers(updatedUser);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
        } else {
            const res = await addUserToDB(_user); 
            setUsers([...users, res]) 
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
        }

        setUserDialog(false);
        setUser(emptyUser);
    } catch (error) {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to save user', life: 3000 });
    }
};

    const [submitted, setSubmitted] = useState(false);
    const [userDialog, setUserDialog] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'user.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
      
 const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };
    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };
    useEffect(() => {
        if(usersOfTeam)
            setUsers(usersOfTeam);
        if (data ) {
            if(Array.isArray(data.users))
                setUsers(data.users);
            else {
                setUsers([])
            }
            if(Array.isArray(data.teams))
                setTeams(data.teams);
            else {
                setTeams([])
            }
            
        } 
        
    }, [data]); 
 
    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const confirmDeleteUser = (user) => {
        
        setUser(user);
        
        setDeleteUserDialog(true);
    };
    
    
    const deleteConfirmedUser = async () => {
        try {
            await deleteUserById(user).unwrap();
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            setDeleteUserDialog(false);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete User', life: 3000 });
        }
    };
    
    
    const confirmDeleteSelected = () => {
        setDeleteUserDialog(true);
    };
    
    const deleteSelectedUser = async () => {
        try {
            await Promise.all(selectedUser.map(t => deleteUserById(t._id).unwrap()));
            setUser(users.filter(t => !selectedUser.some(sel => sel._id === t._id)));
            setSelectedUser(null);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            setDeleteUserDialog(false);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete User', life: 3000 });
        }
    };
    

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap justify-between items-center gap-3 p-2 border-round surface-100">
                <div className="flex gap-2">
                    {leftToolbarTemplate()}
                </div>
    
                <div className="flex align-items-center">
                    
                    <span className="p-input-icon-left">
                        {/* <i className="pi pi-search" /> */}
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Keyword Search"
                        />
                    </span>
                </div>
            </div>
        );
    };
    
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    };

    const editUser = (user) => {
         setUser({ ...user });
         setUserDialog(true);
     };
    

 const onInputChange = (e,field) => {
    const value = e.target.value;
    if (field === 'name') {
        setUser((prev) => ({ ...prev, name: value }));
    } else if (field === 'role') {
        setUser((prev) => ({ ...prev, role: value }));
    }
    else if (field === 'email') {
        setUser((prev) => ({ ...prev, email: value }));
    }
    else if (field === 'teams') {
    setUser({ ...user, teams: value })
    }   
}
    
    

 const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => confirmDeleteUser(user)} />
        </React.Fragment>
    );
  
    const header = renderHeader();

    return (
        <div className="card">
            
            <DataTable value={users} paginator header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    filters={filters} filterDisplay="menu" globalFilterFields={['name', 'user?.name', 'representative?.name', 'balance', 'status']}
                    emptyMessage="No User found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="name" header="Name" sortable filterField="user?.name" filterPlaceholder="Search by title" style={{ minWidth: '14rem' }} />
                <Column header="Team" sortable filterField="user?.teams[0]?.name" style={{ minWidth: '14rem' }} body={(rowData) => rowData.teams?.[0]?.name || '-'}  />
                <Column field="email" header="Mail"  sortable filter filterPlaceholder="Search by email" style={{ minWidth: '14rem' }}/>
                {/* <Column field="activity" header="Activity" sortable showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} /> */}
                <Column field="role" header="Role" sortable filterField="user?.role" filterPlaceholder="Search by role" style={{ minWidth: '14rem' }} />
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                
            </DataTable>

            <UserDetails
            visible={userDialog}
            user={user}
           teams={teams}
            onInputChange={onInputChange}
            saveUser={saveUser}
            hideDialog={() => setUserDialog(false)}
            submitted={submitted}
            />


        <Dialog
        visible={deleteUserDialog}
        onHide={() => setDeleteUserDialog(false)}
        header="Confirm Delete"
        footer={
            <div>
            <Button label="No" icon="pi pi-times" onClick={() => setDeleteUserDialog(false)} />
            <Button label="Yes" icon="pi pi-check" onClick={deleteConfirmedUser} />
            </div>
        }>
         <p>Are you sure you want to delete this User?</p>
        </Dialog>

        </div>

        
    );
    
}
        