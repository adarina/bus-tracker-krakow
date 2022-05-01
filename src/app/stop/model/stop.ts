export class Stop {
    
    id: number;

    name: string;

    longitude: number;
    
    latitude: number;

    shortName: string;

    constructor(id: number, name: string, longitude: number, latitude: number, shortName: string) {
        this.id = id;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.shortName = shortName;
    }
}
