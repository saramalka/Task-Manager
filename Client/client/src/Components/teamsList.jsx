
import React, { useState, useEffect,useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Slider } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import {  useDeleteTeamMutation, useGetTeamsQuery ,useEditTeamMutation,useAddTeamMutation} from '../slices/teamApiSlice';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

export default function TeamsList() {
    const [teams, setTeams] = useState([]);
    const {data,isError,isLoading,isSuccess,error}=useGetTeamsQuery()
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [deleteTeamDialog, setDeleteTeamDialog] = useState(false);
    const [deleteTeamsDialog, setDeleteTeamsDialog] = useState(false);
    const [editTeamById] = useEditTeamMutation();
    const [addTeam]=useAddTeamMutation()
    const[deleteTeamById]=useDeleteTeamMutation()
    const toast = useRef(null)
   
    let emptyTeam={
        name:'new Team',
        userId:"68062f23c50312e341e8bf72"

    }
    
    const addTeamToDB = async (team) => {
        try {
            const res = await addTeam(team).unwrap();
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Team Created', life: 3000 });
            console.log('res',res)
            return res;
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to create team', life: 3000 });
            throw error;
        }
    };
    

    const editTeamToDB = async (team) => {
        try {
            await editTeamById(team).unwrap();
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Team Updated', life: 3000 });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update team', life: 3000 });
        }
    };
