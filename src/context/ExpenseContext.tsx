import { createContext, ReactNode, useContext, useState } from "react";

export interface ExpenseContextType{
    expenseId:string;
    expensesMap:{};
    setExpense:(expense: ExpenseContextType)=>void;
    length:()=>number;
}

const ExpenseContext = createContext<ExpenseContextType>({
    expenseId:'',
    expensesMap:{},
    setExpense: () => {},
    length: () => 0
});

export default function ExpenseContextProvider({children} : {children:ReactNode}){
    const [expenses, setExpenses] = useState({
        expenseId:'',
        expensesMap:{}
    });
    
    function setExpense(expense: ExpenseContextType){
        setExpenses(expense)
    }
    function returnExpenseLength():number{
        return Object.keys(expenses.expensesMap).length;
    }
    const ctx = {...expenses, setExpense, length: returnExpenseLength}
    return <ExpenseContext.Provider value={ctx}>
        {children}
    </ExpenseContext.Provider>
}
export const useExpense = () => useContext(ExpenseContext);