<template>
    <div class="column">
        <h2 class="column__title">{{ title }} ({{tasks.length}})</h2>
        <div class="column__content">
            <Task v-for="task in tasks" :key="task.id" :data='task' />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Task from './Task'

export default {
    name: 'Column',
    props: {
        title: String,
        status: String
    },
    computed: {
        ...mapGetters(['getTasks']),
        tasks() {
            return this.getTasks(this.status)
        }
    },
    components: {
        Task
    }
}
</script>

<style scoped>
.column {
    max-width: 250px;
    width: 250px;
    min-height: 100px;
    max-height: 500px;
    border: 1px solid #00e676;
    border-radius: 5px;
    padding: 20px;
    color: rgb(46, 46, 46);
    overflow: auto;
}

.column__title {
    padding: 0;
    margin: 0;
}

.column__content {
    display: flex;
    flex-direction: column;
}
</style>