const saveTeam = async () => {
    setSubmitted(true);
    if (!team.name.trim()) return;

    let _team = { ...team };

    try {
        if (_team._id) {
            await editTeamToDB(_team); 
            const updatedTeams = teams.map(t => t._id === _team._id ? _team : t);
            setTeams(updatedTeams);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Team Updated', life: 3000 });
        } else {
            _team._id = createId();
            const res = await addTeamToDB(_team); 
            setTeams([...teams, res.data]); 
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Team Created', life: 3000 });
        }

        setTeamDialog(false);
        setTeam(emptyTeam);
    } catch (error) {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to save team', life: 3000 });
    }
};

    const [submitted, setSubmitted] = useState(false);
    const [teamDialog, setTeamDialog] = useState(false);
    const [team, setTeam] = useState(emptyTeam);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'team.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
   
    const hideDialog = () => {
        setSubmitted(false);
        setTeamDialog(false);
        setDeleteTeamDialog(false);
        console.log('hideDialog')
    };
    const teamDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveTeam} />
        </React.Fragment>
    );
    
 const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedTeams || !selectedTeams.length} />
            </div>
        );
    };
    const openNew = () => {
        setTeam(emptyTeam);
        setSubmitted(false);
        setTeamDialog(true);
    };
    useEffect(() => {
        if (Array.isArray(data)) {
            setTeams(data);
        } else {
            setTeams([]); 
        }
        
    }, [data]); 


    const getTeams = (data) => {
        
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

  

    const formatDate = (value) => {
        if (!value) return '';
        return new Date(value).toLocaleDateString();
    };
    const formatCurrency = (value) => {
        if (value === undefined || value === null) return '';
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
        
    const hideDeleteTeamsDialog = () => {
        setDeleteTeamsDialog(false);
    };

    const confirmDeleteTeam = (team) => {
        
        setTeam(team);
        
        setDeleteTeamDialog(true);
        console.log(`confirmDeleteTeam ${team}`)
    };
    
    
    const deleteConfirmedTeam = async () => {
        try {
            await deleteTeamById(team).unwrap();
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Team Deleted', life: 3000 });
            setDeleteTeamDialog(false);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete team', life: 3000 });
        }
    };
    
    
    const confirmDeleteSelected = () => {
        setDeleteTeamsDialog(true);
    };
    

    const deleteTeam = () => {
        let _team = teams.filter((val) => val._id !== team._id);
        setDeleteTeamsDialog(false);
        setTeam(emptyTeam);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Team Deleted', life: 3000 });
    };

    const deleteSelectedTeams = async () => {
        try {
            await Promise.all(selectedTeams.map(t => deleteTeamById(t._id).unwrap()));
            setTeams(teams.filter(t => !selectedTeams.some(sel => sel._id === t._id)));
            setSelectedTeams(null);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Teams Deleted', life: 3000 });
            setDeleteTeamsDialog(false);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete teams', life: 3000 });
        }
    };
    

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
   
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i]._id === id) {
            index = i;
            break;
        }
    }
    return index;
};

 const createId = () => {
       let id = '';
       let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   
       for (let i = 0; i < 5; i++) {
           id += chars.charAt(Math.floor(Math.random() * chars.length));
       }
   
       return id;
   };
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                <h4 className="m-0">Teams</h4>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const teamBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.team?.code}`} style={{ width: '24px' }} />
                <span>{rowData.team?.name}</span>
            </div>
        );
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editTeam(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteTeam(rowData)} />
            </React.Fragment>
        );
    };

    const editTeam = (team) => {
         setTeam({ ...team });
         setTeamDialog(true);
     };
   
    const membersBodyTemplate = (rowData) => {
        console.log(`rowData ${rowData.members}`);
        const members = rowData.members;
        if (!Array.isArray(members)) return <span>No members</span>;

        return <span>{members.map(member => member.name).join(', ')}</span>;
      };
    
    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>;
    };

    const activityFilterTemplate = (options) => {
        return (
            <>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </>
        );
    };
 const onInputChange = (e, name) => {
     const val = (e.target && e.target.value) || '';
     let _team = { ...team };
     _team[`${name}`] = val;
     setTeam(_team);
 };
 const deleteTeamDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteTeamsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => confirmDeleteTeam(team)} />
        </React.Fragment>
    );
    const deleteTeamsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteTeamsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedTeams} />
        </React.Fragment>
    );
    const header = renderHeader();

    return (
        <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
            <DataTable value={teams} paginator header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="_id" selectionMode="checkbox" selection={selectedTeams} onSelectionChange={(e) => setSelectedTeams(e.value)}
                    filters={filters} filterDisplay="menu" globalFilterFields={['name', 'team?.name', 'representative?.name', 'balance', 'status']}
                    emptyMessage="No teams found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                
                <Column field="members" header="members" sortable filterField="team?.name" style={{ minWidth: '14rem' }} body={membersBodyTemplate} filter filterPlaceholder="Search by name" />
                <Column field="createdBy.name" header="Admin"  sortable filter filterPlaceholder="Search by admin" style={{ minWidth: '14rem' }}/>
                <Column field="activity" header="Activity" sortable showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>

            <Dialog visible={teamDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Team Details" modal className="p-fluid" footer={teamDialogFooter} onHide={hideDialog}>
              {team.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${team?.image}`} alt={team?.image} className="team-image block m-auto pb-3" />}
              <div className="field">
                  <label htmlFor="name" className="font-bold">
                      Name
                  </label>
                  <InputText id="name" value={team.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !team.name })} />
                  {submitted && !team.name && <small className="p-error">Name is required.</small>}
              </div>
              
                 
              
              <div className="formgrid grid">
                  <div className="field col">
                      <label htmlFor="price" className="font-bold">
                          Price
                      </label>
                      {/* <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" /> */}
                  </div>
                  
              </div>
          </Dialog>

          <Dialog
    visible={deleteTeamDialog}
    onHide={() => setDeleteTeamDialog(false)}
    header="Confirm Delete"
    footer={
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setDeleteTeamDialog(false)} />
            <Button label="Yes" icon="pi pi-check" onClick={deleteConfirmedTeam} />
        </div>
    }
>
    <p>Are you sure you want to delete this team?</p>
</Dialog>

        <Dialog visible={deleteTeamsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteTeamsDialogFooter} onHide={hideDeleteTeamsDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {team && <span>Are you sure you want to delete the selected teams?</span>}
            </div>
        </Dialog>

        </div>

        
    );
    
}
        