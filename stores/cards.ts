import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export interface Task {
  id: Number,
  title: String,
  status: 'completed' | 'progress' | 'wasted' | 'todo',
  deadline: Date
}

export interface NewTask {
  title: String,
  deadline: Date | number | string
}

export const useCardStore = defineStore('CardStore', {
  state: () => ({
      cards: useLocalStorage('vueUseCards', [
        {
          date: "",
          tasks: [
            {id: 1, title: 'Теория по вычматам', status: 'progress', deadline: new Date('2022-11-27')},
            {id: 2, title: 'Дизайн футболки Насте', status: 'todo', deadline: new Date('2022-11-27')},
            {id: 3, title: 'Лаба по вычматам', status: 'completed', deadline: new Date('2022-11-24')},
            {id: 4, title: 'Лабы по физике', status: 'completed', deadline: new Date('2022-11-24')},
            {id: 5, title: 'Задача по физике', status: 'wasted', deadline: new Date('2022-11-25')},
            {id: 6, title: 'Дизайн инфоотделу', status: 'completed', deadline: new Date('2022-11-21')},
            {id: 7, title: 'Неделя по физике', status: 'wasted', deadline: new Date('2022-11-22')},
            {id: 8, title: 'Лекции по теорполу', status: 'completed', deadline: new Date('2022-11-23')},
            {id: 9, title: 'Вторая задача по теорполу', status: 'completed', deadline: new Date('2022-11-23')},
            {id: 10, title: 'Задачи по урматам', status: 'completed', deadline: new Date('2022-11-23')},
            {id: 11, title: 'Дизайн Гринтеху', status: 'todo', deadline: new Date('2022-11-26')},
            {id: 12, title: 'Контрольная по вычматам', status: 'todo', deadline: new Date('2022-12-07')},
            {id: 13, title: 'Контрольная по теорполу', status: 'todo', deadline: new Date('2022-12-13')},
            {id: 14, title: 'Третья задача по теорполу', status: 'completed', deadline: new Date('2022-11-26')},
            {id: 15, title: 'Задание по урматам', status: 'todo', deadline: new Date('2022-12-08')},
          ] as Task[]
        },
      ])
  }),
  actions: {
    addTask(newTask: NewTask) {
      this.cards.map(card => card.tasks.push({id: new Date().getTime(), title: newTask.title, status: 'todo', deadline: new Date(newTask.deadline)}))
    },
    changeTaskStatus(param: any) {
      if (param.newStatus == 'deleted') {
        for (let i = 0; i < this.cards.length; i++) {
          const card = this.cards[i];
          if (card.date === param.cardDate) {
            card.tasks = card.tasks.filter(task => task.id !== param.taskId)
          }
        }
        
      } else {
        this.cards.find(card => card.date == param.cardDate)?.tasks.map(task => task.id === param.taskId ? task.status = param.newStatus : task.status)
      }
    }
  },
  getters: {
    
  }
})