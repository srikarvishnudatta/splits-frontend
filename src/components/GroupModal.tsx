import { ChangeEvent, useState } from "react";
import { useGroup } from "../context/GroupContext";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { customFetch } from "../api/customFetch";
function GroupModal() {
  const { groupMembers, addMembers,closeModal, removeMember, editMembers } = useGroup();

  const [groupName, setGroupName] = useState('Group Name')
    function handleChange(index:number,ev: ChangeEvent<HTMLInputElement>){
        editMembers(index,ev.target.value)
    }
  function addNewMember(){
    addMembers('John')
  }
  function changeGroupName(ev: ChangeEvent<HTMLInputElement>){
    setGroupName(ev.target.value);
  }
  async function submitHandler(){
    const body = {
      name: groupName,
      groupMembers,
      createdAt: new Date().toJSON().slice(0,10)
    }
    console.log(body);
    const id = localStorage.getItem('userId');
    const response = await customFetch(`/${id}/newGroup`, "POST", body);
    if(!response.ok) throw new Error("cannot submit")
    closeModal()
  }
  return (
    <Modal>
      <form className="modal-form" onSubmit={submitHandler}>
        <div className="modal-group-name">
          <p>Enter your group name! and choose your friends</p>
          <Input type="text" required value={groupName} handleChange={changeGroupName} />
        </div>
        {groupMembers.map((member, index)=> (
          <div key={index} className="group-members">
            <Input type="text" required value={member} handleChange={(ev: ChangeEvent<HTMLInputElement>) => handleChange(index, ev)} />
            <p onClick={addNewMember}>Add </p>
            <p onClick={() => removeMember(index)}>Remove</p>
          </div>
        ))}
        <div className="modal-buttons">
        <Button text={"Close"} borderRadius="1em" type={"button"} textOnly 
        onClick={() => closeModal()}
        />
        <Button text={"Submit"} borderRadius="1em" type={"submit"} textOnly={false}/>
        </div>
      </form>
    </Modal>
  );
}

export default GroupModal;
