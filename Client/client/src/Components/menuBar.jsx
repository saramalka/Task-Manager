import { useDispatch } from 'react-redux';
import { removeToken } from '../slices/authSlice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Menubar } from 'primereact/menubar';

export default function Menu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const handleLogout = () => {
        dispatch(removeToken());
        navigate('/dashboard'); 
    };

    const commonItems = [
        {
            label: 'Dashboard',
            command: () => navigate('/dashboard'),
        },
    ];

    const adminItems = [
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
            command: () => navigate('/teams/123/tasks'),
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

    let items = [...commonItems];

    if (isUserLoggedIn) {
        if (role === 'admin') {
            items = [...items, ...adminItems];
        }
        items.push({
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: handleLogout,
        });
    } else {
        items = [...items, ...guestItems];
    }

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
}
