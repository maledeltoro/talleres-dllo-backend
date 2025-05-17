const { findUserById, updateUserById, deleteUserById } = require('./users.actions');  // Asegúrate de que la ruta es correcta.
const argon2 = require('argon2');

async function getUser(req, res) {
    try {
        const userId = req.params.id || req.userId; 
        const user = await findUserById(userId, { enabled: true });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado o no habilitado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar usuario", error: error.message });
    }
}

async function updateUser(req, res) {
    const { name, email, password } = req.body;

    const userId = req.params.id || req.userId;


    try {
        let hashedPassword;
        if (password) {
            hashedPassword = await argon2.hash(password);
        }
        const updatedUser = await updateUserById(userId, { name, email, password: hashedPassword });
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el usuario", error: error.message });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.id;


    try {
        const result = await deleteUserById(userId);
        if (!result) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
    }
}

module.exports = { getUser, updateUser, deleteUser };