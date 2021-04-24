import {SequelizeManager} from "../models";

const ANIMAL_MAX_RANDOM_DATA = 20

const now: Date = new Date();

export default async function(): Promise<void> {

	const {Healthbook}  = await SequelizeManager.getInstance();

	for (let i = 1; i < ANIMAL_MAX_RANDOM_DATA+1 ; i++) {
		
		let data = [{ date   : '2021-04-24 16:00:16',
				      isDone : false, 
		              comment: 'Comment'+i
		           }]

		Healthbook.bulkCreate(data)
		.then(() => {
			return Healthbook.findAll();
		}).then(healthbooks => {
			console.log(healthbooks)
		});
	}
}