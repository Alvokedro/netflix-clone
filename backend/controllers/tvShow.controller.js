import { fetchTMDB } from "../services/tmdb.service.js"


export const getTrendingTvShow = async(req,res) => {
    try {
        const data = await fetchTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
        const randomTvShow = data.results[Math.floor(Math.random() * data.results?.length)]
        res.status(201).json({ success : true , content : randomTvShow })
    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const getTrailerTvShow = async(req,res) => {
    const {id} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        res.status(201).json({ success : true , trailer : data.results })
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).json(null)
        }
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const getDetailTvShow = async(req,res) => {
    const {id} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        res.status(201).json({ success : true , detail : data })
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).json(null)
        }
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const getSimilarTvShows = async(req,res) => {
    const {id} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.status(201).json({ success : true , similar : data.results })
    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const getTvShowsByCategory = async(req,res) => {
    const {category} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.status(201).json({ success : true , content : data.results })
    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}
