import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import {useUser} from "../context/UserGroupContext.tsx";



function AddTransactionPage() {
  const [state, setState] = useState({
    transactionName:"Transaction name",
    transactionValue:0,
  })
  const {groupMembers} = useUser();
  function submitHandler(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data)
  }
  function handleTransactionNameChange(ev: ChangeEvent<HTMLInputElement>) {
    setState((prevState) => ({...prevState, transactionName: ev.target.name}))
  }
  function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
    setState((prevState) => ({...prevState, transactionValue: +event.target.value}))
  }
  return (
    <section>
      <form onSubmit={submitHandler}>
        <Input
          type={"text"}
          required={true}
          value={state.transactionName}
          handleChange={handleTransactionNameChange}
        />
        <Input type={"number"} required={true} value={`${state.transactionValue}`} handleChange={handlePriceChange} />
        <h1>Paid By</h1>
        <select name="paidBy" id="paidBy">
          {groupMembers.map((member, index) => (
            <option value={member} key={index}>
              {member}
            </option>
          ))}
        </select>
        <h1>Split among</h1>
        <select name="splitAmong" id="splitAmong" multiple={true}>
          {groupMembers.map((member, index) => (
              <option value={member} key={index}>{member}</option>
          ))}
        </select>
        <Button text={"Submit"} type={"submit"} textOnly={false} />
      </form>
    </section>
  );
}

export default AddTransactionPage;
