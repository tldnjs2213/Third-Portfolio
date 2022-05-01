let express = require('express');
let router = express.Router();
let User = require('../models').User;

/* GET users listing. */

router.get('/', async (req, res, next) => {
	const { phone } = req.query;

	try {
		let user = await User.findOne({
			where: { phone },
		});

		if(!user){
			user = new User();
			user.point = 0;
			user.phone = phone;
			user = await user.save();
		}

		res.send({ point: user ? user.point : 0 });
	} catch (err) {
		res.status(500).send({ message: err.message || 'error' });
	}
});
router.get('/order', async (req, res, next) => {
	let { phone, point, save } = req.query;
	//let phoneNum = true;
		console.log(req.query.phone);
		try {
			const user = await User.findOne({
				where: { phone },
			});
			point = point || 0;
			save = save || 0;
			const newPoint = (user.point - +point + +save);
			user.point = newPoint;
			console.log(newPoint);
			await user.save();
	
			res.send({ user });
		} catch (err) {
			phoneNum = false;
			res.status(500).send({ message: err.message || 'error' });
		} 
		/* finally {
			if(!phoneNum)
			{
				try {
					console.log(save);
					let newUser = {
						name: 'newOne',
						phone: req.query.phone,
						point: req.query.save
					}
					console.log(newUser);
					const newPeople = await User.create(newUser);
					res.send({ newPeople });
				} catch (err) {
					try {
						const user = await User.findOne({
							where: { phone },
						});
						point = point || 0;
						save = save || 0;
						const newPoint = (save);
						user.point = newPoint;
						console.log(newPoint);
						await user.save();
				
						res.send({ user });
					} catch (err) {
						res.status(500).send({ message: err.message || 'error' });
					}
				}	
			}
			
		}*/
	
});

module.exports = router;
