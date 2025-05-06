import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Profile = () => {
    const [user, setUser] = useState('initialUser');
    const [editMode, setEditMode] = useState(false);

    const handleChange = (e, field) => {
        setUser(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSave = () => {
        // כאן אפשר לשגר את הנתונים לשרת
        console.log('Saving user:', user);
        setEditMode(false);
    };

    return (
        <Card title="User Profile" className="w-full md:w-30rem m-auto mt-5">
            <div className="p-fluid">
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText
                        id="name"
                        value={user.name}
                        onChange={(e) => handleChange(e, 'name')}
                        disabled={!editMode}
                    />
                </div>

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        value={user.email}
                        onChange={(e) => handleChange(e, 'email')}
                        disabled={!editMode}
                    />
                </div>

                <div className="field">
                    <label htmlFor="role">Role</label>
                    <InputText
                        id="role"
                        value={user.role}
                        onChange={(e) => handleChange(e, 'role')}
                        disabled={!editMode}
                    />
                </div>

                <div className="mt-3">
                    {editMode ? (
                        <>
                            <Button label="Save" icon="pi pi-check" onClick={handleSave} className="mr-2" />
                            <Button label="Cancel" icon="pi pi-times" severity="secondary" onClick={() => setEditMode(false)} />
                        </>
                    ) : (
                        <Button label="Edit" icon="pi pi-pencil" onClick={() => setEditMode(true)} />
                    )}
                </div>
            </div>
        </Card>
    );
};

export default Profile;
