import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        return NextResponse.json({ status: true, message: 'Hello from the API pizzeria' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}