import { FaTv} from 'react-icons/fa6'
import { BiSearch, BiTv } from 'react-icons/bi'
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
    <div className='nav p-5 flex flex-col gap-2 justify-between items-center nav rounded-sm mb-3 md:flex-row'>
        {/* logo */}
        <Link to={`/`}>
          <div className='flex items-center text-3xl font-bold gap-2 text-red-500 md:text-3xl'>
                <BiTv className='text-5xl'/>
                <p>Y<span className='text-sm text-gray-500'>Flix</span></p>
          </div>
        </Link>

        {/* Search */}
        <form className='flex items-center relative text-red-500  ' onSubmit={(e) => handleSubmit(e)}>
            <input type="text"
              className='pl-6 text-sm outline-none border-[1px] text-gray-800 rounded-md  py-1 md:py-2 md:w-60'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className='absolute left-1'><BiSearch/></button>
        </form>
    </div>
  )
}

export default Navbar