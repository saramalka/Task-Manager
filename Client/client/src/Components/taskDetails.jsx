import React ,{useState}from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';


const TaskDetails = ({ visible, task, onInputChange, saveTask, hideDialog, submitted,users }) => {
   
    const statuses=["New","Active","Resolve","Bag","Close"]

    return (
        <Dialog
            visible={visible}
            style={{ width: '32rem' }}
            header="Task Details"
            modal
            className="p-fluid"
            onHide={hideDialog}
            footer={
                <div>
                    <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
                    <Button label="Save" icon="pi pi-check" onClick={saveTask} />
                </div>
            }
        >
            <div className="field">
                <label htmlFor="title">Title</label>
                <InputText
                id="title"
                value={task?.title || ''}
                onChange={(e) => onInputChange(e, 'title')}
                required
                autoFocus
                className={submitted && !task?.title ? 'p-invalid' : ''}
            />
            {submitted && !task?.title && <small className="p-error">Title is required.</small>}

            <label htmlFor="assignedTo">Assign To</label>
            <Dropdown
                id="assignedTo"
                value={task?.assignedTo || ''} 
                onChange={(e) => onInputChange({ target: { value: e.value } }, 'assignedTo')}
                options={users}
                optionLabel="name"
                optionValue="_id"
                placeholder="Select a user"
                className="w-full"
            />
            <label htmlFor="teamId">Team</label>
            {/* <Dropdown
            id="teamId"
            value={teamId?._id || ''}
            onChange={(e) =>
              onInputChange({ target: { value: [e.value] } }, 'teamId')
            }
            options={teams?.map(u => ({ label: u.name, value: u._id })) || []}
            placeholder="Select a team"
            className="w-full"
            /> */}


           <label htmlFor="status">Status</label>
            <Dropdown value={task?.status|| ''}
             onChange={(e) => onInputChange({ target: { value: e.value } }, 'status')}
             options={statuses} 
             placeholder="Select a Status" className="w-full md:w-14rem" />
            </div>
        </Dialog>
    );
};

export default TaskDetails;