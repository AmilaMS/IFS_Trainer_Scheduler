export class LeaveInfo {
    trainer_id: number;
    date: Date;
    description: string;
    title: string;
    type: string;
    trainer: any; 


    constructor(trainer_id: number, date: Date, description: string, title: string, type: string) {
        this.trainer_id = trainer_id;
        this.date = date;
        this.description = description;
        this.title = title;
        this.type = type;
    }

}
