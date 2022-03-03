import axios from "axios";
// import React, { useState } from "react";

const url = "https://api.spacexdata.com/v3/launches";
let datePickarModalData = "";
let datePickarMOdalValue = 0;

export const fetchData = async (dropDownVlaue) => {
  // const [filteredLaunchData, setfilteredLaunchData] = useState("");
  // const [finalModifiedData, setFinalModifiedData] =useState('');
  // const [allLaunchesFilter, setAllLaunchesFilter]  = useState(false);

  if (dropDownVlaue === "All Launches") {
    try {
      const { data } = await axios.get(`${url}`);
      // console.log(data);
      let modData = data.map((value, index) => {
        return { ...value, flight_number: index + 1 };
      });
      console.log(modData);
      // setfilteredLaunchData(modData);
      // setAllLaunchesFilter(true);
      // console.log("mod data", modData);
      // console.log(filteredLaunchData);
      datePickarMOdalValue = 0;
      return modData;
      // setFinalModifiedData(modData);
    } catch (error) {
      console.log(error);
    }
  } else if (
    datePickarMOdalValue === 0 &&
    (dropDownVlaue === "Failed Launches" ||
      dropDownVlaue === "Upcoming Launches" ||
      dropDownVlaue === "Sccessful Launches")
  ) {
    try {
      const { data } = await axios.get(`${url}`);
      // console.log(data);
      if (dropDownVlaue === "Failed Launches") {
        let filteredData = data.filter(
          (person) =>
            person.launch_success === false &&
            dropDownVlaue === "Failed Launches"
        );
        //  console.log(filteredData);
        // return filteredData;
        let modData = filteredData.map((value, index) => {
          return { ...value, flight_number: index + 1 };
        });
        // console.log(modData);
        return modData;
        // setFinalModifiedData(modData);
      } else if (dropDownVlaue === "Upcoming Launches") {
        let filteredData = data.filter(
          (person) =>
            person.launch_success === null &&
            dropDownVlaue === "Upcoming Launches"
        );
        // return filteredData;
        let modData = filteredData.map((value, index) => {
          return { ...value, flight_number: index + 1 };
        });
        // console.log(modData);
        return modData;
        // setFinalModifiedData(modData);
      } else {
        let filteredData = data.filter(
          (person) =>
            person.launch_success === true &&
            dropDownVlaue === "Sccessful Launches"
        );
        // return filteredData;
        let modData = filteredData.map((value, index) => {
          return { ...value, flight_number: index + 1 };
        });
        // console.log(modData);
        return modData;
        // setFinalModifiedData(modData);
      }
      // return data;
    } catch (error) {
      console.error(error);
    }
  } else if (
    datePickarMOdalValue === 1 &&
    (dropDownVlaue === "Failed Launches" ||
      dropDownVlaue === "Upcoming Launches" ||
      dropDownVlaue === "Sccessful Launches")
  ) {
    try {
      // const { data } = await axios.get(`${url}`);
      let data = datePickarModalData;
      // console.log(data);
      if (dropDownVlaue === "Failed Launches") {
        let filteredData = data.filter(
          (person) =>
            person.launch_success === false &&
            dropDownVlaue === "Failed Launches"
        );
        //  console.log(filteredData);
        // return filteredData;
        let modData = filteredData.map((value, index) => {
          return { ...value, flight_number: index + 1 };
        });
        // console.log(modData);
        return modData;
        // setFinalModifiedData(modData);
      } else if (dropDownVlaue === "Upcoming Launches") {
        let filteredData = data.filter(
          (person) =>
            person.launch_success === null &&
            dropDownVlaue === "Upcoming Launches"
        );
        // return filteredData;
        let modData = filteredData.map((value, index) => {
          return { ...value, flight_number: index + 1 };
        });
        // console.log(modData);
        return modData;
        // setFinalModifiedData(modData);
      } else {
        let filteredData = data.filter(
          (person) =>
            person.launch_success === true &&
            dropDownVlaue === "Sccessful Launches"
        );
        // return filteredData;
        let modData = filteredData.map((value, index) => {
          return { ...value, flight_number: index + 1 };
        });
        // console.log(modData);
        return modData;
        // setFinalModifiedData(modData);
      }
      // return data;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const { data } = await axios.get(`${url}`);
      console.log(dropDownVlaue);
      const min = Number(
        Math.round(new Date(dropDownVlaue[0]).getTime() / 1000).toString()
      );
      const max = Number(
        Math.round(new Date(dropDownVlaue[1]).getTime() / 1000).toString()
      );
      // console.log((min), max);
      let filteredData = data.filter(
        (person) =>
          person.launch_date_unix >= min && person.launch_date_unix <= max
      );
      console.log(filteredData);
      // return filteredData;
      let modData = filteredData.map((value, index) => {
        return { ...value, flight_number: index + 1 };
      });
      // console.log(modData);
      datePickarModalData = modData;
      datePickarMOdalValue = 1;
      return modData;
      // setFinalModifiedData(modData);
    } catch (error) {
      console.error(error);
    }
  }
  // return (
  //   <>
  //   {finalModifiedData};
  //   </>
  // )
};
