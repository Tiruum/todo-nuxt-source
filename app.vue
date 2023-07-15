<script lang="ts">
import { useCardStore } from './stores/cards';
import Card from "./components/Card.vue";
export default {
  components: { Card },
  methods: {
    showModal() {
      if (this.cardStore.cards.filter(card => card.date !== new Date().toLocaleDateString())) {
        this.showTrigger = true;
      } else {
        alert('Уже есть запись на ' + new Date().toLocaleDateString())
      }
    },
    hideModal() {
      this.showTrigger = false;
    },
    addTask() {
      if (this.newTask.title != '' && this.newTask.deadline != '') {
        // this.cards.map(card => card.date == '21.11 - 27.11' ? card.tasks.push({id: new Date().getTime(), title: this.newTask.title, status: 'todo', deadline: new Date(this.newTask.deadline)}) : alert('Не найдено'))
        this.cardStore.addTask(this.newTask)
        this.hideModal()
      }
    },
    changeTaskStatus(param: any) {
      this.cardStore.changeTaskStatus(param)
    }
  },
  data() {
    return {
      cardStore: useCardStore(),
      showTrigger: false,
      newTask: {
        title: '',
        deadline: '',
      },
      sortTasks: {
        completed: false,
        progress: true,
        todo: true,
        wasted: false
      }
    }
  }
}
</script>

<template>
  <transition name="fade">
    <div v-show="showTrigger" class="fixed z-30 justify-center items-center">
      <div class="fixed bg-gray-200/75 dark:bg-gray-900/75 z-10 w-screen h-screen cursor-pointer" @click="hideModal"></div>
  
      <div class="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 xl:w-1/2 h-fit bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-100 p-8 space-y-4">
        <div class="w-full text-gray-900 dark:text-gray-50 text-xl">
          <span class="text-left font-light">Добавить новую задачу </span>
          <span class="text-right font-normal">{{new Date().toLocaleDateString()}}</span>
        </div>
        <form class="space-y-4" @submit.prevent="addTask">
          <div class="grid grid-cols-12 gap-2">
            <input type="text" class="inpt col-span-12 lg:col-span-9" placeholder="Название" v-model="newTask.title" />
            <input type="date" class="inpt col-span-12 lg:col-span-3" placeholder="Дедлайн" v-model="newTask.deadline" />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button type="submit" class="px-4 py-1 rounded-xl w-full bg-gray-50/75 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700">Готово!</button>
            <button class="px-4 py-1 rounded-xl w-full bg-gray-50/75 hover:bg-gray-50 dark:bg-gray-700/50 dark:hover:bg-gray-700 text-red-500" @click="() => newTask.title = newTask.deadline = ''">Очистить все</button>
          </div>
        </form>
      </div>
    </div>
  </transition>

  <div class="dark:bg-gray-900 h-full w-full min-h-screen transition-all">
    <div class="xl:w-4/5 w-[92%] xl:ml-[10%] ml-[4%] space-y-5 pt-8">
      <h1 class="text-gray-900 dark:text-gray-50 text-3xl text-center">To do manager</h1>
      <h1 class="text-gray-800 dark:text-gray-100 text-md text-center">Всего: {{cardStore.cards.map(card => card.tasks.length).reduce((a, b) => a + b, 0)}} |
      Предстоит: <b class="text-gray-400">{{cardStore.cards.map(card => card.tasks.filter(task => task.status == 'todo').length).reduce((a, b) => a + b, 0)}}</b> |
      Выполнено: <b class="text-green-400">{{cardStore.cards.map(card => card.tasks.filter(task => task.status == 'completed').length).reduce((a, b) => a + b, 0)}}</b> |
      В процессе: <b class="text-blue-400">{{cardStore.cards.map(card => card.tasks.filter(task => task.status == 'progress').length).reduce((a, b) => a + b, 0)}}</b> |
      Провалено: <b class="text-red-400">{{cardStore.cards.map(card => card.tasks.filter(task => task.status == 'wasted').length).reduce((a, b) => a + b, 0)}}</b></h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="order-last lg:order-first text-gray-800 bg-gray-100 dark:text-white dark:bg-gray-800 px-8 py-1 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <input id="sortTasksCompleted" class="form-check-input appearance-none h-4 w-4 border border-green-400 rounded-sm bg-white dark:bg-gray-800 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" v-model="sortTasks.completed">
            <label for="sortTasksCompleted" class="text-green-400">Completed</label>
          </div>
          <div>
            <input id="sortTasksProgress" class="form-check-input appearance-none h-4 w-4 border border-blue-400 rounded-sm bg-white dark:bg-gray-800 checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" v-model="sortTasks.progress">
            <label for="sortTasksProgress" class="text-blue-400">Progress</label>
          </div>
          <div>
            <input id="sortTasksTodo" class="form-check-input appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white dark:bg-gray-800 checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" v-model="sortTasks.todo">
            <label for="sortTasksTodo" class="text-gray-400">To do</label>            
          </div>
          <div>
            <input id="sortTasksWasted" class="form-check-input appearance-none h-4 w-4 border border-red-400 rounded-sm bg-white dark:bg-gray-800 checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" v-model="sortTasks.wasted">
            <label for="sortTasksWasted" class="text-red-400">Wasted</label>            
          </div>
        </div>
        <button class="order-first lg:order-last text-gray-800 bg-gray-100 dark:text-white dark:bg-gray-800 px-8 py-1 rounded-xl" @click="showModal">Добавить задачу</button>
      </div>
      <div class="w-full grid lg:grid-cols-2 grid-cols-1 gap-6">
        
        <Card @changeTaskStatus="changeTaskStatus" v-for="(item, index) in cardStore.cards" :key="index" :cardInfo="item" :sortTasks="sortTasks" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>