const state = {
    tasks: [],
    isModalVisible: false,
    modalData: undefined,
    isDarkMode: false
};

const getters = {
    getTasks (state) {
        return (status) => {
            return state.tasks.filter(task => task.status === status)
        }
    },
    getEditStatus: (state) => (state.isModalVisible),
    getModalData: (state) => (state.modalData),
    getDarkModeStatus: (state) => (state.isDarkMode)
};

const actions = {

    async addTask({ commit }, { title, user }) {
        commit('newTask', { title, user });
    },

    async setStatus({ commit }, { id, status }) {
        commit('setTaskStatus', { id, status })
    },

    async delete({ commit }, {id}) {
        commit('deleteTask', id)
    },

    async setModalEdit({ commit }, data) {
        commit('setModalData', data)
        commit('setModalVisible', { isVisible: true })
    },

    async closeModalEdit({ commit }) {
        commit('setModalVisible', { isVisible: false })
    },

    async setTaskData({ commit }, data) {
        commit('changeTaskData', data)
    },

    async darkModeToggle({ commit }) {
        commit('toggleDark');
    }

};

const mutations = {
    newTask: (state, { title, user }) => {
        let id;
        if (state.tasks.length === 0) {
            id = 1;
        } else {
            id = Math.max(...state.tasks.map(task => task.id)) + 1;
        }

        const task = {
            id: id,
            title: title,
            status: 'Planned',
            user: user
        };

        state.tasks.push(task);
    },
    setTaskStatus: (state, { id, status }) => {
        
        const task = state.tasks.find(task => task.id === id)
        
        if (task !== undefined) {
            const pastStatus = task.status;
            if (pastStatus == status) {
                return;
            }

            task.status = status;

            if (status === 'Process') {
                task.date = new Date();
            }

            if (status === 'Done') {
                // If task was drag from Planned to Done
                if (pastStatus == 'Planned') {
                    task.date = new Date();
                }
                
                task.finishTime = new Date;
            }
        }

    },
    deleteTask: (state, id) => {
        const index = state.tasks.findIndex(task => task.id == id);

        if (index !== -1) {
            state.tasks.splice(index, 1)
        }
    },
    setModalData: (state, data) => {
        state.modalData = data;
    },
    setModalVisible: (state, { isVisible }) => {
        state.isModalVisible = isVisible;
    },
    changeTaskData: (state, data) => {
        
        const task = state.tasks.find(task => task.id === data.id);

        task.title      = data.title;
        task.user       = data.user;
        task.status     = data.status;
        task.date       = data.date;
        task.finishTime = data.finishTime;
    
    },
    toggleDark: (state) => {
        state.isDarkMode = !state.isDarkMode;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}