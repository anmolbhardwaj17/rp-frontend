import {React, useState, useEffect} from 'react';
import '../stylesheets/UserSubs.css';
import {useNavigate, Link} from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import Moment from 'react-moment';
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
            await fetch(`https://rp2022-backend.herokuapp.com/subscription`, requestOptions)
              .then(response => response.json())
              .then(function(data){
                if(data.result.length > 0){
                  if(data.result[0].interval == "month"){
                    data.result[0].expireDate = data.result.timeStamp+2592000000; 
                  }else{
                    data.result[0].expireDate = data.result.timeStamp+31536000000; 
                  }
                  
                  setSubs(data.result)
                }else{
                  openSnackbar('No subscription found')
                }
                
              })
            .catch(error => console.log('error', error));
            }
            fetchSubs()
    }, []);

    async function logout(event){
      localStorage.removeItem('token');
      navigate('/login')
    }

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
        let res = await fetch(`https://rp2022-backend.herokuapp.com/deletesubscription?subId=${subscriptionId}`, requestOptions)
        .then(response => console.log(response.json()))
        .catch(error => console.log('error', error));
        navigate('/')
      }
  return (
    <div className="login-out">
      <div className="out login-out bg">
    <div className="nav-outer">
        <div><h3>Rich Panel</h3></div>
        <div ><Link className="subspage" to="/">All subscriptions</Link><a className="logout" onClick={event => logout(event)}>logout</a></div>
    </div>
        <div className="outer">
            <div className="inner">
            <div className="allCards">
        {subs.map(sub => {
      return (
        <div className="outerCard">
        <div className="">
          <div className="flex space">
            <div className="flex">
            <p>Current Plan Details</p>
            <p className="active">Active</p>
            </div>
            <div>
            <a className="cancel" onClick={event => cancelPlan(event,sub.subscriptionId)}>Cancel</a>
            </div>
          </div>
          <div className="plan">
            <p>{sub.name}</p>
            <div className='flex'>
            <h2>₹&nbsp;{sub.totalAmount/100}</h2>
            <span>/{sub.interval}</span>
            </div>
            <div className="button-padding">
            <button className="outline-btn">Change plan</button>
            </div>
            <div className="more-info">
              <p >Your subscription has started on <Moment format="YYYY/MM/DD" date={sub.timeStamp} /> and will auto renew on <Moment format="YYYY/MM/DD" date={sub.interval == "month" ? sub.timeStamp+2592000000 : sub.timeStamp+31536000000} />.</p>
            </div>
          </div>
          </div>
        </div>
      )
    })}
    </div>
                </div>
            </div>
    </div>
    </div>
    
    
  )
}

export default UserSubscription