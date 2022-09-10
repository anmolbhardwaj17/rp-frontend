import {React, useState, useEffect} from 'react';
import '../stylesheets/Login.css';
import {useNavigate, Link} from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
function UserSubscription() {
    const navigate = useNavigate();
    const [subs, setSubs] = useState([]);
    const [openSnackbar, closeSnackbar] = useSnackbar()
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
        const token = localStorage.getItem('token');
            async function fetchSubs(){
                var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
              };
            await fetch(`http://localhost:5000/subscription`, requestOptions)
              .then(response => response.json())
              .then(function(data){
                if(data.result.length > 0){
                  setSubs(data.result)
                }else{
                  openSnackbar('No subscription found')
                }
                
              })
            .catch(error => console.log('error', error));
            }
            fetchSubs()
    }, []);

    async function cancelPlan(event, subscriptionId){
      const token = localStorage.getItem('token');
      var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        let res = await fetch(`http://localhost:5000/deletesubscription?subId=${subscriptionId}`, requestOptions)
        .then(response => console.log(response.json()))
        .catch(error => console.log('error', error));
        navigate('/')
      }
  return (
    <div className='out'>
      <div className="nav-outer">
        <div><h3>Rich Panel</h3></div>
        <div><Link to="/">All subscriptions</Link></div>
    </div>
    <div className="page-info">
      <h1>Your subscriptions</h1>
      <p>See that plan you chose</p>
    </div>
    <div className="allCards">
        {subs.map(sub => {
      return (
        <div className="outerCard">
          <div className="card border-gradient border-gradient-green">
          <div className="main-text">
            <div className="cancelSub">
            <p>{sub.name}</p>
            
            <a id="success" className="" href="">{sub.paymentStatus}</a>
            </div>
            <div className="amount">
            <h2>₹&nbsp;{sub.totalAmount/100}</h2>
            <span>/{sub.interval}</span>
            </div>
            <div className="subStatus">
            <a onClick={event => cancelPlan(event,sub.subscriptionId)} id="cancel">Cancel</a>
            </div>
          </div>

          </div>
        </div>
      )
    })}
    </div>
    </div>
    
  )
}

export default UserSubscription