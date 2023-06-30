import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../utils/dbPizzeriaConnection';

export async function POST(req, res) {
    const body = await req.json()
    try {
        const email = await getEmailUser(body.correo)
        if (email.length > 0) {
            return NextResponse.json({ status: false, message: 'Error: el correo ya esta registrado' });
        }
        const { insertId } = await registerPerson(body);
        body.persona_id = insertId;
        const user = await registerUser(body);
        return NextResponse.json({ status: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al registrar el usuario: ', error: error });
    }
}

export async function PUT(req, res) {
    const body = await req.json()
    try {
        // if (await getEmailUser(body.correo)) {
        //     return NextResponse.json({ status: false, message: 'Error: el correo ya esta registrado' });
        // }
        if (await editUser(body)) {
            return NextResponse.json({ status: true, message: 'Usuario actualizado exitosamente' });
        }
        return NextResponse.json({ status: true, message: 'Error al actualizar el usuario' });

    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al actualizar el usuario: ', error: error });
    }
}

export async function GET(req, res) {
    try {
        const users = await getUsers();
        return NextResponse.json({ status: true, message: 'Hello from the API pizzeria', users: users });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}
// Funciones auxiliares

async function getUsers() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios, personas WHERE usuarios.persona_id = personas.id ';
        dbPizzeriaConnection.query(query, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

async function getEmailUser(correo) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios, personas WHERE usuarios.persona_id = personas.id AND personas.correo = ?';
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

async function registerUser(data) {
    console.log(data);
    const { persona_id, rol_id, correo } = data
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO usuarios (persona_id, rol_id, username, password) VALUES (?, ?, ?, ?)';
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

async function registerPerson(data) {
    console.log(data);
    const { nombre, apellidos, correo, telefono } = data
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO personas (nombre, apellidos, correo, telefono) VALUES (?, ?, ?, ?)';
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

async function editUser(data) {
    console.log(data);
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
