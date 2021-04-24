import { Connection, RowDataPacket } from "mysql2/promise";
import { SpaceTimeProps, SpaceTime } from "../models";

export class SpaceController {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async getVisitorsBySpace(id: Number): Promise<SpaceTime[]> {
        const res = await this.connection.query(`SELECT date_id, space_id, visitors, name FROM space_has_date INNER JOIN space on id = space_id WHERE space_id = ${id} ORDER BY date_id`);
        const data = res[0];
        if(Array.isArray(data)) {
            return (data as RowDataPacket[]).map(function(row) {
                return new SpaceTime({
                    spaceId: row["space_id"],
                    spaceName: row["name"],
                    date: row["date_id"],
                    visitors: row["visitors"]
                })
            });
        }
        return [];
    }

    async getNbTicketsbyDate(date: String): Promise<number>{
        const res = await this.connection.query(`SELECT COUNT(*) AS number FROM ticket WHERE date <= '${date}' AND validationDate >= '${date}'`);
        const data = res[0];
        if(Array.isArray(data)) {
            const rows = data as RowDataPacket[];
            if(rows.length > 0) {
                const row = rows[0];
                return row["number"]
            };
        }
        return 0;
    }

    async getStatsBySpace(id: Number, date: String): Promise<SpaceTime[]> {
        let listSpaceTime = await this.getVisitorsBySpace(id);
        const nbTickets = await this.getNbTicketsbyDate(date);

        listSpaceTime.forEach(function(Space) {
            Space.visitors = parseFloat((Space.visitors / nbTickets).toFixed(2));
        });

        return listSpaceTime;
    }

    async getStatsByWeek(list: SpaceTime[]): Promise<String[]> {
        let listWeek: String[] = [];
        let globalMid: number = 0;
        for(let i = 0; i < list.length; i+=7) {
            for(let j = 0; j < 6; j++) {
                globalMid = globalMid + list[j+i].visitors;
            }
            listWeek.push(list[0].spaceName, list[i].date + " / " + list[i+6].date, (globalMid / 7).toFixed(3));
        }
        return listWeek;
    }
    
}