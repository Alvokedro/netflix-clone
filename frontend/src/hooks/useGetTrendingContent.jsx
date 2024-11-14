import { useEffect, useState } from "react"
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
    const [trendingContent,setTrendingContent] = useState(null);
    const { contentType } = useContentStore();

    
    useEffect(() => {
        async function getTrendingContent(){
            const res = await axios.get(`${import.meta.env.LOCALHOST}/api/v1/netflix/${contentType}/trending`);
            setTrendingContent(res.data.content)
        }
        getTrendingContent()
    },[contentType])

    return { trendingContent };
}

export default useGetTrendingContent