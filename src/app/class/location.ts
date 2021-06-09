export class Location {
    
    id:number;
    region:string;
    locationName:string; 

    constructor(locationName:string, region:string){
       
        this.locationName = locationName;
        this.region= region;
        
    }
    
}
