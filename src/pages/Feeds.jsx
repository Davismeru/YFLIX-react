import Sidebar from '../components/Sidebar'
import Videos from '../components/Videos'
import { FaRobot } from 'react-icons/fa6'

import { fetchFromApi } from '../assets/fetchFromApi'
import { useEffect, useState } from 'react'

function Feeds() {

  const [selectedCategory, setSelectedCategory] = useState('Trending')
  const [videos, setVideos] = useState([])
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    fetchFromApi(`search?q=${selectedCategory}&part=snippet&maxResults=50&order=date`)
    .then((data) => {
     return data.json()
    }) .then((videoData) => {
      setVideos(videoData.items)
      setLoader(false)
    }) .catch((err) => {
      setError(err.message)
      setLoader(false)
    })
  }, [selectedCategory])
  return (
    <div className='md:flex gap-3 md:h-full'>
        {/* Sidebar */}
        <section className='side p-5 text-sm md:rounded-sm md:w-[25%] h-[85%] font-semibold'>
          {/* passing the state as props to set the selectedCategory from the sidebar content */}
          <h1 className='text-red-500 ml-3 hidden md:inline'>Top Categories</h1>
            <Sidebar selectedCategory = {selectedCategory} setSelectedCategory={setSelectedCategory}/>

            {/* meet the developer link */}
            <p className='text-blue-600 mt-3 text-center md:text-left'><a href='https://developerdavis.pages.dev/'>Meet the developer</a></p>
        </section>

        {/* Videos */}
        <section className='w-full border-[1px] rounded-md md:h-[85%] overflow-y-auto relative min-h-[60vh] p-3'>
          {/* loader image*/}
            {loader && <section  className='w-20 absolute left-1/2 top-1/2 -translate-x-1/2 text-center text-gray-500'>
                          <img src="loader.gif" alt='loading...'/>
                          <p>loading...</p>
                        </section>}

            <p className='md:text-3xl font-bold text-red-500 mb-5'>{selectedCategory}</p>
            <section>
              <Videos videos = {videos}/>
              {/* show error message if fetch not succesful */}
              {error && <p className='flex items-center gap-3 text-2xl font-bold text-gray-400'><FaRobot/>{error}</p>}
            </section>
        </section>
    </div>
  )
}

export default Feeds