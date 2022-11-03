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
        console.log("ADDING FIELD")
        newState.push({
            fieldId: count,
            value: 0,
            enabled: false,
            operator: "+"
        })
        count += 1
        return newState
      case 'REMOVE_FIELD':
        newState = newState.filter(field => field.fieldId !== action.payload.fieldId)
        return newState
      case 'TOGGLE_FIELD':
        if (index !== -1) {
            console.log(newState[index])
            newState[index].disabled = !newState[index].disabled
        }
        return newState
      case 'CHANGE_VALUE':
        if (index !== -1) {
            newState[index].value = action.payload.value
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