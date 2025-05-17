const User = require('../users/users.model');

const permissions = {

  canCreateBook: async (req, res, next) => {
    const user = await User.findById(req.userId);

    if (user && user.createBook) {
      return next();
    }
    return res.status(403).json({ message: "No tienes permiso para crear libros" });
  },

  canEditBook: async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (user && user.editBook) {
      return next();
    }
    return res.status(403).json({ message: "No tienes permiso para editar libros" });
  },

  canDeleteBook: async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (user && user.deleteBook) {
      return next();
    }
    return res.status(403).json({ message: "No tienes permiso para eliminar libros" });
  },

  canEditUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);

      if (user && (user.editUser || user._id.toString() === req.params.id)) {
        return next();
      }

      return res.status(403).json({ message: "No tienes permiso para editar usuarios" });
    } catch (error) {
      return res.status(500).json({ message: "Error en la verificación de permisos" });
    }
  },

   canDeleteUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
  
      if (user && (user.deleteUser || user._id.toString() === req.params.id)) {
        return next(); 
      }
  
      return res.status(403).json({ message: "No tienes permiso para inhabilitar usuarios" });
    } catch (error) {
      return res.status(500).json({ message: "Error en la verificación de permisos" });
    }
  }
};

module.exports = permissions;
