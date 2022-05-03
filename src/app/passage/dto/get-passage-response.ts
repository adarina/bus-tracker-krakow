import { Passage } from "../model/passage";

export class GetPassageResponse {
    actual: Array<Passage>;

    old: Array<Passage>;

    stopShortName: number;

    stopName: string;

    routes: any[];
}
