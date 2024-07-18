import { createContext, ReactNode, useContext, useState } from "react";

// expense context should have the matrix that holds all expenses of the members.
// this is where useReducer helps you a lot, you can have multiple actions.
interface ExpenseContextType{
    expenseId:string;
    expensesMap:{};
    setExpense:(expense: ExpenseContextType)=>void;
}
const ExpenseContext = createContext<ExpenseContextType>({
    expenseId:'',
    expensesMap:{},
    setExpense: () => {}
});
export default function ExpenseContextProvider({children} : {children:ReactNode}){
    const [expenses, setExpenses] = useState({
        expenseId:'',
        expensesMap:{}
    });
    function setExpense(expense: ExpenseContextType){
        setExpenses(expense)
    }
    const ctx = {...expenses, setExpense}
    console.log(expenses);
    return <ExpenseContext.Provider value={ctx}>
        {children}
    </ExpenseContext.Provider>
}
export const useExpense = () => useContext(ExpenseContext);