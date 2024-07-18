import './Transaction.css'
interface TransactionType{
    paidBy:string;
    totalAmount:number;
    items:ItemType[];
    onClick?:()=>void
}
interface ItemType{
    itemName:string;
    price:number;
    fractions:number[]
}


function Transaction(props: TransactionType) {
  return (
    <div className="transaction-card" onClick={props.onClick}>
        <div className='transaction-heading'>
        <h1>Paid by: {props.paidBy}</h1>
        <h2>${props.totalAmount}</h2>
        </div>
          {props.items.map((item, index)=> <span key={index}>
        {item.itemName} {item.price} 
    </span>)}</div>
  )
}

export default Transaction