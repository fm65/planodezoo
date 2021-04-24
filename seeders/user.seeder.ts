import {SequelizeManager} from "../models";
import {hash} from "bcrypt";

const USER_MAX_RANDOM_DATA = 10

export default async function(): Promise<void> {

	const {User}  = await SequelizeManager.getInstance();

	for (let i = 1; i < USER_MAX_RANDOM_DATA+1 ; i++) {

		let password = 'password'+i; 

		let passwordHashed = await hash(password, 5);

		//['guest', 'employee', 'veterinary', 'admin']
		
		let role = 0; //guest

		if (i == 1 || i == 2){ role = 3}; //admin
		if (i == 3){ role = 2}; //veterinary
		if (i == 4){ role = 1}; //employee
		
		let data = [{ firstname: 'Firstname'+i, 
		              lastname : 'Lastname'+i, 
		              login    : 'login'+i, 
		              password : passwordHashed,
		              email    : 'email'+i+'@demo.com',
		              role     : role
		           }]

		User.bulkCreate(data)
		.then(() => {
			return User.findAll();
		}).then(users => {
			console.log(users)
		});
	}
}