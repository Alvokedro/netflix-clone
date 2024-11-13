import { fetchTMDB } from "../services/tmdb.service.js"


export const getTrendingMovie = async(req,res) => {
    try {
        const data = await fetchTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        res.status(201).json({ success : true , content : randomMovie })
    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const getTrailerMovie = async(req,res) => {
    const {id} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.status(201).json({ success : true , trailer : data.results })
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).json(null)
        }
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const getDetailMovie = async(req,res) => {
    const {id} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(201).json({ success : true , detail : data })
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).json(null)
        }
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const getSimilarMovies = async(req,res) => {
    const {id} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.status(201).json({ success : true , similar : data.results })
    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}


export const getMoviesByCategory = async(req,res) => {
    const {category} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.status(201).json({ success : true , content : data.results })
    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}
