import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { PrismaClient } from '@prisma/client';
import type { Todo as TodoType } from "@prisma/client";

const prisma = new PrismaClient();

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData();
  const id = body.get("id") as string;

  await prisma.todo.delete({
    where: {
      id: parseInt(id)
    }
  });
  return redirect(`/`);
}

export const loader = async () => {
  const data: TodoType[] = await prisma.todo.findMany();
  return data;
};


export default function Todos() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="w-screen flex flex-col items-center justify-center" style={{ minHeight: '100vh' }}>
      <Link to="/todo" className="bg-white px-4 py-2 rounded text-lg hover:bg-gray-100 shadow">Add Todo</Link>
      <div className="bg-white mt-5 p-5 rounded">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-3">Your Todo List</h1>
        {data.map(todo => (
          <Form method="post" key={todo.id} className="flex gap-10 bg-violet-200 px-4 py-2 rounded my-2">
            <h3 className="text-2xl min-w-52">{todo.text}</h3>
            <input type="hidden" name="id" value={todo.id} />
            <button type="submit" className="bg-red-500 text-white rounded hover:bg-red-600 px-4 py-2"  >Delete</button>
          </Form>
        ))}
      </div>
    </div>
  );
}
