import { useNavigate } from "react-router-dom";
import { customFetch } from "../api/customFetch";
import { GroupType } from "../types/types";
import "./Group.css";
import {useUser} from "../context/UserGroupContext.tsx";
import {useEffect} from "react";
function Group(props: GroupType) {
  const navigate = useNavigate();
  const {handleGroupId} = useUser()
  async function deleteGroupHandler(){
    await customFetch(`/groups/${props.groupId}`, "DELETE")
    window.location.reload();
  }
    useEffect(() => {
        handleGroupId(props.groupId);
    }, []);
  return (
    <div className="group-card" onClick={() => navigate(`/${props.name}/expenses`)}>
      <div className="group">
        <h1>{props.name}</h1>
        <p>Created at : {props.date}</p>
        <p>Members: {props.members.map((member, index) => <span key={index}>
          {member + " "}
        </span>)}</p>
      </div>
      <p onClick={deleteGroupHandler}>Delete</p>
    </div>
  );
}

export default Group;
