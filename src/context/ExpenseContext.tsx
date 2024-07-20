import { createContext, ReactNode, useContext, useState } from "react";
import {ExpenseContextType, ExpenseType} from "../types/types";

const ExpenseContext = createContext<ExpenseContextType>({
    expenseData:{
        transactions: [],
        expenseMap:{}
    },
    setExpense: () => {},
});

export default function ExpenseContextProvider({children} : {children:ReactNode}){
    const initialState: ExpenseType = {transactions: [], expenseMap: {}};
    const [expenseData, setExpenseData] = useState(initialState);
    
    function setExpense(expense: ExpenseType){
        setExpenseData(expense)
    }
    const ctx = {expenseData, setExpense}
    return <ExpenseContext.Provider value={ctx}>
        {children}
    </ExpenseContext.Provider>
}
export const useExpense = () => useContext(ExpenseContext);