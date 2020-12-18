import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useInputValue from '../hooks/useInputValue'

function AddTodo({ onCreate }) {
  const input = useInputValue('')

  function submitHandler(event) {
    event.preventDefault()

    if (input.value().trim()) {
      onCreate(input.value())
      input.clear()
    }
  }

  return (
    <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
      <input className="input" {...input.bind} />
      <button className="btn submit" type="submit">
        Добавить
      </button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
}

export default AddTodo
