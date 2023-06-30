import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';

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
