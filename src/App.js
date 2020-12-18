import React, { useEffect, useState } from 'react'
import TodoList from './todo/TodoList'
import Context from './todo/context'
import Loader from './todo/Loader'
import Icon from './Icon'

const AddTodo = React.lazy(() => import('./todo/AddTodo.js'))

const today = new Date().toLocaleDateString().split('.').reverse().join('-')

function App() {
  const [todos, setTodos] = React.useState([])
  const [currentDate, setCurrentDate] = useState(today)

  useEffect(() => {
    const todosFromStorage = JSON.parse(
      localStorage.getItem(currentDate) || '[]'
    )
    setTodos(todosFromStorage)
  }, [currentDate])

  useEffect(() => {
    if (currentDate) {
      localStorage.setItem(currentDate, JSON.stringify(todos))
    }
  }, [currentDate, todos])

  function onDateChange(e) {
    setCurrentDate(e.target.value)
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    )
  }
  function editTodo(editedTodo) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editedTodo.id) {
          return editedTodo
        }
        return todo
      })
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>
          Ежедневник <Icon />
        </h1>
        <div>
          <input type="date" value={currentDate} onChange={onDateChange} />
        </div>
        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        <div style={{ width: '100%' }}>
          {todos.length ? (
            <TodoList todos={todos} onToggle={toggleTodo} onEdit={editTodo} />
          ) : (
            <p align="center">Добавьте запись</p>
          )}
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
