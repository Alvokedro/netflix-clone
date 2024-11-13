import axios from "axios";

export const fetchTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    };

    const res = await axios.get(url, options);
    if(res.status !== 200){
        return new Error("Failed to fetch data from TMDB");
    }
    return res.data
}