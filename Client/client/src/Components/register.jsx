import React, { useEffect } from 'react';
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
  const [addUser,{isError,error,isSuccess}]=useAddUserMutation()
  const [checkEmail] = useCheckEmailMutation()
  const navigate = useNavigate();
  const dispatch=useDispatch()

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
    e.preventDefault(); 
    try {
      const res = await addUser({ name: username, password, role, email }).unwrap();
  
      if (res?.token) {
        dispatch(setToken({ token: res.token, name: res.name, role: res.role }));
      }
  
      console.log('register:', res);
    } catch (err) {
      console.error('Register failed:', JSON.stringify(err, null, 2));
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
