import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const TeamDetails = ({ visible, team, onInputChange, saveTeam, hideDialog, submitted }) => {
    return (
        <Dialog
            visible={visible}
            style={{ width: '32rem' }}
            header="Team Details"
            modal
            className="p-fluid"
            onHide={hideDialog}
            footer={
                <div>
                    <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
                    <Button label="Save" icon="pi pi-check" onClick={saveTeam} />
                </div>
            }
        >
            <div className="field">
                <label htmlFor="name">Name</label>
                <InputText
                id="name"
                value={team?.name || ''}
                onChange={(e) => onInputChange(e, 'name')}
                required
                autoFocus
                className={submitted && !team?.name ? 'p-invalid' : ''}
            />
            {submitted && !team?.name && <small className="p-error">Name is required.</small>}

            <label htmlFor="admin">Admin</label>
            <InputText
                id="admin"
                value={team?.createdBy?.name || ''}
                onChange={(e) => onInputChange(e, 'admin')}
                required
                className={submitted && !team?.createdBy?.name ? 'p-invalid' : ''}
            />
            {submitted && !team?.createdBy?.name && <small className="p-error">Admin name is required.</small>}

            </div>
        </Dialog>
    );
};

export default TeamDetails;
