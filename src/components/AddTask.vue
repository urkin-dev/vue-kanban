<template>
    <div class="add-task" :class="{'dark-add-task': isDarkMode}">
        <form @submit="onSubmit">
            <input type="text" v-model="title" placeholder="Добавить новую задачу">
            <input type="text" v-model="user" placeholder="Ваше имя" class="username">
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#41b883" width="100%" height="100%" viewBox="0 0 48 48">
                    <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"/>
                </svg>
            </button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'AddTask',
    data() {
        return {
            title: '',
            user: ''
        }
    },
    methods: {
        ...mapActions(['addTask']),
        onSubmit(e) {
            e.preventDefault();
           
            if (this.title != '' && this.user != '') {
                this.addTask({ title: this.title, user: this.user });
                this.title = '';
                this.user = '';
            }
        }
    },
    computed: {
        ...mapGetters(['getDarkModeStatus']),
        isDarkMode() {
            return this.getDarkModeStatus;
        }
    }
}
</script>

<style scoped>
.add-task form {
    display: flex;
    align-items: center;
}

button {
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    width: 40px;
    height: 40px;
    cursor: pointer;
}

input[type="text"] {
    border: 1px solid #41b883;
    padding: 10px;
    height: 35px;
    border-radius: 10px;
    margin-right: 10px;
    color: rgb(41, 41, 41);
    font-size: 17px;
    min-width: 300px;
}

form .username {
    min-width: 200px;
}

input[type="text"]::placeholder {
    color: #41b883;
}

input[type="text"]:focus {
    border: none;
}

.dark-add-task svg {
    fill: #03dac593;
}

.dark-add-task input[type="text"] {
    border-color: #03dac593;
    background-color: #1d1d1d;
    color: #03dac593;
}

.dark-add-task input[type="text"]::placeholder {
    color: #03dac593;
}
</style>