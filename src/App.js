import React, { useEffect, useState } from 'react'
import TodoList from './todo/TodoList'
import Context from './todo/context'
import Loader from './todo/Loader'
import Icon from './Icon'
import ReactTooltip from 'react-tooltip'

const AddTodo = React.lazy(() => import('./todo/AddTodo.js'))

function getValidDate(date) {
  const day = date[2][0] === '0' ? date[2][1] : date[2]
  return { month: [date[0], date[1]].join('-'), day }
}
const today = getValidDate(
  new Date().toLocaleDateString().replaceAll('.', '/').split('/').reverse()
)

function App() {
  const [monthTodos, setMonthTodos] = React.useState({})
  const [currentDate, setCurrentDate] = useState(today)
  const [dayTodos, setDayTodos] = useState(
    monthTodos[currentDate.day]?.length ? monthTodos[currentDate.day] : []
  )
  const [isMonthView, setIsMonthView] = useState(false)

  useEffect(() => {
    const todosFromStorage = JSON.parse(
      localStorage.getItem(currentDate.month) || '{}'
    )
    setMonthTodos(todosFromStorage)
  }, [currentDate])

  useEffect(() => {
    if (currentDate) {
      localStorage.setItem(currentDate.month, JSON.stringify(monthTodos))
    }
    if (!isMonthView) {
      setDayTodos(
        monthTodos[currentDate.day]?.length ? monthTodos[currentDate.day] : []
      )
    } else {
      showMonthTodos()
    }
  }, [currentDate, monthTodos])

  function onDateChange(e) {
    setCurrentDate(getValidDate(e.target.value.split('-')))
    setIsMonthView(false)
  }
  function toggleTodo(id) {
    setMonthTodos((prevMonthTodos) => {
      const newMonthTodos = {}
      Object.keys(prevMonthTodos).forEach(function (k) {
        prevMonthTodos[k].forEach(function (t) {
          let hash = Object.assign(t)
          if (hash.id === id) {
            hash = {
              ...hash,
              completed: !hash.completed,
            }
          }
          if (!newMonthTodos[k]) {
            newMonthTodos[k] = []
          }
          newMonthTodos[k].push(hash)
        })
      })
      return newMonthTodos
    })
  }

  function removeTodo(id) {
    setMonthTodos((prevMonthTodos) => {
      const newMonthTodos = {}
      Object.keys(prevMonthTodos).forEach(function (k) {
        prevMonthTodos[k].forEach(function (t) {
          let hash = Object.assign(t)
          if (hash.id !== id) {
            if (!newMonthTodos[k]) {
              newMonthTodos[k] = []
            }
            newMonthTodos[k].push(hash)
          }
        })
      })
      return newMonthTodos
    })
  }

  function addTodo(title) {
    const newTodo = {
      title,
      id: Date.now(),
      completed: false,
    }

    setMonthTodos((prevTodos) => {
      const t = prevTodos[currentDate.day]?.length
        ? [...prevTodos[currentDate.day], newTodo]
        : [newTodo]

      const newTodos = {
        ...prevTodos,
        [currentDate.day]: t,
      }

      return newTodos
    })
  }
  function editTodo(editedTodo) {
    if (isMonthView) {
      setMonthTodos((prevMonthTodos) => {
        const newMonthTodos = {}
        Object.keys(prevMonthTodos).forEach(function (k) {
          prevMonthTodos[k].forEach(function (t) {
            let hash = Object.assign(t)
            if (hash.id === editedTodo.id) {
              hash = editedTodo
            }
            if (!newMonthTodos[k]) {
              newMonthTodos[k] = []
            }
            newMonthTodos[k].push(hash)
          })
        })
        return newMonthTodos
      })
    } else {
      setMonthTodos((prevMonthTodos) => {
        return {
          ...prevMonthTodos,
          [currentDate.day]: prevMonthTodos[currentDate.day].map((todo) => {
            if (todo.id === editedTodo.id) {
              return editedTodo
            }
            return todo
          }),
        }
      })
    }
  }

  function showMonthTodos() {
    const todos = []
    for (const day in monthTodos) {
      if (Object.hasOwnProperty.call(monthTodos, day)) {
        const element = monthTodos[day]
        todos.push(...element)
      }
    }
    setDayTodos(todos)
    setIsMonthView(true)
  }
  function getCalendarValue() {
    const day =
      currentDate.day.length === 1 ? '0' + currentDate.day : currentDate.day
    const value = currentDate.month + '-' + day
    return value
  }
  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>
          <Icon /> Список дел <Icon />
        </h1>
        <div>
          <input
            type="date"
            value={getCalendarValue()}
            onChange={onDateChange}
          />
          <button
            className="btn submit-month"
            onClick={showMonthTodos}
            style={{ marginLeft: '0.5em' }}
            data-tip="Отобразить список за месяц"
            data-for="main"
          >
            Месяц
          </button>
          <ReactTooltip id="main" place="top" type="dark" effect="solid" />
        </div>
        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        <div style={{ width: '100%' }}>
          {dayTodos.length ? (
            <TodoList
              todos={dayTodos}
              onToggle={toggleTodo}
              onEdit={editTodo}
            />
          ) : (
            <p align="center">Добавьте запись</p>
          )}
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
