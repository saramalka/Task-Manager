import React, { useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import {useLoginUserMutation}from '../slices/userApiSlice'
import { useNavigate } from 'react-router-dom';
import 'primeflex/primeflex.css';

export default function LoginForm() {
  const navigate = useNavigate();
  const [onLogin,{isSuccess,data,isError,error}]=useLoginUserMutation()
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

    useEffect(()=>{
      if(isSuccess){
        console.log(data);
        
        navigate('/dashboard')
      }
      if(isError){
        console.log(error);
        
      }
    },[isSuccess,isError])

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   console.log('handleSubmit login');
  //   console.log('email:', email, 'password:', password);

   
  //   try{
  //   const res=await onLogin({ email, password }).unwrap()
  //   console.log(`user login ${res}`);
  //   navigate('/dashboard')
    
  // }catch(err){
  //   console.error('Login failed:', err?.data?.message || err);
  //   alert('Login failed: ' + (err?.data?.message || 'Unknown error'));
    
  // }
  // };
  const handleSubmit = async (e) => {
    console.log('handleSubmit login');
    e.preventDefault();
  
    try {
      console.log('before login call');
      const res = await onLogin({ email, password }).unwrap();
      console.log('after login call');
      console.log('user login', res);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err?.data?.message || err);
      alert('Login failed: ' + (err?.data?.message || 'Unknown error'));
    }
  };
  
  return (
    <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh' }}>
      <Card title="Login" style={{ width: '24rem' }}>
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
          <Button label="Log In" icon="pi pi-sign-in" type="submit" className="p-mt-2" />
        </form>
      </Card>
    </div>
  );
}
