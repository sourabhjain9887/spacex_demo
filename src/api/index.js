import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/launches';


export const fetchData = async (dropDownVlaue) =>{
    // try{
    //     const { data } = await axios.get(`${url}`);
    //     // console.log(data);
    //     return data;
    // } catch(error){
    //     console.log(error);
    // }
    console.log(dropDownVlaue);
    if(dropDownVlaue === 'All Launches'){
        try{
            const { data } = await axios.get(`${url}`);
            console.log(data);
            return data;
        } catch(error){
            console.log(error);
        }
    }else{
        try{
            const { data } = await axios.get(`${url}`);
            // console.log(data);
            if(dropDownVlaue === 'Failed Launches' ){
                let filteredData = data.filter(person => person.launch_success === false && dropDownVlaue === 'Failed Launches')
                //  console.log(filteredData);
                return filteredData;
            } else if (dropDownVlaue === 'Upcoming Launches'){
                let filteredData = data.filter(person => person.launch_success === null && dropDownVlaue === 'Upcoming Launches')
                return filteredData;
            }else {
                let filteredData = data.filter(person => person.launch_success === true && dropDownVlaue === 'Sccessful Launches')
                return filteredData;
            }
            // return data;
        } catch(error){
            console.log(error);
        }
    }
}