import { RowDataPacket } from "mysql2/promise";
import { ModelCtor, QueryTypes } from "sequelize";
import { SequelizeManager } from "../models";
import { SpaceInstance } from "../models/space.model";
import { TicketCreationProps, TicketInstance } from "../models/ticket.model";
import { UserInstance } from "../models/user.model";
import { ZooController } from "./zoo.controller";


export class TicketController {

    Ticket: ModelCtor<TicketInstance>;

    private static instance: TicketController;

    public static async getInstance(): Promise<TicketController> {
        if (TicketController.instance === undefined) {
            const { Ticket } = await SequelizeManager.getInstance();
            TicketController.instance = new TicketController(Ticket);
        }
        return TicketController.instance;
    }

    private constructor(Ticket: ModelCtor<TicketInstance>) {
        this.Ticket = Ticket;
    }

    public async create(props: TicketCreationProps):
        Promise<TicketInstance | null> {
        return this.Ticket.create(props);
    }

    public async getAll(): Promise<TicketInstance[] | null> {
        const tickets = await this.Ticket.findAll();
        return tickets;
    }

    public async getByUser(id: Number): Promise<number | null> {
        const ticketController = await SequelizeManager.getInstance();
        const res = await ticketController.sequelize.query(`SELECT ticketType FROM User WHERE id = ${id}`);
        const data = res[0];
        if (Array.isArray(data)) {
            const rows = data as RowDataPacket[];
            if (rows.length > 0) {
                const row = rows[0];
                return row["ticketType"];
            };
        }
        return null;
    }

    public async getByType(type: number): Promise<TicketInstance | null> {
        const ticket = await this.Ticket.findOne({
            where: {
                type
            }
        })
        if (ticket !== null) {
            return ticket;
        }
        return null;
    }

    public async remove(type: number): Promise<TicketInstance | null> {
        const ticket = await this.getByType(type);
        if (ticket !== null) {
            ticket.destroy();
            return ticket;
        }
        return null;
    }

    public async checkValidation(spaceId: number, userId: number): Promise<boolean> {
        const spaceTicket = await SequelizeManager.getInstance();
        const ticketType = await this.getByUser(userId);
        const res = await spaceTicket.sequelize.query(`SELECT * FROM SpaceTicket WHERE ticketType = ${ticketType}`);
        if (res !== null) {
            const data = res[0];
            const spaces: number[] = [];
            const rows = data as RowDataPacket[];
            rows.forEach(row => {
                spaces.push(row.spaceId);
            })
            return spaces.includes(spaceId);
        }
        return false
    }







}

