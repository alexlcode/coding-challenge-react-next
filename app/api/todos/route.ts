import { type NextRequest, NextResponse } from "next/server"
import { getTodos, createTodo } from "@/data/mock-todos"
import type { CreateTodoRequest } from "@/types/todo"

export async function GET() {
  try {
    const todos = getTodos()
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateTodoRequest = await request.json()

    if (!body.text || typeof body.text !== "string" || !body.text.trim()) {
      return NextResponse.json({ error: "Todo text is required and must be a non-empty string" }, { status: 400 })
    }

    const newTodo = createTodo(body.text.trim())
    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 })
  }
}
