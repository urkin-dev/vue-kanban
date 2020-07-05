import Vuex from 'vuex';
import Vue from 'vue';
import kanban from './modules/kanban'

// Load Vuex

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        kanban
    }
});