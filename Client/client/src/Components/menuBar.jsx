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
        {
            label: 'My Tasks',
            command: () => navigate('/tasks'),
        }
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
            items = [...items, ...adminItems]    
        }else
        items = [ ...items,...guestItems]
        items.push({
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: handleLogout,
        });
    } else {
        items = [ ...guestItems];
    }

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
}
