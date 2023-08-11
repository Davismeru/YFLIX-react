import { FaTv } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ChannelCard({channel}) {
  const navigate = useNavigate()
  return (
    <Link replace to={`../channel/${channel.snippet.channelId}`}>
      <div className=' md:w-48 shadow-md shadow-black rounded-md overflow-hidden flex flex-col items-center bg-gray-400 text-white py-3 font-semibold'>
        <section className='w-28 h-28 bg-red-200 rounded-full overflow-hidden mb-5'>
          <img src={channel.snippet.thumbnails.medium.url} alt="img" className='w-full h-full object-cover'/>
        </section>
        <p className='flex items-center text-md gap-2'><FaTv/> {channel.snippet.channelTitle}</p>
      </div>
    </Link>
  )
}

export default ChannelCard