
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
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import {  useDeleteTeamMutation, useGetTeamsQuery ,useEditTeamMutation,useAddTeamMutation} from '../slices/teamApiSlice';
import getUserIdFromToken from '../getToken'
import { Dialog } from 'primereact/dialog';
import TaskDetails from './taskDetails';

export default function TeamsTasks() {
    const [task, setTask] = useState([]);
    const [tasks, setTasks] = useState([]);
    const {data}=useGetTeamsQuery()
    const [selectedTask, setSelectedTask] = useState([]);
    const [deleteTaskDialog, setDeleteTaskDialog] = useState(false);
    const [editTaskById] = useEditTeamMutation();
    const [addTask]=useAddTeamMutation()
    const[deleteTaskById]=useDeleteTeamMutation()
    const toast = useRef(null)
   
    let emptyTask={
        name:'new Task',
        createdBy:"68062f23c50312e341e8bf72"
    }
    
    const addTaskToDB = async (task) => {
        try {
            const res = await addTask(task).unwrap();
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000 });
            console.log('res',res)
            return res;
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to create Task', life: 3000 });
            throw error;
        }
    };
    

    const editTaskToDB = async (task) => {
        try {
            await editTaskById(task).unwrap();
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000 });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update task', life: 3000 });
        }
    };
const saveTask = async () => {
    setSubmitted(true);
    console.log('task being:', task);
    if (!task.name.trim()) return;

    const createdBy = getUserIdFromToken();

  
  if (!createdBy) {
    console.log("User is not logged in.");
  }else   console.log(`createdBy ${createdBy}`);

    let _task = { ...task,createdBy:createdBy };
    console.log('task being sent:', _task);

    try {
        if (_task._id) {
            await editTaskToDB(_task); 
            const updatedTask = tasks.map(t => t._id === _task._id ? _task : t);
            setTask(updatedTask);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000 });
        } else {
            
            const res = await addTaskToDB(_task); 
            setTask([...tasks, res.data]); 
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000 });
        }

        setTaskDialog(false);
        setTask(emptyTask);
    } catch (error) {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to save task', life: 3000 });
    }
};

    const [submitted, setSubmitted] = useState(false);
    const [taskDialog, setTaskDialog] = useState(false);
    //const [task, setTask] = useState(emptyTask);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'task.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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
                {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedTeams || !selectedTeams.length} /> */}
            </div>
        );
    };
    const openNew = () => {
        setTask(emptyTask);
        setSubmitted(false);
        setTaskDialog(true);
    };
    useEffect(() => {
        if (Array.isArray(data)) {
            setTask(data);
        } else {
            setTask([]); 
        }
        
    }, [data]); 
 
    const hideDeleteTaskDialog = () => {
        setDeleteTaskDialog(false);
    };

    const confirmDeleteTask = (task) => {
        
        setTask(task);
        
        setDeleteTaskDialog(true);
        console.log(`confirmDeleteTask ${task}`)
    };
    
    
    const deleteConfirmedTask = async () => {
        try {
            await deleteTaskById(task).unwrap();
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
            setDeleteTaskDialog(false);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete Task', life: 3000 });
        }
    };
    
    
    const confirmDeleteSelected = () => {
        setDeleteTaskDialog(true);
    };
    
    const deleteSelectedTask = async () => {
        try {
            await Promise.all(selectedTask.map(t => deleteTaskById(t._id).unwrap()));
            setTask(tasks.filter(t => !selectedTask.some(sel => sel._id === t._id)));
            setSelectedTask(null);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
            setDeleteTaskDialog(false);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete Task', life: 3000 });
        }
    };
    

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    // const renderHeader = () => {
    //     return (
    //         <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
    //            <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
    //             <IconField iconPosition="left">
    //                 <InputIcon className="pi pi-search" />
    //                 <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
    //             </IconField>
    //         </div>
    //     );
    // };

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
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editTask(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteTask(rowData)} />
            </React.Fragment>
        );
    };

    const editTask = (task) => {
         setTask({ ...task });
         setTaskDialog(true);
     };
   
    const membersBodyTemplate = (rowData) => {
        console.log(`rowData ${rowData?.members}`);
        const members = rowData?.members;
        if (!Array.isArray(members)) return <span>No members</span>;

        return <span>{members.map(member => member.name).join(', ')}</span>;
      };
    
    // const activityBodyTemplate = (rowData) => {
    //     return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>;
    // };

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
 const onInputChange = (e,field) => {
    const value = e.target.value;
    if (field === 'name') {
        setTask((prev) => ({ ...prev, name: value }));
    } else if (field === 'admin') {
        setTask((prev) => ({
            ...prev,
            createdBy: { ...prev.createdBy, name: value }
        }));
    }
 }
    

 const deleteTaskDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteTaskDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => confirmDeleteTask(task)} />
        </React.Fragment>
    );
  
    const header = renderHeader();

    return (
        <div className="card">
            
            <DataTable value={tasks} paginator header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    filters={filters} filterDisplay="menu" globalFilterFields={['name', 'task?.name', 'representative?.name', 'balance', 'status']}
                    emptyMessage="No Task found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                
                <Column field="members" header="members" sortable filterField="task?.name" style={{ minWidth: '14rem' }} body={membersBodyTemplate}  />
                <Column field="createdBy.name" header="Admin"  sortable filter filterPlaceholder="Search by admin" style={{ minWidth: '14rem' }}/>
                {/* <Column field="activity" header="Activity" sortable showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} /> */}
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>

            <TaskDetails
            visible={taskDialog}
            task={task}
            onInputChange={onInputChange}
            saveTask={saveTask}
            hideDialog={() => setTaskDialog(false)}
            submitted={submitted}
            />


        <Dialog
        visible={deleteTaskDialog}
        onHide={() => setDeleteTaskDialog(false)}
        header="Confirm Delete"
        footer={
            <div>
            <Button label="No" icon="pi pi-times" onClick={() => setDeleteTaskDialog(false)} />
            <Button label="Yes" icon="pi pi-check" onClick={deleteConfirmedTask} />
            </div>
        }>
         <p>Are you sure you want to delete this Task?</p>
        </Dialog>

        </div>

        
    );
    
}
        