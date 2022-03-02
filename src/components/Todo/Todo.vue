<script lang="ts">
import {defineComponent} from 'vue'
import {useAddTodoItem, useGetList, useRemoveList} from './Todo'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let {todoList} = useGetList()
    let {add, todo_item, btnLoading} = useAddTodoItem(todoList)
    let {delTodoItem} = useRemoveList(todoList)
    return {
      msg: props.msg,
      todoList,
      add,
      todo_item,
      btnLoading,
      delTodoItem
    }
  },
})
</script>

<template>
  <div class="page">
    <h1 class="title">
      <span>{{ msg }}</span>
    </h1>
    <div class="todo">
      <a-input
        placeholder="情输入待办"
        v-model:value="todo_item"
        style="width: 200px;"
        :disabled="btnLoading"
        @pressEnter="add"
      />
      <a-button type="primary" @click="add" :loading="btnLoading">添加</a-button>
    </div>
    <a-list item-layout="horizontal" :data-source="todoList">
      <template #renderItem="{ item }">
        <a-list-item @click="delTodoItem(item.id)">
          <a-list-item-meta
            description="凡事预则立，不预则废。"
          >
            <template #title>
              <a href="#">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: 12px;

  .title {
    span {
      color: #008c8c;
    }
  }

  .todo {
    .ant-input {
      width: 200px;
      margin-right: 12px;
    }
  }
}
</style>
