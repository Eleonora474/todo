import { useState } from 'react'

export default function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(''),
    value: () => value,
    setValue,
  }
}
