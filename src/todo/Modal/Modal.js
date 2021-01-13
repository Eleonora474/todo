import React, { useEffect } from 'react'
import useInputValue from '../../hooks/useInputValue'
import './Modal.css'
export default function Modal({ editData, closeModal, isOpen, onSave }) {
  const { setValue, ...input } = useInputValue('')

  useEffect(() => {
    if (editData) {
      setValue(editData.title)
    }
  }, [editData, setValue])

  function onSubmit() {
    const editedTodo = {
      ...editData,
      title: input.value(),
    }
    onSave(editedTodo)
    input.clear()
    closeModal()
  }

  return (
    <div
      style={{ display: isOpen ? 'block' : 'none' }}
      onClick={(e) => {
        if (e.target.classList.contains('modal')) {
          closeModal()
        }
      }}
      className="modal"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>Редактирование задачи</h2>
          <span onClick={closeModal} className="close">
            &times;
          </span>
        </div>
        <div className="modal-body">
          <input className="input" {...input.bind} />
          <button className="btn submit" onClick={onSubmit}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
