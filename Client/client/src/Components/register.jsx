import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

export default function SignUpForm({ onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');


  const handleSubmit = e => {
    e.preventDefault();
    onLogin({ username, password,email });
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
            <label htmlFor="email">Email</label>
            <InputText 
              id="email"
              type='email' 
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
          <Button label="Sign Up" icon="pi pi-sign-up" type="submit" className="p-mt-2" />
          <div>existing user?</div>
          <Button label="Log In"  type="submit" className="p-mt-2" />
        </form>
      </Card>
    </div>
  );
}
