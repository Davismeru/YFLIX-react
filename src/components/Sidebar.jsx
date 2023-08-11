import {BsMic, BsMusicNote, BsBalloon} from 'react-icons/bs'
import { categories } from "../assets/constants"
import './Sidebar.css'
function Sidebar( {selectedCategory, setSelectedCategory}) {
  return (
    <div className="flex overflow-x-auto md:overflow-hidden md:text-gray-500 md:flex-col md:gap-2">
      {
        categories.map(category => {
          return <section className='flex items-center gap-3 cursor-pointer p-2 rounded-sm hover:bg-gray-800 hover:transition-[2s]' key={category.name} onClick={() => setSelectedCategory(category.name)}>
                    {category.icon}
                    <p>{category.name}</p>
                </section>
        })
      }
    </div>
  )
}

export default Sidebar