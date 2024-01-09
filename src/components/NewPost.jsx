import React from 'react'
// import Button from './Button'

const NewPost = ({state, onChange, onSubmit, onClick}) => {
  return (
    <form id='add-new-note-form' className='form' onSubmit={onSubmit}>
      <button className='delete-note' type='button' onClick={onClick}>{'\u2716'}</button>
      {/* <Button>{'\u2716'}</Button> */}
      <label>New Post
        <textarea 
        className='textarea' 
        name='content' 
        rows='10' 
        cols='35'
        placeholder='Введите текст нового поста'
        value={state.content}
        onChange={onChange}
        required
        />
      </label>
      <button className='btn' type='submit'>{'\u27A4'}</button>
      {/* <Button>{'\u27A4'}</Button> */}
    </form>
  )
}

export default NewPost