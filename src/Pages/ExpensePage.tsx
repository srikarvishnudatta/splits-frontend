import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { customFetch } from "../api/customFetch";
import { useExpense } from "../context/ExpenseContext";

function ExpensePage() {
    const {pathname} = useLocation();
    const {setExpense} = useExpense();
    useEffect(()=>{
        async function fetchData(){
            const response = await customFetch(`${pathname}`, "GET")
            const resData = await response.json();
            setExpense(resData)
        }
        fetchData()
    },[])
  return (
    <section>
        hi wait
    </section>
  )
}

export default ExpensePage