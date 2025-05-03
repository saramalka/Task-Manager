import React , { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import {useLoginUserMutation}from '../slices/userApiSlice'
import { useNavigate } from 'react-router-dom';
import { setToken } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import 'primeflex/primeflex.css';
import { useGetTeamsQuery } from '../slices/teamApiSlice';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [onLogin,{isLoading}]=useLoginUserMutation()
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const {data}= useGetTeamsQuery()
  const teams = data||[]
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
    
    <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh' }}>
      {isLoading ? <h1>Loading</h1>:
      <Card title="Login" style={{ width: '24rem' }}>
        <form onSubmit={handleSubmit} className="p-fluid">
          {/* <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText 
              id="username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </div> */}
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
            />
          </div>
          <div className="p-field">
            <label htmlFor="team">Log in for team</label>
            <Dropdown value={selectedTeam} onChange={(e) => setSelectedTeam(e.value)} options={teams} optionLabel="name" 
                placeholder="Select a Team" className="w-full md:w-14rem" />
          </div>
          <Button label="Log In" icon="pi pi-sign-in" type="submit" className="p-mt-2" />
        </form>
      </Card>}
    </div>
  );
}
