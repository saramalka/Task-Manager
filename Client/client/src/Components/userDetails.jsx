import React ,{useState}from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';


const UserDetails = ({ visible, user,teams, onInputChange, saveUser, hideDialog, submitted }) => {
    console.log(teams);
    
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
          
                <label htmlFor="email">Mail</label>
                <InputText
                id="email"
                value={user?.email || ''}
                onChange={(e) => onInputChange(e, 'email')}
                required
                autoFocus
                className={submitted && !user?.email ? 'p-invalid' : ''}
            />
            {submitted && !user?.email && <small className="p-error">Mail is required.</small>}

            <label htmlFor="role">Role</label>
                <InputText
                id="email"
                value={user?.role || ''}
                onChange={(e) => onInputChange(e, 'role')}
                autoFocus
                className={submitted && !user?.role ? 'p-invalid' : ''}
            />

            <label htmlFor="assignedTo">Team</label>
            <Dropdown
            id="teams"
            value={user?.teams?.[0]?._id || ''}
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