export class Trip {

    actualTime: string;

    status: string;

    stop: any[];

    stop_seq_num: number;

    rank: string;

    constructor(actualTime: string, status: string, stop: any[], stop_seq_num: number, rank: string) {
        this.actualTime = actualTime;
        this.status = status;
        this.stop = stop;
        this.stop_seq_num;
        this.rank = rank;
    }
}
