import {createContext, ReactNode, useContext, useState} from "react"
import {UserContextType} from "../types/types.ts";


const UserGroupContext = createContext<UserContextType>({
    userId:'',
    groupId:'',
    isModalOpen: false,
    handleModal: () => {},
    closeModal: () => {},
    groupMembers: [],
    addMembers: ()=>{},
    editMembers: () => {},
    removeMember: () => {},
    handleGroupId: () => {}
});

export default function UserContextProvider({children} : {children: ReactNode}){
    const userId = localStorage.getItem('userId') ?? null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupMembers, setGroupMembers] = useState(['john']);
    const [groupId, setGroupId] = useState('');
    function handleGroupId(varGroupId: string){
        setGroupId(varGroupId)
    }
    function handleModal(){
        setIsModalOpen((prev) => !prev);
    }
    function setCloseModal(){
        setIsModalOpen(false)
    }
    function editGroupMembers(index = 0, name:string){
        setGroupMembers((prev) => {
            const newMembers = [...prev]
            newMembers[index] = name
            return newMembers
        })
    }
    function addMembers(name:string){
        setGroupMembers((prev) => {
            const newMembers = [...prev]
            newMembers.push(name)
            return newMembers
        })
    }
    function removeMember(index:number){
        setGroupMembers((prev) => {
            const newMembers = [...prev]
            if(newMembers.length === 1) return newMembers
            newMembers.splice(index, 1)
            return newMembers
        })
    }
    const ctx = {userId, groupId, isModalOpen, handleModal,
        closeModal: setCloseModal, groupMembers,editMembers:editGroupMembers,
        addMembers,
        removeMember,
        handleGroupId
    }
    return <UserGroupContext.Provider value={ctx}>
        {children}
    </UserGroupContext.Provider>
}
export function useUser(){
    return useContext(UserGroupContext);
}