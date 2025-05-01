
import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Menu() {
    const navigate=useNavigate()
    const isUserLoggedIn=useSelector((state)=>state.auth.isUserLoggedIn)
    
    const commonItems = [
        {
            label: 'Dashboard',
            command: () => navigate('/dashboard'),
        },
    ];
    const loggedInItems = [
        {
            label: 'Profile',
            command: () => navigate('/profile'),
        },
        {
            label: 'My Teams',
            command: () => navigate('/teams'),
        },
        {
            label: 'Team Tasks',
            command: () => navigate('/teams/123/tasks'), // אפשר לשים דינאמי לפי הצורך
        },
        {
            label: 'Task Details',
            command: () => navigate('/api/tasks/456'),
        },
    ];

    const guestItems = [
        {
            label: 'Register',
            command: () => navigate('/register'),
        },
    ];

    const items = [
        ...commonItems,
        ...(isUserLoggedIn ? loggedInItems : guestItems),
    ];
    // const items = [
    //     {
    //         label: 'Profile',
    //         url: '/profile'
            
    //     },
    //     {
    //         label: 'Dashboard',
    //         url: '/dashboard'
            
    //     },
    //     {
    //         label: 'Register',
           
    //        url:'/register'
    //     },
    //     {
    //         label: 'My Teams',
    //         url:'/teams'
    //     }
    //     ,
    //     {
    //         label: 'Team Tasks',
    //         url:'/teams/:teamId/tasks'
    //     },
    //     {
    //         label: 'Task Details',
    //         url:'/tasks/:taskId'
    //     }
    // ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}
        