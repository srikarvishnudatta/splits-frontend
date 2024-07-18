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
export interface ItemType {
    id:number;
  itemName: string;
  itemPrice: number;
  fractions: number[];
}
export interface ItemPropsType extends ItemType{
    onAdd: ()=>void;
    onDelete: (item: ItemType) => void;
    onEdit:(item: ItemType, itemName:string, itemPrice:number)=>void;
}
