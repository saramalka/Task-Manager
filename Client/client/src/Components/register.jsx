import React, { useState ,useEffect} from "react";
import { Dropdown } from 'primereact/dropdown';
import { useGetTeamsQuery } from "../slices/teamApiSlice";
import { useNavigate } from 'react-router-dom';
import {useAddUserMutation,useCheckEmailMutation}from '../slices/userApiSlice'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/authSlice';


export default function SignUpForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('member');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { data, isLoading } = useGetTeamsQuery();
  const [addUser,{isError,error,isSuccess}]=useAddUserMutation()
  const [checkEmail] = useCheckEmailMutation()
  const navigate = useNavigate();
  const dispatch=useDispatch()
  console.log({ data, isLoading });
      
  const teams = data ?? [];

  useEffect(()=>{
    if(isSuccess)
      navigate('/dashboard')
  },[isSuccess])

  const handleEmailBlur = async () => {
    try {
      const res = await checkEmail(email).unwrap();
      console.log('Email available:', res.message);
    } catch (err) {
      alert('Email already exists');
    }
  };

  const handleSubmit = async (e) => {
    console.log('selectedTeam',selectedTeam);
    
    e.preventDefault(); 
    try {
      const res = await addUser({ name: username, password, role, email ,teams:selectedTeam?._id}).unwrap();
      console.log(res);
      
      if (res?.token) {
        dispatch(setToken({ token: res.token, name: res.user.name, role: res.user.role,teams:res.user.teams }));
      }
  
      console.log('register:', res);
    } catch (err) {
      console.log('Register failed:', err);
      alert('Register failed: ' + (err?.data?.message || err?.error || 'Unknown error'));
    }
  }
  


  const handleGoToLogin = () => {
    console.log('handleGoToLogin');
    
    navigate('/login');
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh' }}>
      <Card title="SignUp" style={{ width: '24rem' }}>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText 
              id="username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </div>
          <div className="p-field">
            <label htmlFor="role">Role</label>
            <InputText 
              id="role" 
              value={role} 
              onChange={e => setRole(e.target.value)} 
            />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText 
              id="email"
              type='email' 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              onBlur={handleEmailBlur}
            />
          </div>
          <div className="p-field">
             <label htmlFor="teams">Teams</label>
             {isLoading ? <p>Loading...</p> : (
             <Dropdown value={selectedTeam} onChange={(e) => setSelectedTeam(e.value)} options={teams} optionLabel="name" 
              placeholder="Select a Team" className="w-full md:w-14rem" />)}
            </div>
            <div className="p-field">
            <label htmlFor="password">Password</label>
            <Password 
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button label="Sign Up" icon="pi pi-sign-up" type="submit" className="p-mt-2" />
          <div>existing user?</div>
          <Button label="Log In"  onClick={handleGoToLogin} type="button" className="p-mt-2" />
        </form>
      </Card>
    </div>
  );
}
