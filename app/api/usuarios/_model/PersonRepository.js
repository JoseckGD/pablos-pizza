import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';

let instance = null;

export default class PersonRepository {

    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    async registerPerson(data) {
        console.log(data);
        const { nombre, apellidos, correo, telefono } = data;
        return new Promise((resolve, reject) => {
            const query =
                'INSERT INTO personas (nombre, apellidos, correo, telefono) VALUES (?, ?, ?, ?)';
            const values = [nombre, apellidos, correo, telefono];
            dbPizzeriaConnection.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM personas WHERE id = ?';
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

    async editPerson(data) {
        const { nombre, apellidos, telefono, id } = data
        return new Promise((resolve, reject) => {
            const query = 'UPDATE personas SET nombre = ?, apellidos = ?, telefono = ? WHERE id = ?';
            const values = [nombre, apellidos, telefono, id];
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