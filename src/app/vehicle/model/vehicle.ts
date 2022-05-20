import Point from "ol/geom/Point";

export class Vehicle {

    tripId: number;

    id: number;

    isDeleted: boolean;

    name: string;

    longitude: number;
    
    latitude: number;

    point: Point;

    heading: number;

    constructor(tripId: number, id: number, isDeleted: boolean, name: string, longitude: number, latitude: number, point: Point, heading: number) {
        this.tripId = tripId;
        this.id = id;
        this.isDeleted = isDeleted;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.point = point;
        this.heading = heading;
    }
}
