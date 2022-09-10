import {React, useState, useEffect} from 'react';
import '../stylesheets/Home.css';
import {useNavigate} from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

function Home() {
const navigate = useNavigate();
const [openSnackbar, closeSnackbar] = useSnackbar()
  const [state, setState] = useState(0);
  const [subs, setSubs] = useState([]);
let results = [];
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
        await fetch(`http://localhost:5000/allprices`, requestOptions)
          .then(response => response.json())
          .then(function(data){
            setSubs(data.result)
          })
        .catch(error => console.log('error', error));
        }
        fetchSubs()

}, []);

  async function buyPlan(event, price, product){
  const token = localStorage.getItem('token');
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    let res = await fetch(`http://localhost:5000/session?price=${price}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
    console.log(res);
    if(res.status == 409){
      openSnackbar('You already have a subscription')
    }
    if(res.session.url){
      window.location.replace(res.session.url);
    }
  }

    return (
      
<div className="out">
<div className="nav-outer">
        <div><h3>Rich Panel</h3></div>
        <div><Link to="/allsubs">My subscriptions</Link></div>
    </div>
    <div className="page-info">
      <h1>All Plans available</h1>
      <p>Find all the plans we provide</p>
    </div>
    <div className="allCards">
    {subs.map(sub => {
      return (
        <div className="outerCard ">
          <div className="card card border-gradient border-gradient-green">
          <div className="main-text">
            <p>{sub.name}</p>
            <div className="amount">
            <h2>₹&nbsp;{sub.amount/100}</h2>
            <span>/{sub.recurring}</span>
            </div>
            
          </div>
            <div className="text">
            <button onClick={event => buyPlan(event, sub.priceId, sub.product)}>Buy now</button>
            </div>
          </div>
        </div>
      )
    })}
    </div>
</div>
            
            
    )
}

export default Home