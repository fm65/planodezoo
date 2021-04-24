import {SequelizeManager} from "../models";

const TICKET_MAX_RANDOM_DATA = 4

const now: Date = new Date();

export default async function(): Promise<void> {

	const {Ticket}  = await SequelizeManager.getInstance();

	for (let i = 1; i < TICKET_MAX_RANDOM_DATA+1 ; i++) {
		
		let data = [{ type      : i, 
		              price     : i+2.5, 
		              date      : '2021-04-24 16:00:16'
		           }]

		Ticket.bulkCreate(data)
		.then(() => {
			return Ticket.findAll();
		}).then(tickets => {
			console.log(tickets)
		});
	}
}