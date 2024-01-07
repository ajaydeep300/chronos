import React, {useState} from 'react';
import PropTypes from 'prop-types';

//import './LoginPage.css';

async function loginUser(credentials) {
  return fetch('http://127.0.0.1:8000/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    
}

async function getUserInfo() {
  return fetch('http://127.0.0.1:8000/api/accounts/me', {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization' : "token " + localStorage.getItem('token')
  }})
  .then(response => response.text())

}

async function getEmployees() {
  return fetch('http://127.0.0.1:8000/api/accounts/manager/employees', {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization' : "token " + localStorage.getItem('token')
  }})
  .then(response => response.text())
}

function LoginPage({setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    const message = await loginUser({
      email: e.target[0].value,
      password: e.target[1].value
    });
    console.log(message)
    if (message.status == true) {
      console.log(message.token)
      localStorage.setItem('token', message.token)
      const response = await getUserInfo()
      const userinfo = JSON.parse(response)
      localStorage.setItem('first_name',userinfo.Response.first_name)
      const employees = await getEmployees()
      console.log(JSON.parse(employees).Response)
      if (JSON.parse(employees).Response.length == 0) {
        localStorage.setItem('isManager', 'false')
      }
      else {
        localStorage.setItem('isManager', 'true')
      }
      window.location.href='/landing'
    }
    else
      setLoginError(true)

  }
  
  return (
    <div style={{ backgroundColor: '#D9D9D9', height: '100vh', fontFamily: 'Barlow' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <img src={require("./images/logo.png")} alt="Logos" style={{ height: '100px' }} />
        <div style={{ marginRight: '1700px', fontSize: '65px', fontWeight: 'ExtraBold', color: '#000000' }}>CHRONOS</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 100px)' }}>
        <div style={{ fontSize: '48px', marginBottom: '30px', color: '#ff5e8e', textAlign: 'center' }}>LOGIN</div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <input type="email" value={email} placeholder="Email" style={{ padding: '15px', borderRadius: '5px', border: 'none', marginBottom: '20px', width: '100%', maxWidth: '400px', fontSize: '24px' }} />
          <input type="password" value={password} placeholder="Password" style={{ padding: '15px', borderRadius: '5px', border: 'none', marginBottom: '20px', width: '100%', maxWidth: '400px', fontSize: '24px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
            <button type="submit" style={{ padding: '15px', borderRadius: '5px', backgroundColor: 'green', color: 'white', border: 'none', width: '50%', fontSize: '24px' }}>Login</button>
            <button type="button" style={{ padding: '15px', borderRadius: '5px', backgroundColor: '#D9D9D9', color: '#ff5e8e', border: 'none', width: '50%', fontSize: '24px' }}>Reset Password</button>
          </div>
          {loginError && <p style={{ color: 'red' }}>Unable to login with provided credentials</p>}
        </form>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}
export default LoginPage;