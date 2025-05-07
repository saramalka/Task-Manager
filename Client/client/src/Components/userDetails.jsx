import React ,{useState}from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';


const UserDetails = ({ visible, user,teams, onInputChange, saveUser, hideDialog, submitted,users }) => {
    console.log(user);
    
    return (
        <Dialog
            visible={visible}
            style={{ width: '32rem' }}
            header="User Details"
            modal
            className="p-fluid"
            onHide={hideDialog}
            footer={
                <div>
                    <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
                    <Button label="Save" icon="pi pi-check" onClick={saveUser} />
                </div>
            }
        >
            <div className="field">
                <label htmlFor="name">Name</label>
                <InputText
                id="title"
                value={user?.name || ''}
                onChange={(e) => onInputChange(e, 'name')}
                required
                autoFocus
                className={submitted && !user?.name ? 'p-invalid' : ''}
            />
            {submitted && !user?.name && <small className="p-error">Name is required.</small>}

            <label htmlFor="assignedTo">Team</label>
            <Dropdown
    id="teams"
    value={teams?.name || ''}
    onChange={(e) =>
        onInputChange({ target: { value: [e.value] } }, 'teams')
    }
    options={teams?.map(u => ({ label: u.name, value: u._id })) || []}
    placeholder="Select a team"
    className="w-full"
/>

            </div> 
        </Dialog>
    );
};

export default UserDetails;