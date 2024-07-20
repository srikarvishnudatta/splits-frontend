import { useExpense } from "../context/ExpenseContext";
import './ExpensePage.css'
import { useEffect } from "react";
import { customFetch } from "../api/customFetch";
import {useUser} from "../context/UserGroupContext.tsx";
import {Link, useLocation} from "react-router-dom";
function ExpensePage() {
    const {expenseData, setExpense} = useExpense();
    const {pathname} = useLocation()
    const {groupId} = useUser();
    useEffect(()=>{
      async function fetchData(){
          const response = await customFetch(`/${groupId}/getTransactions`, "GET")
          const resData = await response.json();
          setExpense({...resData})
      }
      fetchData()
  },[])
    console.log(expenseData)
  return (
    <>
    <section className="expenses">
      <div className="expenses-heading">
      <h1>Your Expenses in this group are:</h1>
      <Link to={pathname + "/new"}>Add new</Link>
      </div>
      <div className="transactions">
          {expenseData.transactions.length === 0 ? <p>
              Oopsie no data
          </p> : (
              <p>There is some content</p>
          )}
      </div>
    </section>
    </>
  )
}

export default ExpensePage