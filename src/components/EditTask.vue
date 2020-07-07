// Нужно сохранять состояние глобально идиот!!!!!

<template>
    <div class="modal-wrapper">
        <p class="error">{{ error }}</p>
        <form class="modal-form" @submit.prevent="saveModal">
            <input type="text" class="modal-form__value" placeholder="Введите описание" v-model="data.title">
            <select class="modal-form__status" v-model="data.status">
                <option value="Planned">План</option>
                <option value="Process">В процессе</option>
                <option value="Done">Готово</option>
            </select>
            <input type="text" class="modal-form__user" placeholder="Ваше имя" v-model="data.user">
            <label v-if="isProcess || isDone" for="start-date">Дата и время начала</label>
            <DatePicker 
                id="start-date" 
                v-if="isProcess || isDone" 
                v-model="data.date" 
                type="datetime" 
                class="date-picker"
                placeholder="Choose start time"
            >
            </DatePicker>
            <label  v-if="isDone" for="finish-date">Дата и время завершения</label>
            <DatePicker 
                id="finish-date" 
                v-if="isDone" 
                v-model="data.finishTime" 
                type="datetime" 
                value-type="date" 
                class="date-picker"
                placeholder="Choose finish time">
            </DatePicker>
            <button type="submit">Сохранить</button>
        </form>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

import { mapActions } from 'vuex'

export default {
    name: 'EditTask',
    data() {
        return {
            data: Object.assign({}, this.$store.getters.getModalData),
            error: ''
        }
    },
    computed: {
        isProcess() {
            return this.data.status === 'Process';
        },
        isDone() {
            return this.data.status === 'Done';
        }
    },
    methods: {
        ...mapActions(['closeModalEdit', 'setTaskData']),
        saveModal() {
            if (this.data.title.trim() === '' || this.data.user.trim() === '') {
                this.error = 'Пожалуйста, заполните поля';
            } else {
                this.error = '';
            }

            if (this.isProcess && this.data.date == undefined) {
                this.error = 'Пожалуйста, заполните поля';
            }

            if (this.isDone) {
                if (this.data.finishTime == undefined) {
                    this.error = 'Пожалуйста, зполните поля';
                } else if (this.data.finishTime <= this.data.date) {
                    this.error = 'Выберите другое время';
                }
            }

            if (this.error === '') {
                this.setTaskData(this.data);
                this.closeModalEdit();
            }

        }
    },
    components: {
        DatePicker
    }
}
</script>

<style scoped>
.modal-wrapper {
    position: absolute;
    background-color: #ffffff;
    width: 400px;
    min-height: 400px;
    top: 5%;
    left: 50%;
    transform: translateX(-200px);   
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #228157;
    border-radius: 10px;
    z-index: 1;
    flex-direction: column;
}

.modal-form {
    display: flex;
    flex-direction: column;
}

.modal-form__value,
.modal-form__status,
.modal-form__user {
    border: 1px solid #228157;
    background-color: transparent;
    margin-top: 10px;
    height: 30px;
    min-width: 250px;
    border-radius: 5px;
    padding-left: 10px; 
    color: rgb(31, 31, 31);
}

.modal-form__value,
.modal-form__user {
    padding: 10px;
}

.modal-form__value::placeholder,
.modal-form__status::placeholder,
.modal-form__user::placeholder {
    color: #228157;
}

.modal-form button {
    background-color: #228157;
    margin-top: 30px;
    height: 30px;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
}

.modal-close {
    width: 30px;
    height: 30px;
    position: absolute;
    padding: 0;
    background-color: transparent;
    top: 10px;
    right: 10px;
    border: none;
    outline: none;
    cursor: pointer;
}

.error {
    padding: 0;
    margin: 0;
    color: rgb(131, 58, 58);
}

.date-picker {
    min-width: 250px;
    border: 1px solid #228157;
    border-radius: 5px;
}

label {
    margin: 0;
    padding: 0;
    color: #228157;
    margin-top: 10px;
}
</style>