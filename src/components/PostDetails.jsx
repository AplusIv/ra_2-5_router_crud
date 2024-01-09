import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useJsonFetch from '../hooks/useJsonFetch';
import badSanta from '../img/bad-santa.jpg';
import Button from './Button';


const PostDetails = ({commonProps: {postState, setPostState, onChange, onSubmit, onClick, onDelete}}) => {
  // console.log(props.commonProps);
  // const { onDelete } = props.commonProps;
  // console.log(onDelete);
  const navigate = useNavigate();

  const { parId } = useParams();
  const url = 'https://router-crud-backend-eixl.onrender.com';

  const [data, loading] = useJsonFetch('https://router-crud-backend-eixl.onrender.com', `/posts/${parId}`, 'GET');

  // const [editedData, setEditedData] = useState({
  //   content: data.post.content,
  //   id: data.post.id,
  // });
  const [editPost, setEditForm] = useState(false);
  const [postDetails, setPostDetails] = useState(true);

  const sendNote = async (post, id) => {
    try {
      let response = await fetch(url + '/posts/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
      });
      if (!response.ok) { 
        alert("Ошибка HTTP: " + response.status);
      } else {
        // let result = await response.json();
        console.log('post\'s edited');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit2 = (event) => {
    event.preventDefault();

    // setPostState((prevNoteStateValue) => ({...prevNoteStateValue, id: data.post.id}));

    sendNote(postState, parId); // отправка новых данных на сервер

    // setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect

    // Очистка textarea
    setPostState((prevNoteStateValue) => ({...prevNoteStateValue, content: '', id: ''}));
    navigate('/', {replace: true});
  }


  return (
    <div>PostDetails - { parId }
      {loading && <div>Loading...</div>}
      {/* {error && <div>{error}</div>} */}

      {postDetails && data && (<div className="card">
        <div className="card-header">
          <img className='post-author-img' src={badSanta} alt='post-author'/>
          <div className='post-author'>Bad Santa</div>   
          <span className="created">{data.post.created}</span>       
        </div>
        <div className="card-body text-dark">
          <p className="card-text">{data.post.content}</p>
        </div>
        <div className="buttons">
          <Button onClick={() => {
            setEditForm(true);
            setPostDetails(false);
            setPostState((prevNoteStateValue) => ({...prevNoteStateValue, content: data.post.content, id: data.post.id}));
            }}>Изменить</Button>
          <Button onClick={() => onDelete(parId)}>Удалить</Button>
        </div>
      </div>)}

      {editPost && (
    <div className="edit-form-container">Редактировать пост
      <img className='post-author-img' src={badSanta} alt='post-author'/>
      <div className='post-author'>Bad Santa</div>  
      <form id='add-new-note-form' className='form' onSubmit={onSubmit2}>
        <button className='delete-note' type='button' onClick={() => {
            setEditForm(false);
            setPostDetails(true);
            }}>{'\u2716'}</button>
        {/* <Button>{'\u2716'}</Button> */}
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
        <button className='btn' type='submit'>{'\u27A4'}</button>
        {/* <Button>{'\u27A4'}</Button> */}
      </form>
    </div>
    // <div>Edit form</div>
  )}
    </div>
  )
}

export default PostDetails