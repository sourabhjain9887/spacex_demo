import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/launches';


export const fetchData = async () =>{
    try{
        const { data } = await axios.get(`${url}`);
        // console.log(data);
        return data;
    } catch(error){
        console.log(error);
    }
}