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
  // simple reducer to maintain fields state, will be triggered with an attached action type & payload.

  var total = 0 // total of all values in each field.
  if (fields.length > 1) { 
    // filter out fields where the value is Not a Number (empty fields mostly)
    fields.filter(field => !isNaN(field.value)).forEach(field => {
      if (field.operator === "+") {
        total = total + parseInt(field.disabled ? 0 : field.value)
      } else {
        total = total - parseInt(field.disabled ? 0 : field.value)
      }
    })
  } else { // if there's only one or no field
    total = fields[0] ? fields[0].value : 0
  }

  return (
    // uses tailwind classes for simple quick styling
    <div className="App p-6 h-full w-full relative">
      <button className='bg-indigo-500 text-white rounded px-4 py-2 mb-4' onClick={() => dispatchFields(addField())}>Add Field</button>
      {/* render all fields + all possible functions */}
      {fields.map(field => (
        <div key={field.fieldId} className="flex gap-4 mb-2">
          <select 
            className='border border-black rounded flex items-center '
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
            className="border border-black px-2 rounded"
            min={0}
          />
          <button className='bg-indigo-500 text-white rounded px-4 py-2' onClick={() => dispatchFields(toggleField(field.fieldId))}>{field.disabled ? "Enable" : "Disable"}</button>
          <button className='bg-indigo-500 text-white rounded px-4 py-2' onClick={() => dispatchFields(removeField(field.fieldId))}>Remove Field</button>
        </div>
      ))}
      <span className='font-semibold text-indigo-400 absolute bottom-0'>Result: {total}</span>
    </div>
  );
}

export default App;
