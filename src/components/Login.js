import {React, useState, useEffect} from 'react';
import '../stylesheets/Login.css';
import {useNavigate, Link} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/');
        }
    }, []);

    const handleEmailChange =(e)=>{
        setEmail(e.target.value);
    }
    const handlePasswordChange =(e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(!email || !password){
            console.error("error")
        }
        let loginData = {
            "email": email,
            "password": password
        }
        var myHeaders = new Headers();
        //myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify(loginData)
          };
          let res = await fetch(`http://localhost:5000/login`, requestOptions)
          .then(response => response.json())
        .catch(error => console.log('error', error));
        localStorage.setItem('token', res.token);
        navigate('/')

         
      }
  return (
    <div className="outer">
            <div className="inner">
                <div className="inner-padding">
                <h2 className="heading">Login</h2>
                <form onSubmit={(e) => {handleSubmit(e)}}>
                <div className="input">
                    <label htmlFor='email'>Email</label><br/><br/>
                    <input type="email" value={email} name="email" onChange={(e) => {handleEmailChange(e)}}/>
                </div>
                <div className="input">
                    <label htmlFor='password'>Password</label><br/><br/>
                    <input type="password" value={password} name="password" onChange={(e) => {handlePasswordChange(e)}}/>   
                </div>
                <div className="btn">
                <input type="submit" value="Login"/>
                </div>
                </form>
                <div className='route'>
                    <span>New user? <Link className="anchor" to="/register">Register</Link></span>
                </div>
                </div>
            </div>
    </div>
  )
}

export default Login