import TodoList from './TodoList'
import { withTodoListLogic } from './TodoList.hoc'

export default withTodoListLogic(TodoList)
export * from './TodoList'
export * from './TodoList.hoc'
export { TodoList }