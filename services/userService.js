const { UserRepository } = require('../repositories/userRepository');

class UserService {
  // TODO: Implement methods to work with user
  getAllUsers() {
    const allUsers = UserRepository.getAll();
    if (allUsers.length === 0) {
      throw Error('No active users');
    }
    return allUsers;
  }

  createUser(data) {
    const create = UserRepository.create(data);
    return create;
  }

  deleteUser(id) {
    const del = UserRepository.delete(id);
    return del;
  }

  updateUser(id, data) {
    const user = UserRepository.update(id, data);
    return user;
  }

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService();
