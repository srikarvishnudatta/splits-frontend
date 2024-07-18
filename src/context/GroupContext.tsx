import { createContext, ReactNode, useContext, useState } from "react";

interface GroupContextType{
    isModalOpen:boolean;
    handleModal:()=>void;
    closeModal:() =>void;
    groupMembers: string[];
    addMembers: (name:string)=>void;
    editMembers: (index:number, name:string)=>void;
    removeMember: (index:number) => void;

}
const GroupContext = createContext<GroupContextType>({
    isModalOpen: false,
    handleModal: () => {},
    closeModal: () => {},
    groupMembers: [],
    addMembers: ()=>{},
    editMembers: () => {},
    removeMember: () => {}
});
export default function GroupContextProvider({children} : {children: ReactNode}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupMembers, setGroupMembers] = useState(['john']);

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
      const ctx = {isModalOpen, handleModal, closeModal: setCloseModal, groupMembers,editMembers:editGroupMembers,
    addMembers,
    removeMember
      }
    return <GroupContext.Provider value={ctx}>
        {children}
    </GroupContext.Provider>
}
export const useGroup = () => useContext(GroupContext);