import React ,{useState}from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';


const TaskDetails = ({ visible, task, onInputChange, saveTask, hideDialog, submitted }) => {
    const [selectedStatus, setSelectedStatus] = useState(null)
    const statuses=["New","Resolve","Bag","Close"]

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

            <label htmlFor="assignedTo">Assign to</label>
            <InputText
                id="assignedTo"
                value={task?.assignTo?.name|| ''}
                onChange={(e) => onInputChange(e, 'assignedTo')}
                 className={submitted && !task?.assignTo?.name ? 'p-invalid' : ''}
            />
           {submitted && !task?.createdBy?.name && <small className="p-error">creator name is required.</small>}
            <Dropdown value={selectedStatus} onChange={(e) => setSelectedStatus(e.value)} options={statuses} 
              placeholder="Select a Status" className="w-full md:w-14rem" />
            </div>
        </Dialog>
    );
};

export default TaskDetails;