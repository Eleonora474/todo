import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../context'
import './TodoItem.css'
import ReactTooltip from 'react-tooltip'

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    wordBreak: 'break-all',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '1px solid rgb(181, 179, 238)',
    borderRadius: '4px',
    marginBottom: '.5rem',
  },
  input: {
    marginRight: '1rem',
    cursor: 'pointer',
  },
}

function TodoItem({ todo, index, onChange, openModal }) {
  const { removeTodo } = useContext(Context)

  return (
    <li style={styles.li}>
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onChange(todo.id)}
          id={todo.id}
        />
        <label htmlFor={todo.id}>{todo.title}</label>
      </div>
      <div className="action-buttons">
        <button
          className="btn edit"
          onClick={openModal.bind(null, todo)}
          data-tip="Редактировать"
          data-for="main"
        />
        <button
          className="btn rm"
          onClick={removeTodo.bind(null, todo.id)}
          data-tip="Удалить"
          data-for="main"
        />

        <ReactTooltip id="main" place="top" type="dark" effect="solid" />
      </div>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

export default TodoItem
