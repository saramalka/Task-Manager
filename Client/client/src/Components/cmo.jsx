import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';


export default function Cmo () {
  const [tasks, setTasks] = useState([
    { title: 'לסיים את הדוח השבועי', description: 'משימה חשובה למחר' },
    { title: 'לפגוש את הצוות', description: 'ישיבת סטטוס שבועית' },
  ]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    setTasks([...tasks, { title: newTaskTitle, description: newTaskDesc }]);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setShowAddDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">TEAM TASK MANAGER</h1>
        <div>
          <span className="mr-4 font-semibold">שלום, משתמש</span>
          <Button label="התנתק" icon="pi pi-sign-out" className="p-button-sm p-button-danger" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">רשימת משימות</h2>
          <Button label="הוסף משימה" icon="pi pi-plus" onClick={() => setShowAddDialog(true)} />
        </div>

        {/* Task List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, idx) => (
            <Card key={idx} title={task.title} className="shadow">
              <p>{task.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog for adding new task */}
      <Dialog
        header="הוסף משימה חדשה"
        visible={showAddDialog}
        onHide={() => setShowAddDialog(false)}
        style={{ width: '30vw' }}
      >
        <div className="mb-3">
          <label className="block mb-1">כותרת</label>
          <InputText
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">תיאור</label>
          <InputTextarea
  value={newTaskDesc}
  onChange={(e) => setNewTaskDesc(e.target.value)}
  rows={3}
  className="w-full"
/>

        </div>
        <Button label="שמור" icon="pi pi-check" onClick={addTask} />
      </Dialog>
    </div>
  );
};

