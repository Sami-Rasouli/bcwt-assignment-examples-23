'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
   
    try {

      const sql = `SELECT user_id, name, email FROM wop_user`;
      const [rows] = await promisePool.query(sql);
      return rows;

    } catch (e) {
      console.error('error', e.message);
      throw new Error('sql query failed');
    }
};

const getUserById = async (id) => {
  try{
      const sql = `SELECT * FROM wop_user WHERE user_id=?`;
      const [rows] = await promisePool.query(sql, [id]);
      return rows;
  }catch(e){
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};

const insertUser = async (user) => {
  try{
    const sql = `INSERT INTO wop_user VALUES (?,?,?,?,?)`;
    const [rows] = await promisePool.query(sql, [
      null, // id is Auto_Increment
      user.name,
      user.email,
      user.passwd,
      0,
    ]);

    return rows;
  }catch(e){
    console.error('error', e.message);
    throw new Error('sql insert user failed');
  }
};

const modifyUser = async(user) => {
  try{
    const sql = `UPDATE wop_cat SET name=?, email=?, password=? roll=? WHERE user_id=?`;
    const [rows] = await promisePool.query(sql, [
      user.name,
      user.email,
      user.passwd,
      0,
      user.id
    ]);

    return rows;
  } catch(e){
    console.error('error', e.message);
    throw new Error('sql Update User Failed');
  }
};

const deleteUser = async (id) => {
  try{
    const sql = `DELETE FROM wop_user WHERE user_id=?`;
    const [rows] = await promisePool.query(sql, [id]);

    return rows;
  }catch(e){
    consloe.error('error', e.message);
    throw new Error('sql delete User Failed');
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    modifyUser,
    deleteUser,
};
