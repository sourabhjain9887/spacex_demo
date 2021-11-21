import React, {useEffect, useState} from 'react'
import axios from 'axios'
import  './Home.css';
import Row from './Row'

const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [launchData, setLaunchData] = useState([])

    useEffect(() => {
        (async () => {
            await axios('https://api.spacexdata.com/v3/launches')
            .then(res => {
                setLaunchData(res.data);
                setIsLoading(false);
                // console.log(res.data);
            })
            .then(err => {
                console.log(err);
            })
        })();
      }, []);

    if (isLoading){
        return(
            <div>Loading...</div>
        )
    }
    return (
        <div className = "aap-container">
            <div className="data_table">
                <table>
                <thead>
                    <tr>
                        <thead>No</thead>
                        <thead>Launched (UTC)</thead>
                        <thead>Location</thead>
                        <thead>Mission</thead>
                        <thead>Orbit</thead>
                        <thead>Launch Status</thead>
                        <thead>Rocket</thead>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log(launchData)} */}
                    
                    {
                        launchData && launchData.map((data) => (
                            <Row data={data}/>
                        ))
                    }

                </tbody>
            </table>  
            </div>       
        </div>
    )
}

export default Home
