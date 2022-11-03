import { useReducer } from 'react';
import { fieldReducer } from './store';
import { addField, removeField, toggleField, changeValue, changeOperator } from "./store"
import './App.css';

function App() {
  const INITIAL_STATE = [
    {
      fieldId: 0,
      disabled: false,
      operator: "+",
      value: 10
    }
  ]

  const [fields, dispatchFields] = useReducer(fieldReducer, INITIAL_STATE)

  var total = 0
  if (fields.length > 1) {
    fields.forEach(field => {
      if (field.operator === "+") {
        total = total + parseInt(field.value)
      } else {
        total = total - parseInt(field.value)
      }
    })
  } else {
    total = fields[0].operator === "+" ? fields[0].value : 0 - fields[0].value
  }

  return (
    <div className="App">
      <button onClick={() => dispatchFields(addField())}>Add Field</button>
      {fields.map(field => (
        <div key={field.fieldId}>
          <select
            value={field.operator}
            onChange={e => dispatchFields(changeOperator(field.fieldId , e.target.selectedOptions[0].value))}
          >
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
          <input
            disabled={field.disabled}
            value={field.value} 
            onChange={e => dispatchFields(changeValue(field.fieldId, e.target.value))} 
            type="number"
          />
          <button onClick={() => dispatchFields(toggleField(field.fieldId))}>{field.disabled ? "enable" : "disable"}</button>
          <button onClick={() => dispatchFields(removeField(field.fieldId))}>Remove Field</button>
        </div>
      ))}
      <span>Result: {total}</span>
    </div>
  );
}

export default App;
