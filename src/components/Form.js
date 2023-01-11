import React from 'react'
import './Form.css';

function Form() {
  return (
    <>
      {/* <form className='form' onSubmit={event => event.preventDefault()}> */}
      <label className='form__label' htmlFor="">
        Activity :
        <input className='form__text' type="text" />
      </label>
      <label className='form__label' htmlFor="">
        Completed :
        <input className='form__check' type="checkbox" name="" id="" />
      </label>
      <input className='form__submit' type="submit" value="Todo" />
      {/* </form> */}
    </>
  )
}

export default Form