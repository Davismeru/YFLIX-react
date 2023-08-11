import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Feeds from './pages/Feeds'
import PlayVideo from './pages/PlayVideo'
import SearchedVideos from './pages/SearchedVideos'
import ChannelVideos from './pages/ChannelVideos'

function App() {
  return (
    <div className='md:h-[100vh] md:overflow-hidden p-3'>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Feeds/>}/>
        <Route path='/video/:id' element=  {<PlayVideo/>}/>
        <Route path='/searched/:search_term' element=  {<SearchedVideos/>}/>
        <Route path='/channel/:channel_id' element=  {<ChannelVideos/>}/>
      </Routes>
    </div>
  )
}

export default App