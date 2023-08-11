import { useParams } from "react-router-dom"
import { fetchFromApi } from "../assets/fetchFromApi"
import { useEffect, useState } from "react"
import VideoCard from "../components/VideoCard"
import { FaTv } from "react-icons/fa6"
import Videos from "../components/Videos"

function SearchedVideos() {
    const params = useParams()
    const [results, setResults] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        fetchFromApi(`search?q=${params.search_term}&part=snippet&maxResults=50`)
        .then((data) => {
            return data.json()
        }) .then((videoData) => {
            setResults(videoData.items)
        }) .catch((err) => {
            setError(err.message)
        })
    }, [params])
  return (
    <>
    <h1 className='text-3xl font-bold text-red-700 mb-5 ml-7'>Search results for <span className="text-gray-800">{params.search_term}</span></h1>
    <div className="flex flex-wrap gap-3 h-[85%] overflow-y-auto justify-center ml-7">
        <Videos videos={results}/>
    </div>
    </>
  )
}

export default SearchedVideos