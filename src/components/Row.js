import React from 'react'
import './Home.css'
import './Rows.css'

const Row = ({data}) => {
    //  console.log(data);
    const [orbit]=(data.rocket.second_stage.payloads)
    let launch = data.launch_date_local;
    // 2006-03-25T10:30:00+12:00
    let year = launch.substring(0,4);
    let month = Number(launch.substring(5,7)) -1;
    // console.log(data.flight_number)
    // console.log(orbit.orbit);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    month = months[month];
    let date = launch.substring(8,10);
    let time = launch.substring(11,16);


    return (
    <>
    <tr>
        <td>{data.flight_number}</td>
        <td>{`${date} ${month} ${year} at ${time}`}</td>
        <td>{data.launch_site.site_name}</td>
        <td>{data.mission_name}</td>
        <td>{orbit.orbit}</td>
        <td  >
            {data.launch_success === true  ? <span className={data.launch_success === true ? "success":''}>Success</span> : data.launch_success === false  ? <span className={data.launch_success === false ? "failed":''}>Failed</span> : <span className={data.launch_success === null ? "upcoming":''}>Upcoming</span>}</td>
        <td>{data.rocket.rocket_name}</td>
    </tr>
    </>
    )
}

export default Row
