interface ITask {
    id?: string;
    title: string;
    type: string;
    date: Date;
    description: string;

}

interface ITaskTypeOption {
    type: string;
}
export { ITask, ITaskTypeOption };

