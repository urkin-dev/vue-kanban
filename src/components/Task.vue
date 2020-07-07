<template>
    <div class="task" :class="{'dark-task': isDarkMode}" draggable="true" @dragstart="dragStart">
        <p class="task__title">Задача № {{ data.id }}</p>
        <p class="task__value">{{ data.title }}</p>
        <div v-if="isProcess || isDone" class="task__row">
            <strong>Дата и время начала</strong>
            <span>{{ date() }}</span>
        </div>
        <div v-if="isDone" class="task__row">
            <strong>Ушло времени</strong>
            <span>{{ timePassed() }}</span>
        </div>
        <div v-if="isProcess || isDone" class="task__row">
            <strong>Ответственный</strong>
            <span>{{ data.user }}</span>
        </div>
        <div class="task__btns">
            <button @click="edit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#41b883" width="90%" height="90%" viewBox="0 0 48 48">
                    <path d="M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z"/>
                </svg>
            </button>
            <button @click="complete" v-if="!isProcess && !isDone">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#41b883" width="100%" height="100%" viewBox="0 0 48 48">
                    <path d="M18 32.34L9.66 24l-2.83 2.83L18 38l24-24-2.83-2.83z"/>
                </svg>
            </button>
            <button @click="complete" v-if="isProcess">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#41b883" width="100%" height="100%" viewBox="0 0 48 48">
                    <path d="M36 14l-2.83-2.83-12.68 12.69 2.83 2.83L36 14zm8.49-2.83L23.31 32.34 14.97 24l-2.83 2.83L23.31 38l24-24-2.82-2.83zM.83 26.83L12 38l2.83-2.83L3.66 24 .83 26.83z"/>
                </svg>
            </button>
            <button @click="deleteTask" v-if="isDone">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#41b883" width="100%" height="100%" viewBox="0 0 48 48">
                    <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/>
                </svg>
            </button>
        </div>
    </div>    
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Task',
    props: {
        data: Object
    },
    computed: {
        ...mapGetters(['getDarkModeStatus']),
        isProcess() {
            return this.data.status === 'Process'
        },
        isDone() {
            return this.data.status === 'Done'
        },
        isDarkMode() {
            return this.getDarkModeStatus;
        }
    },
    methods: {
        ...mapActions(['setStatus', 'delete', 'setModalEdit']),
        complete() {
            if (this.data.status === 'Planned') {
                this.setStatus({id: this.data.id, status: 'Process' });
            } else {
                this.setStatus({id: this.data.id, status: 'Done' });
            }
        },
        deleteTask() {
            this.delete({id: this.data.id});
        },
        edit() {
            this.setModalEdit( Object.assign({}, this.data) );
        },
        date() {
            return formatDate(this.data.date);
        },
        timePassed() {
            let diff = this.data.finishTime - this.data.date;

            const s = Math.floor(diff / 1000);
            const m = Math.floor(s / 60);
            const h = Math.floor(m / 60);
            const d = Math.floor(h / 24);

            return d + ' дней ' + h + ' часов ' + m + ' минут ' + s + ' секунд';
        },
        dragStart(e) {
            e.dataTransfer.setData("task/id", JSON.stringify(this.data.id));
        }
    }
}

function formatDate(date) {

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let sec = date.getSeconds();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    sec = sec < 10 ? '0' + sec : sec;
    hours = hours < 10 ? '0' + hours : hours;

    let month = date.getMonth() + 1;
    let days = date.getDate();

    month = month < 10 ? '0' + month : month;
    days = days < 10 ? '0' + days : days;

    let strTime = hours + ':' + minutes + ':' + sec;
    return days + '/' + month + "/" + date.getFullYear() + "  " + strTime;
}
</script>

<style scoped>
.task {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    width: 100%;
    min-height: 200px;
    background-color: #00e67734;
    cursor: pointer;
    padding: 10px;
    position: relative;
    padding-bottom: 50px;
}

.dark-task {
    background-color: #03dac593;
}

.dark-task .task__title,
.dark-task .task__value,
.dark-task .task__row {
    color: #1d1d1d;
}

.task__title {
    padding: 0;
    margin: 0;
    color: #41b883;
    font-weight: bold;
    font-size: 18px;
}

.task__value {
    display: block;
    margin-top: 10px;
    color: #41b883;
    width: 100%;
    word-break: break-all;
    padding: 0;
}

.task__row {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    color: #41b883;
}

.task__btns {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    min-width: 65px;
}

.task__btns button {
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    border: 1px solid #41b883;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.dark-task .task__btns button {
    border-color:#1d1d1d;
}

.dark-task svg {
    fill:#1d1d1d;
}
</style>