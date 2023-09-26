import { useReducer } from 'react';
import { fieldReducer, addField, removeField, toggleField, changeValue, changeOperator } from './store';
import Field from './components/Field';
import './App.css';

function App() {
  const INITIAL_STATE = [
    {
      fieldId: 0,
      disabled: false,
      operator: '+',
      value: 10,
    },
  ];

  const [fields, dispatchFields] = useReducer(fieldReducer, INITIAL_STATE);

  const total = fields.reduce((acc, field) => {
    if (!isNaN(field.value) && !field.disabled) {
      return field.operator === '+' ? acc + field.value : acc - field.value;
    }
    return acc;
  }, 0);

  return (
    <div className="App p-6 h-full w-full relative">
      <button className="bg-indigo-500 hover:bg-indigo-700 text-white rounded px-4 py-2 mb-4" onClick={() => dispatchFields(addField())}>
        Add Field
      </button>
      {fields.map((field) => (
        <Field
          key={field.fieldId}
          field={field}
          dispatchFields={dispatchFields}
          removeField={removeField}
          toggleField={toggleField}
          changeValue={changeValue}
          changeOperator={changeOperator}
        />
      ))}
      <span className="font-semibold text-indigo-400 absolute bottom-0">Result: {total}</span>
    </div>
  );
}

export default App;
