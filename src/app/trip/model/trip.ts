export class Trip {

    actualTime: string;

    status: string;

    stop: any[];

    stop_seq_num: number;

    constructor(actualTime: string, status: string, stop: any[], stop_seq_num: number) {
        this.actualTime = actualTime;
        this.status = status;
        this.stop = stop;
        this.stop_seq_num;
    }
}
