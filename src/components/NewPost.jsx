import React from 'react'
import Button from './Button'

const NewPost = ({state, onChange, onSubmit, onClick}) => {
  return (
    <form id='add-new-note-form' className='form' onSubmit={onSubmit}>
      <Button onClick={onClick} type='btn-outline-red'>{'\u2716'}</Button>
      <label>
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
      <button className='btn btn-outline-primary' type='submit'>{'\u27A4'}</button>
    </form>
  )
}

export default NewPost