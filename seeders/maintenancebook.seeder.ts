import {SequelizeManager} from "../models";

const SPACE_MAX_RANDOM_DATA = 5

const now: Date = new Date();

export default async function(): Promise<void> {

	const {Maintenancebook}  = await SequelizeManager.getInstance();

	for (let i = 1; i < SPACE_MAX_RANDOM_DATA+1 ; i++) {
		
		let data = [{ date   : '2021-04-24 16:00:16',
		              isDone : false, 
		              comment: 'Comment'+i,
		              month  : 0 //January
		           }]

		Maintenancebook.bulkCreate(data)
		.then(() => {
			return Maintenancebook.findAll();
		}).then(maintenancebooks => {
			console.log(maintenancebooks)
		});
	}
}