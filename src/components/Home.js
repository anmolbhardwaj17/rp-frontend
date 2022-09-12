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
        await fetch(`https://rp2022-backend.herokuapp.com/allprices`, requestOptions)
          .then(response => response.json())
          .then(function(data){
            setSubs(data.result)
          })
        .catch(error => console.log('error', error));
        }
        fetchSubs()

}, []);

async function logout(event){
  localStorage.removeItem('token');
  navigate('/login')
}

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
    let res = await fetch(`https://rp2022-backend.herokuapp.com/session?price=${price}`, requestOptions)
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
        <div className="homepage"><h3>Rich Panel</h3></div>
        <div><Link  to="/allsubs">My subscriptions</Link><a className="logout" onClick={event => logout(event)}>logout</a></div>
    </div>
    <div className="page-info">
      <h2>Choose the right plan for you</h2>
    </div>
    <div className="all">
      <div className="allLabels plans">
        <div className="big">Plans</div>
        <div className="small"><p>Video quality</p></div>
        <div className="small"><p>Resolution</p></div>
        <div className="small pp"><p>Monthly price</p></div>
        <div className="small pp"><p>Yearly price</p></div>
        <div className="big"><p>No. of devices</p></div>
      </div>
      <div className="plans">
        <div className="big">Basic</div>
        <div className="small"><p>Good</p></div>
        <div className="small"><p>480p</p></div>
        <div className="small"><button onClick={event => buyPlan(event, 'price_1LelkGSDg3jfkNpBmOrvOeAk', 'prod_MNWn0TW4GaNxvt')}>100 INR</button></div>
        <div className="small"><button onClick={event => buyPlan(event, 'price_1LelkGSDg3jfkNpBp5itV4W4', 'prod_MNWn0TW4GaNxvt')}>1000 INR</button></div>
        <div className="big"><p>1</p></div>
      </div>
      <div className="plans">
        <div className="big">Standard</div>
        <div className="small"><p>Good</p></div>
        <div className="small"><p>720p</p></div>
        <div className="small"><button onClick={event => buyPlan(event, 'price_1LelmJSDg3jfkNpBzIFpQUaR', 'prod_MNWpSpTtfTGFrz')}>200 INR</button></div>
        <div className="small"><button onClick={event => buyPlan(event, 'price_1LelmJSDg3jfkNpBdkp6Hu61', 'prod_MNWpSpTtfTGFrz')}>2000 INR</button></div>
        <div className="big"><p>3</p></div>
      </div>
      <div className="plans">
        <div className="big">Premium</div>
        <div className="small"><p>Better</p></div>
        <div className="small"><p>1080p</p></div>
        <div className="small"><button onClick={event => buyPlan(event, 'price_1LelnkSDg3jfkNpBIcXwRR80', 'prod_MNWrlzYfpfqdNx')}>500 INR</button></div>
        <div className="small"><button onClick={event => buyPlan(event, 'price_1LelnkSDg3jfkNpBdGbxqEgd', 'prod_MNWrlzYfpfqdNx')}>5000 INR</button></div>
        <div className="big"><p>5</p></div>
      </div>
      <div className="plans">
        <div className="big">Regular</div>
        <div className="small"><p>Best</p></div>
        <div className="small"><p>480p</p></div>
        <div className="small"><button onClick={event => buyPlan(event, 'price_1LelopSDg3jfkNpBw6p7ksmD', 'prod_MNWsH96UYK3d4G')}>700 INR</button></div>
        <div className="small"><button onClick={event => buyPlan(event, 'price_1LelopSDg3jfkNpB5c5Lkd2g', 'prod_MNWsH96UYK3d4G')}>7000 INR</button></div>
        <div className="big"><p>10</p></div>
      </div>
    </div>
    {/* <div className="allCards">
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
    </div> */}
</div>
            
            
    )
}

export default Home