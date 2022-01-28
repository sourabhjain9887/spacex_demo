import axios from "axios";

const url = "https://api.spacexdata.com/v3/launches";

export const fetchData = async (dropDownVlaue) => {
  if (dropDownVlaue === "All Launches") {
    try {
      const { data } = await axios.get(`${url}`);
      // console.log(data);
      let modData = data.map((value, index) => {
        return { ...value, flight_number: index + 1 };
      });
      // console.log(modData);
      return modData;
    } catch (error) {
      console.log(error);
    }
  } else if (
    dropDownVlaue === "Failed Launches" ||
    dropDownVlaue === "Upcoming Launches" ||
    dropDownVlaue === "Sccessful Launches"
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
        return filteredData;
      } else if (dropDownVlaue === "Upcoming Launches") {
        let filteredData = data.filter(
          (person) =>
            person.launch_success === null &&
            dropDownVlaue === "Upcoming Launches"
        );
        return filteredData;
      } else {
        let filteredData = data.filter(
          (person) =>
            person.launch_success === true &&
            dropDownVlaue === "Sccessful Launches"
        );
        return filteredData;
      }
      // return data;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const { data } = await axios.get(`${url}`);
      console.log(typeof dropDownVlaue[0]);
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
      return filteredData;
    } catch (error) {
      console.error(error);
    }
  }
};
