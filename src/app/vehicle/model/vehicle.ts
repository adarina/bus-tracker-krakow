import Point from "ol/geom/Point";

export class Vehicle {

    id: number;

    isDeleted: boolean;

    name: string;

    longitude: number;
    
    latitude: number;

    point: Point;

    constructor(id: number, isDeleted: boolean, name: string, longitude: number, latitude: number, point: Point) {
        this.id = id;
        this.isDeleted = isDeleted;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.point = point;
    }
}
