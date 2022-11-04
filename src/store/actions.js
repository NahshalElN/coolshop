// ACTION TYPE-------------------------
export const ADD_FIELD = "ADD_FIELD"
export const REMOVE_FIELD = "REMOVE_FIELD"
export const TOGGLE_FIELD = "TOGGLE_FIELD"
export const CHANGE_VALUE = "CHANGE_VALUE"
export const CHANGE_OPERATOR = "CHANGE_OPERATOR"

// ACTIONS ----------------------------
export const addField = () => ({
    type: ADD_FIELD // does not need any payload
})
export const removeField = (fieldId) => ({
    type: REMOVE_FIELD,
    payload: { fieldId } // id of field to be removed
})
export const toggleField = (fieldId) => ({
    type: TOGGLE_FIELD,
    payload: { fieldId } // id of field to enable/disable
})
export const changeValue = (fieldId, value) => ({
    type: CHANGE_VALUE,
    payload: { fieldId, value } // id of the field to update & value to put in
})
export const changeOperator = (fieldId, operator) => ({
    type: CHANGE_OPERATOR,
    payload: { fieldId, operator } //  change the operation of this field: addition / subtraction
})