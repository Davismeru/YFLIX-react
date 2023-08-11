import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

function Videos({videos}) {
  return (
    <div className='flex flex-wrap gap-4 w-full'>
      {
        videos.map((item, index) => (
          <section key={index} className='w-full md:w-[fit-content]'>
            {item.id.channelId && <ChannelCard channel = {item}/>}
            {item.id.videoId && <VideoCard video = {item}/>}
          </section>
        ))
      }
    </div>
  )
}

export default Videos 