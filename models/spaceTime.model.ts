

export interface SpaceTimeProps {
    spaceId: Number,
    spaceName: String,
    date: String,
    visitors: number
}

export class SpaceTime implements SpaceTimeProps {
    spaceId: Number;
    spaceName: String;
    date: String;
    visitors: number;
    
    constructor(props: SpaceTimeProps) {
        this.spaceId = props.spaceId;
        this.spaceName  = props.spaceName;
        this.date = props.date;
        this.visitors = props.visitors;
        
    }
}
