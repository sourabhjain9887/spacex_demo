import React, {useEffect, useState} from 'react'
import  './Home.css';
import Row from './Row';
import ReactPaginate from 'react-paginate';
import { fetchData } from '../api';


const pageSize=10;
const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [launchData, setLaunchData] = useState();
    const heading = ['No','Launched (UTC)','Location','Mission','Orbit','Launch Status','Rocket'];
    const [pageNumber, setPageNumber]   = useState(0);
    const rowsPerPage  = 12;
    const pagesVisited  = pageNumber * rowsPerPage;
    const [dropDownVlaue, setDropDownVlaue]=useState('All Launches');

    // useEffect(() => {
    //     (async () => {
    //         await axios('https://api.spacexdata.com/v3/launches')
    //         .then(res => {
    //             setLaunchData(res.data);
    //             console.log(typeof(launchData));
    //             setfilteredLaunchData(res.data);
    //             setIsLoading(false);
    //             //  console.log(res.data);
    //             // console.log(launchData.length)
    //         })
    //         .then(err => {
    //             console.log(err);
    //         })
    //     })();
    //   }, []);

      useEffect(()=>{
        // const fetchAPI = async ()=>{
        //     setLaunchData(await fetchData());
        //     // setfilteredLaunchData(await fetchData());
        //     setIsLoading(false);
        // }
        // fetchAPI();
        const modifiedData = async ()=>{
            setLaunchData(await fetchData(dropDownVlaue));
            setIsLoading(false);
        }
        modifiedData();

       
    },[dropDownVlaue]);

    // console.log(dropDownVlaue);
    // console.log(launchData);
    
    if (isLoading){
        return(
            <div>Loading...</div>
        )
    }

    // displaying 12 rows per click
    let displayData  = launchData && launchData.slice(pagesVisited, pagesVisited+rowsPerPage).map((data) => (
        <Row data={data}/>
    ))

    const pageCount  = Math.ceil(launchData.length / rowsPerPage);

    const changePage = ({selected})=>{
        setPageNumber(selected);
    }

    // searching with the help of drop down list
    const handleFilterClick = (e)=>{
        setDropDownVlaue(e.target.value);

        // console.log(e.target.value);
        // const value = e.target.value;
        // console.log(value);
        // let aux = JSON.parse(JSON.stringify(filteredLaunchData));
        // let aux = filteredLaunchData.map((data) => (
        //     <filterData data ={data} />
        //  ));
        // let aux = filteredLaunchData.filter(person => person.launch_success === false && value === 'Failed Launches').map(filteredPerson => (
        //      <> {filteredPerson}</>
        //   ))
        // const aux1 = <filterData aux ={aux} />
        // console.log(typeof(aux));
        // console.log(aux);
        // displayData= launchData.slice(pagesVisited, pagesVisited+rowsPerPage).map((data) => (
        //     <Row data={data} />
        // ))
    }

    return (
        <div className = "aap-container">
            <div className='filters'>
                <div></div>
                <div className='dropdown'>
                    <select onChange={handleFilterClick}>
                        <option selected>All Launches</option>
                        <option>Upcoming Launches</option>
                        <option>Sccessful Launches</option>
                        <option>Failed Launches</option>
                    </select>
                </div>
            </div>
            <div className="data_table">
            <table>
                <thead>
                    <tr>
                        {heading.map(head => <th>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        displayData
                        // launchData && launchData.map((data) => (
                        //     <Row data={data}/>
                        // ))
                    }
                </tbody>
            </table>  
                <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={pageCount}
                onPageChange = {changePage}
                containerClassName={'paginationBttns'}
                previousClassName={'previousBttn'}
                nextClassName={'nextBttn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
                />
            </div>
        </div>
    )
}

export default Home
