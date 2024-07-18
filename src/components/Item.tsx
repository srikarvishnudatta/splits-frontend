import { ChangeEvent, useReducer } from "react";
import Input from "./Input";
import Button from "./Button";
import { ItemPropsType, ItemType as ItemState } from "../types/types";
import { ExpenseContextType, useExpense } from "../context/ExpenseContext";

interface Action{
    type: 'NAME_CHANGE' | 'PRICE_CHANGE' | 'FRACTION_CHANGE';
    payload: string|number;
}
function reducer(state: ItemState, action:Action){
    switch(action.type){
        case "NAME_CHANGE":
            return {...state, itemName: `${action.payload}`}
        case "PRICE_CHANGE":
            return {...state, itemPrice: +action.payload}
        case "FRACTION_CHANGE":{

        }
        default:
            return state;
    }
}

function Item(props:ItemPropsType) {
    // fractions; [] 
    const initialState: ItemState = {
        id:props.id,
        itemName: props.itemName,
        itemPrice: props.itemPrice,
        fractions: props.fractions
    }
    const {expensesMap, setExpense} = useExpense()
    const [state, dispatch] = useReducer(reducer, initialState);
    function handleNameChange(event: ChangeEvent<HTMLInputElement>){
        dispatch({type: 'NAME_CHANGE', payload: event.target.value})
        props.onEdit(state, event.target.value, state.itemPrice)
        
    }
    function handlePriceChange(event: ChangeEvent<HTMLInputElement>){
        dispatch({type: 'PRICE_CHANGE', payload: +event.target.value})
        props.onEdit(state,state.itemName, +event.target.value)
    }
    
    console.log(expensesMap);
  return (
    <div>
        <div>
            <Input type={"text"} required={false} value={state.itemName} handleChange={handleNameChange} />
            <Input type={"number"} required={false} value={state.itemPrice.toString()} handleChange={handlePriceChange} />
            <select name="shared" id="shared" multiple>
                {Object.keys(expensesMap).map((member, index) => <option key={index} value={member}>{member}</option>)}
            </select>
            <Button text={"Add"} type={"button"} textOnly={true} onClick={() => props.onAdd()}/>
            <Button text={"Remove"} type={"button"} textOnly={true} onClick={() => props.onDelete(state)} />
        </div>
    </div>
  )
}

export default Item