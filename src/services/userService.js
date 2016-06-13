
export const userList = () => {
  return $User.findAll({
    raw: true,
    order: 'id desc'
  });
};

export const addUser = async user => {
  try {
    const transaction = await $sequelize.transaction();
    const newUser = await $User.create(user, {transaction});
    await transaction.commit();
    return {err: null};
  } catch (e) {
    console.log(e);
    return {err: 'add user failed.'};
  }
};
