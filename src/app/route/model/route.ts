
export class Route {

    id: number;

    name: string;

    stops: any[]

    constructor(id: number, name: string, stops: any[]) {
        this.id = id;
        this.name = name;
        this.stops = stops;
    }
}
