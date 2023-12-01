import User from '../models/User.js';

export default class UserController {
	 async getAll(req, res) {
		const users = await User.findAll();
		res.send(users);
	}

	async getBynombre(req, res) {
		const users = await User.findAll({
			where: {
				nombre: req.params.nombre
			}
		});
		res.send(users);
	}

	async get(req, res) {
		const user = await User.findByPk(req.params.userId);
		res.send(user);
	}

	async create(req, res) {
		const user = await User.create({
			nombre: req.body.nombre,
			email: req.body.email,
			username: req.body.username,
    		password: req.body.password,
			userType: req.body.userType,
		});
		res.send(user);
	}

	async update(req, res) {
		const user = await User.findByPk(req.params.userId);
		user.update({nombre: req.body.nombre, email: req.body.email});
		res.send(user);
	}

	async delete(req, res) {
		await User.destroy({where: {id: req.params.userId}});
		res.send({status: "ok"});
	}

	async login(req, res) {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        if (user.password !== password) {
            return res.status(401).send({ message: "Contraseña incorrecta" });
        }

        // Aquí, deberías generar un token de autenticación o una sesión
        // Por simplicidad, simplemente devolveremos los datos del usuario
        res.send({ 
            message: "Inicio de sesión exitoso",
            user
        });
	}
};


