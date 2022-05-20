export class Passage {

    actualRelativeTime: number;
    
    actualTime: string;

    direction: string;

    mixedTime: string;
    
    passageid: number;
    
    patternText: number;
    
    plannedTime: string;
    
    routeId: number;
    
    status: string;
    
    tripId: number;
    
    vehicleId: number;

    rank: string;

    constructor(actualRelativeTime: number, actualTime: string, direction: string, mixedTime: string,
        passageid: number, patternText: number, plannedTime: string, routeId: number, status: string,
        tripId: number, vehicleId: number, rank: string) {
        
        this.actualRelativeTime = actualRelativeTime;
        this.actualTime = actualTime;
        this.direction = direction;
        this.mixedTime = mixedTime;
        this.passageid = passageid;
        this.patternText = patternText;
        this.plannedTime = plannedTime;
        this.routeId = routeId;
        this.status = status;
        this.tripId = tripId;
        this.vehicleId = vehicleId;
        this.rank = rank;
    }
}
