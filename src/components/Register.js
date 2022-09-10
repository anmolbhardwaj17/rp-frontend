import {React, useState, useEffect} from 'react';
import '../stylesheets/Login.css';
import {useNavigate, Link} from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/');
        }
    }, []);

    const handleNameChange =(e)=>{
        setName(e.target.value);
    }
    const handleEmailChange =(e)=>{
        setEmail(e.target.value);
    }
    const handlePasswordChange =(e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit= async (e)=>{
        e.preventDefault(); 
        if(!email || !password || !name){
            console.error("error")
        }
        let registerData = {
            "username":name,
            "email": email,
            "password": password
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify(registerData)
          };
          let res = await fetch(`http://localhost:5000/register`, requestOptions)
          .then(response => response.json())
        .catch(error => console.log('error', error));
        localStorage.setItem('token', res.user.token);
        navigate('/')
        
      }
  return (
    <div className="outer">
            <div className="inner">
                <div className="inner-padding">
                <h2 className="heading">Register</h2>
                <form onSubmit={(e) => {handleSubmit(e)}}>
                <div className="input">
                    <label htmlFor='name'>Name</label><br/><br/>
                    <input type="text" value={name} required name="name" onChange={(e) => {handleNameChange(e)}}/>
                </div>
                <div className="input">
                    <label htmlFor='email'>Email</label><br/><br/>
                    <input type="email" value={email} required name="email" onChange={(e) => {handleEmailChange(e)}}/>
                </div>
                <div className="input">
                    <label htmlFor='password'>Password</label><br/><br/>
                    <input type="password" value={password} required name="password" onChange={(e) => {handlePasswordChange(e)}}/>   
                </div>
                <div className="btn">
                <input type="submit" value="Register"/>
                </div>
                </form>
                <div className='route'>
                    <span>Already have an account? <Link className="anchor" to="/login">Login</Link></span>
                </div>
                </div>
            </div>
    </div>
  )
}

export default Register