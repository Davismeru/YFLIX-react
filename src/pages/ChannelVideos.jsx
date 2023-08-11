import { useParams } from "react-router-dom"
import { fetchFromApi } from "../assets/fetchFromApi"
import { useEffect, useState } from "react"
import channelCard from "../components/ChannelCard"
import { FaTv } from "react-icons/fa6"
import Videos from "../components/Videos"
import ChannelCard from "../components/ChannelCard"

function ChannelVideos() {
    const params = useParams()
    const [results, setResults] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        fetchFromApi(`search?channelId=${params.channel_id}&part=snippet%2Cid&order=date&maxResults=100`)
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
    {/* channel header */}
    <section className="flex flex-col items-center text-center my-5">
        <img src={results[0]?.snippet?.thumbnails?.medium?.url} alt="img" className="w-36 h-36 object-contain bg-gray-100 mb-2 rounded-full"/>
        <h1 className='text-xl font-bold mb-2 text-red-400'>{results[0]?.snippet?.channelTitle}</h1>
    </section>
    <div className="flex flex-wrap gap-3 h-[85%] overflow-y-auto justify-center ml-7">
        <Videos videos={results}/>
    </div>
    </>
  )
}

export default ChannelVideos