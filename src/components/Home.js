import React, { useEffect, useState } from "react";
import DateFilterModal from "../components/DateFilterModal";
import "./Home.css";
import Row from "./Row";
import ReactPaginate from "react-paginate";
import { fetchData } from "../api";
import { AiOutlineCalendar } from "react-icons/ai";
import RingLoader from "react-spinners/RingLoader";
import HomePagePreLoader from "../components/HomePagePreLoader";

const pageSize = 10;
const override = `
  display: block;
  margin: 0 auto;
  border-color: black;
`;
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredLoading, setfilteredLoading] = useState(true);
  const [dateFilterModal, setdateFilterModal] = useState(false);
  const [launchData, setLaunchData] = useState();
  const heading = [
    "No",
    "Launched (UTC)",
    "Location",
    "Mission",
    "Orbit",
    "Launch Status",
    "Rocket",
  ];
  const [pageNumber, setPageNumber] = useState(0);
  const rowsPerPage = 12;
  const pagesVisited = pageNumber * rowsPerPage;
  const [dropDownVlaue, setDropDownVlaue] = useState("All Launches");
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("gray");
  const [dropDownModalSelectedValue, setDropDownModalSelectedVlaue] =
    useState("");
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

  // useEffect(() => {
  //   // console.log("component mounted");
  //   return () => {
  //     setfilteredLoading(true);
  //     // console.log("home unmounted");
  //   };
  // }, []);

  useEffect(() => {
    // const fetchAPI = async ()=>{
    //     setLaunchData(await fetchData());
    //     // setfilteredLaunchData(await fetchData());
    //     setIsLoading(false);
    // }
    // fetchAPI();
    fetchData(dropDownVlaue).then((data) => {
      setPageNumber(0);
      setLaunchData(data);
      setIsLoading(false);
      setfilteredLoading(false);
    });

    return () => {
      // setfilteredLoading(true);
      //   setPageNumber(0);
      //   console.log("home unmounted");
      setfilteredLoading(true);
      // setDropDownVlaue("");
      // setDropDownModalSelectedVlaue("");
      // if (dropDownVlaue === "All Launches") {
      //   setDropDownModalSelectedVlaue("");
      // }
    };
  }, [dropDownVlaue]);

  // console.log(dropDownVlaue);
  //   console.log(launchData);/

  if (isLoading) {
    // return <div>Loading...</div>;
    return (
      // <RingLoader color={color} loading={loading} css={override} size={75} />
      // <h1>Loading...</h1>
      <HomePagePreLoader></HomePagePreLoader>
    );
  }

  // displaying 12 rows per click
  let displayData;
  if (launchData.length === 0) {
    displayData = (
      <div className="noDataDisplay">
        No results found for the specifid filter
      </div>
    );
  } else if (filteredLoading)
    // displayData = <p className="loading">Loading...</p>;
    displayData = (
      <div className="loading">
        <RingLoader color={color} loading={loading} css={override} size={60} />
      </div>
    );
  else {
    displayData = launchData
      .slice(pagesVisited, pagesVisited + rowsPerPage)
      .map((data) => {
        return <Row data={data} />;
      });
    console.log(displayData.length);
    const dataLength = 12 - displayData.length;
    //   console.log(dataLength);
    for (let i = 0; i < dataLength; i++) {
      // console.log(i);
      displayData.push(<Row />);
      // displayData = [...displayData, <Row key={"emptyRow" + i} />];
    }
    //   console.log(displayData.length);
  }

  const pageCount = Math.ceil(launchData.length / rowsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // console.log(dropDownVlaue);
  // data filtering with the help of drop down list
  const handleFilterClick = (e) => {
    if (e.target.value === "All Launches") {
      setDropDownModalSelectedVlaue("");
    }
    setDropDownVlaue(e.target.value);

    // let modifiedData = value && (
    //   <DropdownFilteredData value={value} data={launchData} />
    // );
    // console.log(moMifiedData);

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
  };

  // const testModalFilterData = (value)=>{
  //     console.log(value);
  // }
  return (
    <div className="aap-container">
      <div className="filters">
        <div className="datefilter">
          <button
            onClick={() => {
              setdateFilterModal(true);
            }}
          >
            <AiOutlineCalendar />
          </button>{" "}
          {dropDownModalSelectedValue}
          {dateFilterModal && (
            <DateFilterModal
              dateRange={setDropDownVlaue}
              closeModal={setdateFilterModal}
              uiDisplayValue={setDropDownModalSelectedVlaue}
            />
          )}
        </div>
        <div className="dropdown">
          <select onChange={handleFilterClick}>
            <option selected disabled>
              Select Launch
            </option>
            <option>All Launches</option>
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
              {heading.map((head) => (
                <th>{head}</th>
              ))}
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
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousClassName={"previousBttn"}
          nextClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          forcePage={pageNumber}
        />
      </div>
    </div>
  );
};

export default Home;
