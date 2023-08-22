import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';

export async function PUT(req, res) {
    const body = await req.json();
    try {
        if (await editProduct(body)) {
            return NextResponse.json({ status: true, message: 'Producto actualizado exitosamente' });
        }
        return NextResponse.json({ status: false, message: 'No existe ese registro de producto' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al actualizar el producto: ', error: error });
    }
}

async function editProduct(data) {
    console.log(data);
    const { nombre, descripcion, precio, cantidad, id } = data;
    return new Promise((resolve, reject) => {
        const query = 'UPDATE catalogo_productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id = ?';
        const values = [nombre, descripcion, precio, cantidad, id];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(true);
        });
    });
}
