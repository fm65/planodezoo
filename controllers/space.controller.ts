import { Connection, RowDataPacket } from "mysql2/promise";
import { SpaceTimeProps, SpaceTime, SequelizeManager } from "../models";
import {ModelCtor} from "sequelize";
import {SpaceCreationProps, SpaceInstance} from "../models/space.model";
 

export class SpaceController {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async getVisitorsBySpace(id: Number): Promise<SpaceTime[]> {
        const res = await this.connection.query(`SELECT Date.id, SpaceId, visitors, name FROM Date INNER JOIN Space on Space.id = SpaceId WHERE SpaceId = ${id}`);
        const data = res[0];
        if(Array.isArray(data)) {
            return (data as RowDataPacket[]).map(function(row) {
                return new SpaceTime({
                    spaceId: row["SpaceId"],
                    spaceName: row["name"],
                    date: row["id"],
                    visitors: row["visitors"]
                })
            });
        }
        return [];
    }

    async getNbTicketsbyDate(date: String): Promise<number>{
        const res = await this.connection.query(`SELECT COUNT(*) AS number FROM Ticket WHERE date <= '${date}' AND Ticket.date >= '${date}'`);
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



export class _SpaceController {
 
    Space : ModelCtor<SpaceInstance>;
 
    private static instance: _SpaceController;
 
    public static async getInstance(): Promise<_SpaceController> {
        if(_SpaceController.instance === undefined) {
            const {Space} = await SequelizeManager.getInstance();
            _SpaceController.instance = new _SpaceController(Space);
        }
        return _SpaceController.instance;
    }
 
    private constructor(Space: ModelCtor<SpaceInstance>) {
        this.Space = Space;
    }
 
    public async getAll(): Promise<SpaceInstance[] | null> {
 
        const spaces = await this.Space.findAll({
            attributes: ['id',      'name',       'description', 'image',
                         'type',    'capacity',   'duration',
                         'opening', 'closing',    'disabledAccess'],
            limit: 20
        });
        return spaces;
    }

    public async getById(id: number): Promise<SpaceInstance | null> {
        const space = await this.Space.findOne({
            where: {
                id
            }
        })
        if (space !== null) {
            return space;
        }
        return null;
    }
 
    public async create(props: SpaceCreationProps):
        Promise<SpaceInstance | null> {
        return this.Space.create(props);
    }
}