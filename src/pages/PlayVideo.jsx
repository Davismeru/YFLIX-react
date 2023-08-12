import ReactPlayer from "react-player"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchFromApi } from "../assets/fetchFromApi"
import { FaDownload, FaEye, FaThumbsUp } from 'react-icons/fa6'
import Videos from '../components/Videos'
import CommentSection from "../components/CommentSection"

function PlayVideo() {
  const params = useParams()
  const [error, setError] = useState('')
  const [videoDetails, setVideoDetails] = useState([])
  const [related, setRelated] = useState([])
  useEffect(() => {
    fetchFromApi(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${params.id}`)
    .then((data) => {
        return data.json()
    }) .then((videoData) => {
        setVideoDetails(videoData.items)
    }) .catch((err) => {
        setError(err.message)
    })
}, [params])

//fetch suggested videos
useEffect(() => {
  fetchFromApi(`search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50`)
  .then((data) => {
      return data.json()
  }) .then((videoData) => {
      setRelated(videoData.items)
  }) .catch((err) => {
      setError(err.message)
  })
}, [params])

  const details = videoDetails[0]
  return (
    <div className="md:p-5 rounded-sm flex flex-col overflow-y-auto bg-gray-50 h-[85%] md:flex-row">
      {/* Video player and video Details */}
      <section className="">
        {/* video player */}
      <section className=" rounded-md overflow-hidden relative">
        <ReactPlayer url={`https://www.youtube.com/watch?v=${params.id}`} controls={true} width={'100%'} />
      </section>

        {/* video details */}
        <div className="">
          <p className="text-lg font-semibold">{details?.snippet?.title?.slice(0, 60)}</p>

          {/* video statistics */}
          <div className="flex flex-wrap gap-3 p-1 rounded-md opacity-8 0 text-gray-700 font-semibold text-lg">
              <section className="flex items-center gap-2 text-sm">
                <FaEye/>
                <p>{parseInt(details?.statistics?.viewCount).toLocaleString()}</p>
              </section>

              <section className="flex items-center gap-2 text-sm">
                <FaThumbsUp/>
                <p>{parseInt(details?.statistics?.likeCount).toLocaleString()}</p>
              </section>

              {/* Download Video Button */}
              <section className="flex items-center gap-2 text-sm">
                  <a href={`https://www.y2mate.com/youtube/${params.id}`} target="_blank" className="flex items-center gap-2"><FaDownload/>Download Video</a>
              </section>
          </div>

          {/* channel details */}
          <section className="flex items-center gap-2 font-semibold text-gray-500">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={details?.snippet?.thumbnails?.medium?.url} className="object-cover w-full h-full"/>
            </div>
            <p>{details?.snippet?.channelTitle?.slice(0, 60)}</p>
          </section>

          {/* description */}
          <section className="text-[12px] w-[80%]">
            <p className="text-small" dangerouslySetInnerHTML={{__html:details?.snippet?.description}}></p>
          </section>
        </div>

        {/* comments Section */}
        <div>
          <CommentSection commentId = {params.id} commentCount = {<p>{parseInt(details?.statistics?.commentCount).toLocaleString()}</p>}/>
        </div>
      </section>

      {/* Related Videos */}
      <section className="p-5 md:w-[100%] md:ml-10">
        <p className="text-3xl font-bold mb-5 text-red-500">Related videos</p>
        {related && <Videos videos = {related}/>}
      </section>
    </div>
  )
}

export default PlayVideo