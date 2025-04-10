import { Evt } from "./Event";

export interface Member
{
    id:string,
    cin:string,
    name:string ,
    type:string,
    createDate:string,
    tabEvents:Evt[]
}