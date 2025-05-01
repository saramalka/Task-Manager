import { jwtDecode } from 'jwt-decode';


const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
        const decoded = jwtDecode(token);
        console.log(`decoded.id ${decoded.id}`);
        
        return decoded.id;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
  return null;
};

export default getUserIdFromToken;
  
  