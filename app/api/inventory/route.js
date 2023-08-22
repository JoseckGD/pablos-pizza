import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../utils/dbPizzeriaConnection';

export async function GET(req, res) {
    try {
        const productos = await getAllProducts();
        if (productos.length > 0) {
            return NextResponse.json({ status: true, message: 'Productos', data: productos });
        }
        return NextResponse.json({ status: false, message: 'No hay datos', });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}

async function getAllProducts() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM catalogo_productos;';
        dbPizzeriaConnection.query(query, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}