import {SequelizeManager} from "../models";

const SPACE_MAX_RANDOM_DATA = 5

const now: Date = new Date();

export default async function(): Promise<void> {

	const {Space}  = await SequelizeManager.getInstance();

	for (let i = 1; i < SPACE_MAX_RANDOM_DATA+1 ; i++) {
		
		let data = [{ name          : 'Space'+i, 
		              description   : 'Description'+i, 
		              image         : 'Image'+i, 
		              type          : 'Type'+i,
		              capacity      : i+5,
		              duration      : 2*i+60,
		              opening       : '2021-04-24 16:00:16',
		              closing       : '2021-04-24 16:00:16',
		              disabledAccess: true
		           }]

		Space.bulkCreate(data)
		.then(() => {
			return Space.findAll();
		}).then(spaces => {
			console.log(spaces)
		});
	}
}