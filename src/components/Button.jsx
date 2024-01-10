import React from 'react'

const Button = ({children, onClick, type}) => {
  return (
    <button type="button" className={`btn ${type}`} onClick={onClick}>{children}</button>
  )
}

export default Button