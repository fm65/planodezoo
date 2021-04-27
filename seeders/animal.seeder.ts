import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from "node:constants";
import {SequelizeManager} from "../models";

const ANIMAL_MAX_RANDOM_DATA = 20

export default async function(): Promise<void> {

	const {Animal}  = await SequelizeManager.getInstance();

	for (let i = 1; i < ANIMAL_MAX_RANDOM_DATA+1 ; i++) {
		
		let data = [{ name       : 'Animal'+i,
		              species    : 'Species'+i,
		              description: 'Description'+i
		           }]

		Animal.bulkCreate(data)
		.then(() => {
			return Animal.findAll();
		}).then(animals => {
			console.log(animals)
		});
	}
}