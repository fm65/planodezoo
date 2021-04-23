import { ModelCtor } from "sequelize";
import { SequelizeManager } from "../models";
import { TicketCreationProps, TicketInstance } from "../models/ticket.model";
const { QueryTypes } = require('sequelize');


export class TicketController {
    Ticket: ModelCtor<TicketInstance>;

    private static instance: TicketController;

    public static async getInstance(): Promise<TicketController> {
        if (TicketController.instance === undefined) {
            const { Ticket} = await SequelizeManager.getInstance();
            TicketController.instance = new TicketController(Ticket);
        }
        return TicketController.instance;
    }

    private constructor(Ticket: ModelCtor<TicketInstance>) {
        this.Ticket = Ticket;
    }

    public async write(props: TicketCreationProps): Promise<TicketInstance | null> {
        const ticket = await TicketController.getInstance();
        return this.Ticket.create(props);
    }
}