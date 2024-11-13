import axios from "axios";
import { fetchTMDB } from "../services/tmdb.service.js";
import User from "../models/user.model.js";

export const searchPerson = async(req,res) => {
    const { query } = req.params;
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        await User.findByIdAndUpdate(req.user._id,{
            $push : {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].profile_path,
                    title : data.results[0].name,
                    searchType : "person",
                    createdAt : Date.now()
                }
            }
        })
        res.status(200).json({ success : true , search : data.results })
        if(data.results.length === 0){
            return res.status(404).json(null)
        }
    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const searchMovie = async(req,res) => {
    const { query } = req.params;
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        await User.findByIdAndUpdate(req.user._id,{
            $push : {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].poster_path,
                    title : data.results[0].title,
                    searchType : "movie",
                    createdAt : Date.now()
                }
            }
        })
        res.status(200).json({ success : true , search : data.results })
        if(data.results.length === 0){
            return res.status(404).json(null)
        }
    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const searchTvShow = async(req,res) => {
    const { query } = req.params;
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        await User.findByIdAndUpdate(req.user._id,{
            $push : {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].poster_path,
                    title : data.results[0].name,
                    searchType : "tv-show",
                    createdAt : Date.now()
                }
            }
        })
        res.status(200).json({ success : true , search : data.results })
        if(data.results.length === 0){
            return res.status(404).json(null)
        }

    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const getSearchHistory = async(req,res) => {
    try {
        res.status(200).json({ success : true , history : req.user.searchHistory })

    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const deleteSearchHistory = async(req,res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull : {
                searchHistory : { id : parseInt(id)}
            }
        })
        res.status(200).json({ success : true , message : "Remove successfully" })

    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}