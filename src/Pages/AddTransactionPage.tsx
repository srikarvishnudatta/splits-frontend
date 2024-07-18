import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import Input from "../components/Input";
import { useExpense } from "../context/ExpenseContext";
import Button from "../components/Button";
import Item from "../components/Item";
import { ItemType } from "../types/types";

interface State {
  items: ItemType[];
}
interface Action {
  type: "ADD_ITEM" | "DELETE_ITEM" | "EDIT_ITEM";
  payload: ItemType;
  value?: { itemName: string; itemPrice: number };
}
function AddTransactionPage() {
  const [transactionName, setTransactioName] = useState("Transaction Name");
  const { length,expensesMap } = useExpense();
  const initialState: State = {
    items: [
      {
        id: generateRandomId(),
        itemName: "item",
        itemPrice: 0,
        fractions: new Array(length()).fill(0),
      },
    ],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  function submitHandler(event: FormEvent) {
    event.preventDefault();
  }
  function handleTransactionNameChange(ev: ChangeEvent<HTMLInputElement>) {
    setTransactioName(ev.target.value);
  }
  let groupMembers = Object.keys(expensesMap);
  function addItem() {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: generateRandomId(),
        itemName: "item",
        itemPrice: 0,
        fractions: new Array(length()).fill(0),
      },
    });
  }
  function removeItem(item: ItemType) {
    dispatch({ type: "DELETE_ITEM", payload: item });
  }
  function editItem(item: ItemType, itemName: string, itemPrice: number) {
    dispatch({
      type: "EDIT_ITEM",
      payload: item,
      value: { itemName, itemPrice },
    });
  }

  return (
    <section>
      <form onSubmit={submitHandler}>
        <Input
          type={"text"}
          required={true}
          value={transactionName}
          handleChange={handleTransactionNameChange}
        />
        <select name="paidBy" id="paidBy">
          {groupMembers.map((member, index) => (
            <option value={member} key={index}>
              {member}
            </option>
          ))}
        </select>
        {state.items.map((item: ItemType) => (
          <Item
            {...item}
            key={item.id}
            onAdd={addItem}
            onDelete={removeItem}
            onEdit={editItem}
          />
        ))}
        <Button text={"Submit"} type={"button"} textOnly={false} />
      </form>
    </section>
  );
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case "DELETE_ITEM": {
      if (state.items.length === 1) return state;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }
    case "EDIT_ITEM": {
      let newState = { ...state };
      const currentItem = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (newState.items[currentItem].itemName !== action.value?.itemName) {
        newState.items[currentItem].itemName = action.value?.itemName || " ";
        return {
          ...newState,
        };
      } else if (
        newState.items[currentItem].itemPrice !== action.value?.itemPrice
      ) {
        newState.items[currentItem].itemPrice = action.value?.itemPrice || 0;
        return {
          ...newState,
        };
      }
      return newState;
    }
    default:
      return state;
  }
}
function generateRandomId() {
  return Math.floor(Math.random() * 100);
}

export default AddTransactionPage;
