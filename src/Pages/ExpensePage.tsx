import { useLocation, useNavigate } from "react-router-dom"
import { useExpense } from "../context/ExpenseContext";
import './ExpensePage.css'
import Button from "../components/Button";
import Transaction from "../components/Transaction";
import { useEffect } from "react";
import { customFetch } from "../api/customFetch";
const DUMMY_DATA = [
  {
      id:1,
      paidBy:'john',
      totalAmount:10,
      items:[
          {
              itemName:'milk',
              price: 5,
              fractions:[1/2,0,1/2]
          },
          {
              itemName:'bread',
              price:2,
              fractions:[0,1/2,1/2]
          }
      ]
  },
  {
      id:2,
      paidBy:'mary',
      totalAmount:10,
      items:[
          {
              itemName:'milk',
              price: 5,
              fractions:[1/2,0,1/2]
          },
          {
              itemName:'bread',
              price:2,
              fractions:[0,1/2,1/2]
          }
      ]
  },
  {
      id:3,
      paidBy:'david',
      totalAmount:10,
      items:[
          {
              itemName:'milk',
              price: 5,
              fractions:[1/2,0,1/2]
          },
          {
              itemName:'bread',
              price:2,
              fractions:[0,1/2,1/2]
          }
      ]
  }
]
function ExpensePage() {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {expensesMap, setExpense} = useExpense();
    useEffect(()=>{
      async function fetchData(){
          const response = await customFetch(`${pathname}`, "GET")
          const resData = await response.json();
          setExpense(resData)
      }
      fetchData()
  },[])
  return (
    <>
    <section className="expenses">
      <div className="expenses-heading">
      <h1>Your Expenses in this group are:</h1>
      <Button text={"Add New"} type={"button"} textOnly={false}
      onClick={() => navigate(`${pathname}/new`)}
      />
      </div>
      <div className="group-expenses">
      {Object.keys(expensesMap).map((member, index) => <span key={index}>
        {member} owes {expensesMap[member]}
      </span>)}
      </div>
      {DUMMY_DATA.map((data)=> <Transaction key={data.id} {...data} />)}
    </section>
    </>
  )
}

export default ExpensePage