import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';

let instance = null;

export default class UserRepository {

    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    async getUsers() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuarios, personas WHERE usuarios.persona_id = personas.id';
            dbPizzeriaConnection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    async getEmailUser(correo) {
        return new Promise((resolve, reject) => {
            const query =
                'SELECT * FROM usuarios, personas WHERE usuarios.persona_id = personas.id AND personas.correo = ?';
            const values = [correo];
            dbPizzeriaConnection.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    async getUserByID(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuarios, personas WHERE (usuarios.persona_id = personas.id) AND usuarios.persona_id = ?';
            const values = [id];
            dbPizzeriaConnection.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    async registerUser(data) {
        console.log(data);
        const { persona_id, rol_id, correo } = data;
        return new Promise((resolve, reject) => {
            const query =
                'INSERT INTO usuarios (persona_id, rol_id, username, password) VALUES (?, ?, ?, ?)';
            const values = [persona_id, rol_id, correo, correo];
            dbPizzeriaConnection.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM usuarios WHERE id = ?';
            const values = [id];
            dbPizzeriaConnection.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(true);
            });
        });
    }
}
