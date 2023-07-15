<template>
  <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl drop-shadow-xl relative overflow-hidden transition">
    <div class="absolute w-full top-0 left-0 h-0.5 grid grid-flow-col auto-cols-auto gap-0.5">
      <div v-for="(task, index) in sortedCardInfo" :key="index" :class="[task.status == 'completed' ? colors.completed.bg : task.status == 'progress' ? colors.progress.bg : task.status == 'wasted' ? colors.wasted.bg : colors.todo.bg]"></div>
    </div>
    <h4 class="text-gray-100 font-light text-2xl mb-2">{{cardInfo.date}}</h4>
    <div class="flex flex-col space-y-4">
      <transition-group name="list-complete">
      <div v-for="(task, index) in sortedCardInfo" :key="index" :class="[task.status == 'completed' ? colors.completed.text : task.status == 'progress' ? colors.progress.text : task.status == 'wasted' ? colors.wasted.text : colors.todo.text]" class="relative transition ease-in-out">
        <Bar :task="task" :cardDate="cardInfo.date" @changeTaskStatus="changeTaskStatus"/>
      </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
    import Bar from '../components/Bar.vue'
    interface Task {
      id: Number,
      title: String,
      status: 'completed' | 'progress' | 'wasted' | 'todo',
      deadline: Date
    }
    export default {
        name: 'Card',
        props: ['cardInfo', 'sortTasks'],
        components: {
            Bar
        },
        data() {
            return {
                colors: {
                  'completed': {
                    'bg' : 'bg-green-400',
                    'text': 'text-green-400 line-through'
                  },
                  'progress': {
                    'bg' : 'bg-blue-400',
                    'text': 'text-blue-400'
                  },
                  'wasted': {
                    'bg' : 'bg-red-400',
                    'text': 'text-red-400'
                  },
                  'todo': {
                    'bg' : 'bg-gray-400',
                    'text': 'text-gray-400'
                  },
                }
            }
        },
        methods: {
          dayDistance(deadline: Date) {
            return Math.round((new Date(deadline).getTime() - new Date(new Date().toDateString()).getTime())/1000/60/60/24)
          },
          changeTaskStatus(param: any) {
            this.$emit('changeTaskStatus', param)
          }
        },
        computed: {
          sortedCardInfo() {
            const middle = this.cardInfo.tasks.sort((a: Task, b: Task) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
            return middle.filter((task: Task) => (task.status == 'completed' ? this.sortTasks.completed == true : task) && (task.status == 'progress' ? this.sortTasks.progress == true : task) && (task.status == 'todo' ? this.sortTasks.todo == true : task) && (task.status == 'wasted' ? this.sortTasks.wasted == true : task))
          }
        }
    }

</script>

<style scope>

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>