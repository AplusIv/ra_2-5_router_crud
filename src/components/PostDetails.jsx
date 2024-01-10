import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useJsonFetch from '../hooks/useJsonFetch';
import badSanta from '../img/bad-santa.jpg';
import Button from './Button';
import dayjs from 'dayjs';


const PostDetails = ({commonProps: {postState, setPostState, setNeedDataLoading, onChange, sendPostData, onDelete}}) => {
  const navigate = useNavigate();

  const { parId } = useParams();
  const url = 'https://router-crud-backend-eixl.onrender.com';

  const [data, loading] = useJsonFetch(url, `/posts/${parId}`, 'GET');

  const [editPost, setEditForm] = useState(false);
  const [postDetails, setPostDetails] = useState(true);

  const onSubmit = (event) => {
    event.preventDefault();

    sendPostData(postState, 'PUT', parId); // отправка изменённых данных на сервер
    setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect

    // Очистка textarea
    setPostState((prevNoteStateValue) => ({...prevNoteStateValue, content: '', id: ''}));
    navigate('/', {replace: true}); // Редирект
  }

  return (
    <div>
      {loading && <div>Loading post...</div>}

      { data && (<div className="card">
        <div className="card-header">
          <img className='post-author-img' src={badSanta} alt='post-author'/>
          <div className='post-author'>Bad Santa</div>   
          <span className="created">{dayjs(data.post.created).format('DD:MM:YYYY HH:mm:ss')}</span>       
        </div>

       {postDetails && (
       <>
        <div className="card-body text-dark">
          <p className="card-text">{data.post.content}</p>
        </div><div className="buttons">
          <Button 
            onClick={() => {
            setEditForm(true);
            setPostDetails(false);
            setPostState((prevNoteStateValue) => ({ ...prevNoteStateValue, content: data.post.content, id: data.post.id }));
            }} 
            type='btn-outline-primary'>Изменить
          </Button>
          <Button onClick={() => onDelete(parId)} type='btn-outline-red'>Удалить</Button>
        </div>
        </>)}

        {editPost && (
          <div className="card-body text-dark">
            <form id='add-new-note-form' className='form' onSubmit={onSubmit}>
              <Button 
                onClick={() => {
                  setEditForm(false);
                  setPostDetails(true);
                  }} 
                type='btn-outline-red'>{'\u2716'}
              </Button>
              <label>
                <textarea 
                className='textarea' 
                name='content' 
                rows='10' 
                cols='35'
                placeholder='Введите текст поста'
                value={postState.content}
                onChange={onChange}
                required
                />
              </label>
              <button className='btn btn-outline-primary' type='submit'>{'\u27A4'}</button>
            </form>
          </div> 
        )}
      </div>)}
    </div>
  )
}

export default PostDetails
