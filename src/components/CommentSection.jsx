import React, { useState } from 'react'
import { fetchFromApi } from '../assets/fetchFromApi'
import { useEffect } from 'react'
import { FaThumbsUp } from 'react-icons/fa6'

function CommentSection({ commentId, commentCount }) {
    const [comments, setComments] = useState([]) 
    const [error, setError] = useState('')

    useEffect(() => {
        fetchFromApi(`commentThreads?part=snippet&videoId=${commentId}`)
        .then((data) => {
            return data.json()
        }) .then((commentsData) => {
            setComments(commentsData.items)
        }) .catch((err) => {
            setError(err.message)
        })
    }, [])

  return (
    <div>
        <h1 className='text-xl font-semibold my-5 flex gap-2 text-gray-600'>{commentCount}<span className='text-red-500'>Comments</span></h1>
        {
            comments.map(comment => {
                const commentSnippet = comment.snippet.topLevelComment.snippet
               return <section className='bg-slate-100 my-2 p-2' key={comment.id}>
                        {/* commentor details */}
                        <div className='flex items-center gap-3'>
                            <img src={commentSnippet.authorProfileImageUrl} alt="img"  className='rounded-full'/>
                            <p className='font-semibold text-gray-700'>{commentSnippet?.authorDisplayName}</p>
                        </div>

                        {/* comment */}
                        <div className='text-sm my-2'>
                            <p dangerouslySetInnerHTML={{__html:commentSnippet?.textDisplay}}></p>
                        </div>

                        {/* comment statistics */}
                        <div className='flex items-center text-[12px] gap-5'>
                            <p>Published on: {commentSnippet?.publishedAt.slice(0,10)}</p>
                            {/* comment likes */}
                            <section className='flex items-center gap-1'>
                                <FaThumbsUp/>
                                <p>{commentSnippet?.likeCount}</p>
                            </section>
                        </div>
                    </section>
            })
        }
    </div>
  )
}

export default CommentSection