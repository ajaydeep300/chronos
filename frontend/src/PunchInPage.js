import React, {useState, useEffect} from 'react';
import DateTime from './components/DateTime';

   
function PunchInPage(){
  const [showClockInClockOut, setShowClockInClockOut] = useState(false)
  const [isChecked, setIsChecked] = useState()
  const [timeOnSubmit, setTimeOnSubmit] = useState()
  const [isPunchedIn, setIsPunchedIn] = useState(false)
  const [hasCalledAPI, setHasCalledAPI] = useState(false)

  var [date, setDate] = useState(new Date());

  async function getPunchIn() {
    const response = await fetch('http://127.0.0.1:8000/api/accounts/punch-in-time', {
      method: 'GET',
      headers: {
        'accept':'application/json', 'Authorization' : 'token ' + localStorage.getItem('token')
      }})
      .then(response => response.text())

      return JSON.parse(response)
  }

  function stringManip(string) {
    let hours = string.slice(0,2)
    let theRest = string.substring(2, string.length-7)
    let millis = string.slice(-7)
    console.log(hours)
    hours = parseInt(hours) - 4
    console.log(hours)
    if (hours > 12) {
      return hours%12 + theRest + " PM"
    }
    else if (hours == 12) {
      return hours + theRest + " PM"
    }
    else {
      return hours + theRest + " AM"
    }
  }


  useEffect(() => {
    async function fetchData() {
        const response = await getPunchIn();
        console.log(response.Response["start time"])
        if (response.Response["start time"] != null) {
          const a = stringManip(response.Response["start time"])
          console.log(a)
          setTimeOnSubmit(a)
          setIsPunchedIn(true)  
          setShowClockInClockOut(true)
          document.getElementById("1403317").checked = true;
      }
    }
    if (!hasCalledAPI) {
      fetchData();
      setHasCalledAPI(true);
    }
    
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [timeOnSubmit]);

  const handleSubmit = async e => {
   
    e.preventDefault();
    setTimeOnSubmit(date.toLocaleTimeString())
    setIsPunchedIn(e.target[0].checked)
    setShowClockInClockOut(true)
    console.log(isChecked)
    console.log(timeOnSubmit)

    fetch('http://127.0.0.1:8000/api/accounts/punch', {
    method: 'POST',
    headers: {'accept': 'application/json', 'Authorization' : "token " + localStorage.getItem('token')}}).then(response => response.text()).then(data => console.log(data))

    //const test = await fetch('http://127.0.0.1:8000/api/accounts/punch-in-time', {headers: {'accept': 'application/json', 'Authorization' : "token " + localStorage.getItem('token')}}).then(response => response.text()).then((body) => console.log(body))
    //console.log(test)

  }

    return  (
        <div style={{ backgroundColor: '#D9D9D9', height: '100vh', fontFamily: 'Barlow' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 300px)' }}> 
          <div style={{fontSize: '60px', fontWeight: 'ExtraBold', color: '#ff5e8e' }}>{date.toLocaleDateString("en-US")}</div>
          <div style={{lineHeight: "0.7", fontSize: '100px', fontWeight: 'ExtraBold', color: '#ff5e8e' }}>{date.toLocaleTimeString()}</div>
          <div style={{lineHeight: "2.5", fontSize: '35px', marginBottom: '40px', color: 'gray', textAlign: 'center' }}>click on box below to punch in</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 100px)'}}>
                <input type="checkbox" id="1403317" style={{ width: '200px', height: '200px' }} />
            </div>
            <button type="submit" style={{ padding: '15px', borderRadius: '5px', backgroundColor: 'green', color: 'white', border: 'none', width: '20%', fontSize: '24px', padding: '10px 20px'}}>Submit</button> &nbsp;&nbsp;&nbsp;
            {showClockInClockOut && isPunchedIn && <p style={{ color: 'green', fontSize: '50px'}}>You clocked in at {timeOnSubmit}</p>}
            {showClockInClockOut && !isPunchedIn && <p style={{ color: 'green', fontSize: '50px' }}>You clocked out at {timeOnSubmit}</p>}
        </form>
      </div>
    );
}
export default PunchInPage;
//space-between
//calc(100vh - 100px)
//pink: #ff5e8e
// <button type="button" style={{ padding: '15px', borderRadius: '5px', backgroundColor: 'blue', color: '#ff5e8e', border: 'none', width: '50%', fontSize: '24px' }}> Enter Timesheet</button>