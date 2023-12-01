import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from 'jsonwebtoken'; // Si planeas usar JWT para manejar sesiones

export const register = async (req, res) => {
  const { nombre, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña

  try {
    const newUser = await User.create({ nombre, email, username, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Aquí puedes generar un token JWT si lo necesitas
    res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};