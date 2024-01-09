// import React, { useContext, useState } from 'react'
// import EditPostContext from '../context/EditPostContext';

const EditPost = ({ post, commonProps: {postState, onChange, onSubmit, onClick} }) => {
  // const {noteState, setNoteState, handleChange, handleClick, handleSubmit} = useContext(EditPostContext);
  // {state, onChange, onSubmit, onClick}
  // const [noteState, setNoteState] = useState({
  //   id: '',
  //   content: '',
  // });
  // setNoteState((prevNoteStateValue) => ({...prevNoteStateValue, content: post.post.content, id: 0}))
  console.log(postState);
  console.log(onChange);
  console.log(post);

  return (
    <div className="edit-form-container">Редактировать пост
      <form id='add-new-note-form' className='form' onSubmit={onSubmit}>
        <button className='delete-note' type='button' onClick={onClick}>{'\u2716'}</button>
        {/* <Button>{'\u2716'}</Button> */}
        <label>
          <textarea 
          className='textarea' 
          name='content' 
          rows='10' 
          cols='35'
          placeholder='Введите текст поста'
          value={post.post.content}
          onChange={onChange}
          required
          />
        </label>
        <button className='btn' type='submit'>{'\u27A4'}</button>
        {/* <Button>{'\u27A4'}</Button> */}
      </form>
    </div>
    // <div>Edit form</div>
  )
}

export default EditPost