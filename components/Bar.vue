<template>
    <div class="flex xs:flex-row flex-col gap-4 items-center justify-between rounded-xl bg-gray-200/50 dark:bg-gray-700/50 px-4 py-2 overflow-auto">
        <div class="flex flex-row items-center space-x-4">
            <div class="h-8 aspect-square bg-gray-200 dark:bg-gray-600 rounded-full ring ring-current"></div>
            <div class="flex flex-col">
                {{task.title}}
                <span class="text-sm" :class="[taskPriority(task)]">
                    <span v-if="dayDistance(task.deadline) >= 0">{{dayDistance(task.deadline)}} {{(dayDistance(task.deadline) % 10 == 1) ? 'день остался' : ((dayDistance(task.deadline) % 10 <= 4) && (dayDistance(task.deadline) % 10 >= 2) && (dayDistance(task.deadline) < 10)) ? 'дня осталось' : 'дней осталось'}}</span>
                    <span v-else>{{-dayDistance(task.deadline)}} {{(-dayDistance(task.deadline) % 10 == 1) ? 'день' : ((-dayDistance(task.deadline) % 10 <= 4) && (-dayDistance(task.deadline) % 10 >= 2) && (dayDistance(task.deadline) < 10)) ? 'дня' : 'дней'}} назад</span>
                </span>
            </div>
        </div>
        
        <div class="flex gap-4">
            <button @click="$emit('changeTaskStatus', {taskId: task.id, newStatus: 'completed', cardDate: cardDate})">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506" xml:space="preserve" class="h-5">
                    <g><path fill="#22c55e" d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/></g>
                </svg>
            </button>
            <button @click="$emit('changeTaskStatus', {taskId: task.id, newStatus: 'wasted', cardDate: cardDate})">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve" class="h-4">
                    <g><path fill="#ef4444" d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/></g>
                </svg>
            </button>
            <button @click="$emit('changeTaskStatus', {taskId: task.id, newStatus: 'progress', cardDate: cardDate})">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" class="h-5">
                    <path fill="#3b82f6" d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm2.5,14.33c.479-.276,.643-.888,.366-1.366l-1.866-3.232V6c0-.552-.447-1-1-1s-1,.448-1,1v6c0,.176,.046,.348,.134,.5l2,3.464c.186,.321,.521,.5,.867,.5,.17,0,.342-.043,.499-.134Z"/></svg>
            </button>
            <button @click="$emit('changeTaskStatus', {taskId: task.id, newStatus: 'todo', cardDate: cardDate})">
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" class="h-5 transition hover:rotate-180">
                    <path fill="#9ca3af" d="M12,2a10.032,10.032,0,0,1,7.122,3H16a1,1,0,0,0-1,1h0a1,1,0,0,0,1,1h4.143A1.858,1.858,0,0,0,22,5.143V1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1V3.078A11.981,11.981,0,0,0,.05,10.9a1.007,1.007,0,0,0,1,1.1h0a.982.982,0,0,0,.989-.878A10.014,10.014,0,0,1,12,2Z"/>
                    <path fill="#9ca3af" d="M22.951,12a.982.982,0,0,0-.989.878A9.986,9.986,0,0,1,4.878,19H8a1,1,0,0,0,1-1H9a1,1,0,0,0-1-1H3.857A1.856,1.856,0,0,0,2,18.857V23a1,1,0,0,0,1,1H3a1,1,0,0,0,1-1V20.922A11.981,11.981,0,0,0,23.95,13.1a1.007,1.007,0,0,0-1-1.1Z"/>
                </svg>
            </button>
            <button @click="$emit('changeTaskStatus', {taskId: task.id, newStatus: 'deleted', cardDate: cardDate})">
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" class="h-5">
                    <path fill="#f97316" d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/>
                    <path fill="#f97316" d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/>
                    <path fill="#f97316" d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    interface Task {
        id: Number,
        title: String,
        status: 'completed' | 'progress' | 'wasted' | 'todo',
        deadline: Date
    }
    export default {
        name: 'Bar',
        props: ['task', 'cardDate'],
        components: {
            
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
            taskPriority(task: Task): String {
                let line: String = ''
                if (task.status == 'completed') {
                line = this.colors.completed.text
                }
                else {
                if (this.dayDistance(task.deadline) >= 3) {
                    line = 'text-gray-400'
                } else if (this.dayDistance(task.deadline) == 2) {
                    line = 'text-yellow-400'
                } else if (this.dayDistance(task.deadline) <= 1) {
                    line = 'text-red-400'
                }
                }
                return line
            }
        },
    }

</script>

<style scope>

</style>