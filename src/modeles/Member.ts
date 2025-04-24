import { Evt } from "./Event";
import { Pub } from "./Pub";
import { Tool } from "./Tool";

export interface Member
{
    id:string,
    cin:string,
    name:string ,
    type:string,
    createDate:string,
    tabEvents:Evt[],
    tabPubs:Pub[],
    tabTools:Tool[]
}