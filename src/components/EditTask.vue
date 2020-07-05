<template>
    <div class="modal-wrapper">
        <p class="error">{{ error }}</p>
        <form class="modal-form" @submit.prevent="saveTask">
            <input type="text" class="modal-form__value" placeholder="Введите описание" v-model="data.title">
            <select class="modal-form__status" v-model="data.status">
                <option value="Planned">План</option>
                <option value="Process">В процессе</option>
                <option value="Done">Готово</option>
            </select>
            <input type="text" class="modal-form__user" placeholder="Ваше имя" v-model="data.user">
            <button type="submit">Закрыть</button>
        </form>
        <button type="submit" class="modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#41b883" width="100%" height="100%" viewBox="0 0 48 48">
                    <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/>
            </svg>
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'EditTask',
    data() {
        return {
            data: {},
            error: ''
        }
    },
    mounted() {
        this.data = this.$store.getters.getModalData;
    },
    methods: {
        ...mapActions(['setModalEdit']),
        closeModal() {
            this.setModalEdit({ isVisible: false, data: {} })
        },
        saveTask() {
            if (this.data.title == '' || this.data.user == '') {
                this.error = 'Пожалуйста, заполните поля';
            } else {
                this.error = '';
            }

            if (this.data.status === 'Process') {
                this.data.date = new Date();
            }

            if (this.data.status === 'Done') {
                this.data.date = new Date();
                this.data.finishTime = new Date();
            }
        }
    }
}
</script>

<style scoped>
.modal-wrapper {
    position: absolute;
    background-color: #ffffff;
    width: 400px;
    min-height: 400px;
    top: 20%;
    left: 50%;
    transform: translateX(-200px);   
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #228157;
    border-radius: 10px;
    z-index: 10000;
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
</style>