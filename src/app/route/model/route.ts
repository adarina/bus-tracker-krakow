
export class Route {

    id: number;

    name: string;

    route: any[]

    stops: any[]

    constructor(id: number, name: string, stops: any[], route: any[]) {
        this.id = id;
        this.name = name;
        this.stops = stops;
        this.route = route;
    }
}
