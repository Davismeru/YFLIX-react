import { Link } from "react-router-dom";
import { FaTv } from 'react-icons/fa6'
function VideoCard({video}) {
  return (
    <Link to={`/video/${video.id.videoId}`}>
      <div className='md:w-48 mb-5 shadow-md rounded-md overflow-hidden'>
        {/* Card image section */}
        <section className="h-[fit-content] bg-black w-full">
          <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description.slice(0, 20)} className='w-full h-[fit-content] object-contain'/>
        </section>

        {/* Video details */}
        <section className="p-2">
          <p className="text-sm text-gray-900 mb-2">{video.snippet.title.slice(0, 60)}</p>
          <p className="text-[10px] text-gray-500 flex items-center gap-1"><FaTv/>{video.snippet.channelTitle}</p>
        </section>
      </div>
    </Link>
  )
}

export default VideoCard