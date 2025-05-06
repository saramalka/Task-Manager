import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {useLoginUserMutation}from '../slices/userApiSlice'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/authSlice';
import '../SignUpForm.css'


export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [onLogin,{isLoading}]=useLoginUserMutation()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = useState(false);


  //    if(isSuccess)
  //      navigate('/dashboard')
  //  },[isSuccess])
 
  //  const handleEmailBlur = async () => {
  //    try {
  //      const res = await checkEmail(email).unwrap();
  //      console.log('Email available:', res.message);
  //    } catch (err) {
  //      alert('Email already exists');
  //    }
  //  };
 
  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = await onLogin({email, password }).unwrap();
      
          console.log('User login success:', data);
          if (data?.token) {
            dispatch(setToken({ token: data.token, name: data.user.name ,role:data.user.role,teams:data.teams}))
  
            navigate('/dashboard');
          } else {
            throw new Error('Token missing from response');
          }
        } catch (err) {
          console.error('Login failed:', err?.data?.message || err.message || err);
          alert('Login failed: ' + (err?.data?.message || err.message || 'Unknown error'));
        }
      };

   return (
         <div className="signup-page"> 
    <div className="signup-card"> 
   <Card>
     {isLoading ? (
         <h1>Loading</h1>
       ) : (
         <form onSubmit={handleSubmit} className="p-fluid flex flex-column gap-3">
           <div className="p-field">
             <label htmlFor="email">Email</label>
             <InputText 
               id="email" 
               value={email} 
               onChange={e => setEmail(e.target.value)} 
             />
           </div>
           <div className="p-field">
             <label htmlFor="password">Password</label>
             <Password 
               id="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               toggleMask
              feedback={false}
             />
           </div> 
           <div className="flex gap-2 mt-3">
             <Button type="submit" label="Sign In" className="w-full" />
             <Button type="button" label="Cancel" className="w-full" severity="secondary" onClick={() => setVisible(false)} />
           </div>
         </form>
       )}
       </Card>
       </div>
       
      </div> 
   );
 }
 