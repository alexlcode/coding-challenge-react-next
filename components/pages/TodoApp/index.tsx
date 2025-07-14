import TodoApp from './TodoApp'
import { withTodoAppLogic } from './TodoApp.hoc'

export default withTodoAppLogic(TodoApp)
export * from './TodoApp'
export * from './TodoApp.hoc'
export { TodoApp }