import { ChangeEvent, ReactNode } from "react";

export interface GroupType{
    groupId:string;
    name:string;
    date: string;
    members:string[];
}
export interface ButtonType{
    text:string;
    onClick?:()=>void;
    borderRadius?:string;
    type:"submit" | "reset" | "button";
    textOnly:boolean;
}
export interface ModalType{
    children?:ReactNode,
  }
  export type inputTypes = {
    type:string,
    required:boolean,
    value:string,
    handleChange: (ev: ChangeEvent<HTMLInputElement>, index?:number)=>void
}
export interface ExpenseContextType{
    expenseData: ExpenseType;
    setExpense:(expense: ExpenseType)=>void;
}
export interface ExpenseType{
    transactions:[];
    expenseMap:object;
}
export interface UserContextType{
    userId:string | null;
    groupId:string | null;
    isModalOpen:boolean;
    handleModal:()=>void;
    closeModal:() =>void;
    groupMembers: string[];
    addMembers: (name:string)=>void;
    editMembers: (index:number, name:string)=>void;
    removeMember: (index:number) => void;
    handleGroupId: (varGroupId: string) => void;
}
