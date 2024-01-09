import React from 'react'
import badSanta from '../img/bad-santa.jpg'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';


const Post = ({id, created, content}) => {
  return (
    <div className="card">
      <Link to={`/posts/${id}`} >
        <div className="card-header">
          <img className='post-author-img' src={badSanta} alt='post-author'/>
          <div className='post-author'>Bad Santa</div>   
          <span className="created">{dayjs(created).format('DD:MM:YYYY HH:mm:ss')}</span>       
        </div>
        <div className="card-body text-dark">
          <p className="card-text">{content}</p>
        </div>
      </Link>
    </div>
  )
}

export default Post