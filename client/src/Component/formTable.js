import React from 'react'
import { IoIosClose } from "react-icons/io";
import '../App.css'

function formTable({handleSubmit,handleChange,handleClose,rest}) {
  return (
      <div className='addContainer'>
        <form onSubmit={handleSubmit}>
        <div className='close-btn' onClick={handleClose}><IoIosClose /></div>
          <label htmlFor="name">Name : </label>
          <input type="text" id="name" name="name" onChange={handleChange} value={rest.name}/>
          <label htmlFor="email">Email : </label>
          <input type="email" id="email" name="email" onChange={handleChange} value={rest.email}/>
          <label htmlFor="mobile">Mobile : </label>
          <input type="number" id="mobile" name="mobile" onChange={handleChange} value={rest.mobile}/>

          <button className='btn'>Submit</button>
        </form>
      </div>
  )
}

export default formTable
