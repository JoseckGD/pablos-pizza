import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';

export async function POST(req, res) {
    const body = await req.json();
    try {
        await registerProduct(body);
        return NextResponse.json({ status: true, message: 'Producto registrado exitosamente' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al registrar el producto: ', error: error });
    }
}

async function registerProduct(data) {
    console.log(data);
    const { nombre, descripcion, precio, cantidad } = data;
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO catalogo_productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)';
        const values = [nombre, descripcion, precio, cantidad];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}
