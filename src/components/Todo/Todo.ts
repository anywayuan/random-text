import {ref, reactive, Ref} from 'vue'
import {message as showMessage} from '../../utils'

interface TodoItem {
  title: string;
  id: number
}

/**
 * @function useAddTodoItem 新增相关逻辑
 * @param {TodoItem[]} todoList 待办列表
 * @return {string} todo_item 要新增的待办
 * @return {boolean} btnLoading 按钮loading
 * @return {Function} add 新增事件处理函数
 * */
interface useAddTodoItem {
  todo_item: Ref<string>;
  btnLoading: Ref<boolean>;
  add: Function
}

const useAddTodoItem = (todoList: TodoItem[]): useAddTodoItem => {
  let todo_item = ref<string>('')
  let btnLoading = ref<boolean>(false)
  let todo_item_id = 1

  const add = (): void => {
    if (!todo_item.value) {
      showMessage('error', '请输入内容！')
      return
    }
    btnLoading.value = true
    setTimeout(() => {
      todoList.push({title: todo_item.value, id: todo_item_id++})
      todo_item.value = ''
      btnLoading.value = false
      showMessage('success', '添加成功！')
    }, 500)
  }

  return {
    todo_item,
    btnLoading,
    add
  }
}

/**
 * @function useGetList 获取待办列表相关逻辑
 * @return {useGetList}
 * */
interface useGetList {
  todoList: TodoItem[]
}

const useGetList = (): useGetList => {
  let todoList: TodoItem[] = reactive([])

  return {
    todoList
  }
}

/**
 * @function useRemoveList 删除待办列表相关逻辑
 * @return {Function} delTodoItem 处理删除事件函数
 * */
interface useRemoveList {
  delTodoItem: Function
}

const useRemoveList = (todoList: TodoItem[]): useRemoveList => {
  const delTodoItem = (id: number) => {
    let arr = todoList.filter(todo => todo.id !== id)
    todoList.length = 0
    todoList.push(...arr)
  }

  return {
    delTodoItem
  }
}

export {
  useAddTodoItem,
  useGetList,
  useRemoveList
}
