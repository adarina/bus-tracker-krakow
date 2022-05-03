import { Trip } from "../model/trip";

export class GetTripResponse {
    actual: Array<Trip>;

    old: Array<Trip>;

    directionText: string;

    routeName: number;
}
