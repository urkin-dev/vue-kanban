const state = {
    tasks: [
        {
            id: 1,
            title: 'Задача 1',
            status: 'Planned'
        },
        {
            id: 2,
            title: 'Задача 2',
            status: 'Planned'
        }
    ]
};

const getters = {
    getTasks (state) {
        return (status) => {
            return state.tasks.filter(task => task.status === status)
        }
    }
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
}