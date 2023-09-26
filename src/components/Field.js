import React from "react";

export default function Field({ field, dispatchFields, removeField, toggleField, changeValue, changeOperator }) {
    const handleOperatorChange = (e) => {
      dispatchFields(changeOperator(field.fieldId, e.target.value));
    };
  
    const handleValueChange = (e) => {
      dispatchFields(changeValue(field.fieldId, e.target.value));
    };
  
    return (
      <div className="flex gap-4 mb-2">
        <select
          className="border border-black rounded flex items-center p-2"
          value={field.operator}
          onChange={handleOperatorChange}
        >
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
        <input
          disabled={field.disabled}
          value={field.value}
          onChange={handleValueChange}
          type="number"
          className="border border-black px-2 rounded"
          min={0}
        />
        <button
          className="bg-indigo-500 hover:bg-red-500 text-white rounded px-4 py-2"
          onClick={() => dispatchFields(toggleField(field.fieldId))}
        >
          {field.disabled ? 'Enable' : 'Disable'}
        </button>
        <button
          className="bg-indigo-500 hover:bg-red-800 text-white rounded px-4 py-2"
          onClick={() => dispatchFields(removeField(field.fieldId))}
        >
          Remove Field
        </button>
      </div>
    );
  }