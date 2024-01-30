import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function action({
    request,
}: ActionFunctionArgs) {
    const body = await request.formData();
    const text = body.get("title") as string;
    await prisma.todo.create({
        data: {
            text: text
        }
    });
    return redirect(`/`);
}


export default function Todos() {
    return (
        <div className="flex w-screen justify-center items-center" style={{ minHeight: '100vh' }}>
            <Form method="post" className="bg-white py-8 px-14 rounded shadow">
                <h1 className="text-4xl mb-5 font-semibold text-gray-800">Add Todo</h1>
                <input type="text" name="title" className="border-2 border-gray-500 h-14 mr-4 rounded focus:outline-none pl-2 min-w-52" />
                <button type="submit" className="bg-green-500 mb-2 hover:bg-green-600  text-white rounded-xl px-7 py-3  shadow text-lg">Add Todo</button>
            </Form>
        </div>
    );
}
