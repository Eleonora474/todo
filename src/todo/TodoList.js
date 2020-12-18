import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem/TodoItem'
import Modal from './Modal/Modal'

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
}

function TodoList(props) {
  const [editData, setEditData] = useState()
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }
  function openModal(data) {
    setEditData(data)
    setIsOpen(true)
  }

  return (
    <>
      <ul style={styles.ul}>
        {props.todos.map((todo, index) => {
          return (
            <TodoItem
              openModal={openModal}
              todo={todo}
              key={todo.id}
              index={index}
              onChange={props.onToggle}
            />
          )
        })}
      </ul>
      <Modal
        onSave={props.onEdit}
        editData={editData}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default TodoList
