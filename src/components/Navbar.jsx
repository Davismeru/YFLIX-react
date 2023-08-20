import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'
import { fetchFromApi } from '../assets/fetchFromApi'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Navbar() {

  const [value, setValue] = useState('')
  const [searched, setSearched] = useState([])
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchFromApi(`search?q=${value}&part=snippet&maxResults=50`)
    .then((data) => {
     return data.json()
    }) .then((videoData) => {
      navigate(`/searched/${value}`)
    })
  }
  return (
    <div className='nav p-5 flex flex-col gap-2 justify-between items-center nav rounded-sm mb-3 h-[60vh] md:flex-row relative overflow-hidden'>
      {/* bg image */}
      <img src="banner.jpg" className='absolute w-full h-full left-0 top-0 object-cover' />

      {/* dark overlay */}
      <section className='absolute bg-black w-full h-full left-0 top-0 opacity-50'></section>

        {/* logo */}
        <Link to={`/`}>
          <div className='flex flex-col text-5xl text-center font-bold gap-2 text-red-600 md:text-8xl'>
                <p className='z-20'>Y<span className='text-2xl md:text-6xl text-white'>Flix</span></p>
                <p className='z-20 text-sm text-gray-300'>Stream and download your favourite videos</p>
          </div>
        </Link>

        {/* Search */}
        <form className='flex relative text-red-500 md:self-start' onSubmit={(e) => handleSubmit(e)}>
            <input type="text"
              className='pl-8 text-sm outline-none border-[1px] border-gray-600 text-white rounded-sm  py-1 bg-transparent md:py-2 md:w-60'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className='absolute top-1/2 left-2 -translate-y-1/2 text-gray-200'><BiSearch/></button>
        </form>
    </div>
  )
}

export default Navbar