import { type NextRequest, NextResponse } from "next/server"
import { getTodoById, updateTodo, deleteTodo } from "@/data/mock-todos"
import type { UpdateTodoRequest } from "@/types/todo"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const todo = getTodoById(params.id)

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch todo" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body: UpdateTodoRequest = await request.json()

    if (!body.text || typeof body.text !== "string" || !body.text.trim()) {
      return NextResponse.json({ error: "Todo text is required and must be a non-empty string" }, { status: 400 })
    }

    const updatedTodo = updateTodo(params.id, body.text.trim())

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = deleteTodo(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 })
  }
}
