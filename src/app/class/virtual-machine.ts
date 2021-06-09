import { TrainingSession } from './training-session';


export class VirtualMachine {

    virtualMachineId: number;
    name : String;
    product: String;
    version:String;
    region:String;
    status:String;
    trainingSessions: TrainingSession[]=[];
    
}
