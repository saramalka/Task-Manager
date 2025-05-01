
import React from 'react'; 
import { Menubar } from 'primereact/menubar';
//import { useRouter } from 'next/router';

export default function Menu() {
    //const router = useRouter();
    const items = [
        {
            label: 'Profile',
            url: '/profile'
            
        },
        {
            label: 'Dashboard',
            url: '/dashboard'
            
        },
        {
            label: 'Register',
           
           url:'/register'
        },
        {
            label: 'My Teams',
            url:'/teams'
        }
        ,
        {
            label: 'Team Tasks',
            url:'/teams/:teamId/tasks'
        },
        {
            label: 'Task Details',
            url:'/tasks/:taskId'
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}
        