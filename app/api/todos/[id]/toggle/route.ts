import { type NextRequest, NextResponse } from "next/server"
import { toggleTodo } from "@/data/mock-todos"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updatedTodo = toggleTodo(params.id)

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle todo" }, { status: 500 })
  }
}
