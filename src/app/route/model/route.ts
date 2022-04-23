
export class Route {

    id: number;

    name: string;

    stops: number[]

    constructor(id: number, name: string, stops: number[]) {
        this.id = id;
        this.name = name;
        this.stops = stops;
    }
}
