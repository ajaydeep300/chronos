import React from 'react';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs'
import {startOfWeek, endOfWeek} from 'date-fns'

function ViewDataSelf() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      name: "Date",
      selector: (row) => row.Date
    },
    {
      name: "Hours",
      selector: (row) => row.Hours
    }
  ];

  async function fetchTableData(beginWeek, endWeek) {
    setLoading(true);
    const url = 'http://127.0.0.1:8000/api/accounts/hoursWorked?from_date=' + beginWeek + '&to_date=' + endWeek
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept':'application/json', 'Authorization' : 'token ' + localStorage.getItem('token')
      }})
      .then(response => response.text())
    const jsonData = JSON.parse(response)
    setData(jsonData.Response);
    setLoading(false);
  }

  const onChange = date => {
    console.log(date)
    console.log(dayjs(date).format('YYYY-MM-DD'))
    const beginWeek = dayjs(startOfWeek(date)).format('YYYY-MM-DD')
    const endWeek = dayjs(endOfWeek(date)).format('YYYY-MM-DD')
    console.log(beginWeek)
    console.log(endWeek)
    fetchTableData(beginWeek, endWeek)
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div style={{ backgroundColor: '#D9D9D9', height: '100vh', fontFamily: 'Barlow', display: 'grid', placeItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <img src={require("./images/logo.png")} alt="Logos" style={{ height: '50px' }} />
        <div style={{ marginRight: '1700px', fontSize: '40px', fontWeight: 'ExtraBold', color: '#000000' }}>CHRONOS</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
        <div style={{ fontSize: '40px', marginBottom: '00px', color: 'black', textAlign: 'center' }}>View Hours</div>
        <Calendar 
          calendarType="US"
          onChange={onChange} 
          value={date}
        />
      </div>
      <div style={{marginBottom: '400px', maxWidth: 'calc(100vh - 100px)', width: '100%' }}>
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          striped = {true}
        />
      </div>
    </div>
  );
}

export default ViewDataSelf;

