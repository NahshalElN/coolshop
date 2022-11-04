var count = 1 // use to keep track of field IDs

export const fieldReducer = (state, action) => {
    let newState = [ ...state] // create shallow copy of previous state to perform mutations on
    let index

    if (action.payload) {
        //find index/ID of the field in question.
        index = newState.findIndex(field => field.fieldId === action.payload.fieldId)
        // returns -1 if this index does not exist.
    }
    
    switch(action.type) {
      case 'ADD_FIELD':
        // push a new entry into the field array
        newState.push({
            fieldId: count,
            value: 0,
            enabled: false,
            operator: "+"
        })
        count += 1 //  increase count to have more IDs
        return newState
      case 'REMOVE_FIELD':
        // filter the array for the field with the ID to be removed
        if (newState.length !== 0 && action.payload.fieldId !== -1) {
          newState = newState.filter(field => field.fieldId !== action.payload.fieldId)
        }
        return newState
      case 'TOGGLE_FIELD':
        if (index !== -1) {
            newState[index].disabled = !newState[index].disabled
        }
        return newState
      case 'CHANGE_VALUE':
        if (index !== -1 ) {
            newState[index].value = isNaN(action.payload.value) ? 0 : parseInt(action.payload.value)
        }
        return newState
      case 'CHANGE_OPERATOR':
        if (index !== -1) { 
            newState[index].operator = action.payload.operator
        }
        return newState
      default: // In Case of an error || undefined case, return original state
        return state
    }
  }