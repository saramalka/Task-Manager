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
        navigate('/'); 
    };

    let items = [
        {
            label: 'Profile',
            command: () => navigate('/profile'),
        },
        {
            label: 'Home',
            command: () => navigate('/'),
        },
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
            label: 'My Teams',
            command: () => navigate('/teams'),
        },
        {
            label: 'Users',
            command: () => navigate('/users'),
        },
    ];

    

    if (isUserLoggedIn) {
        if (role === 'admin') {
            items = [...items, ...adminItems]    
        }
        
        items.push({
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: handleLogout,
        });
    } else {
        items=[]
    }

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
}
