<template class="dark-background">
  <div class="container">
    <EditTask v-if="isEditVisible" />
    <div class="container-top">
      <h1 class="main-title" :class="{'main-title-dark': isDarkMode}">Kanban</h1>
      <input @change="toggleMode" type="checkbox" class="toggle">
    </div>
    <AddTask />
    <div class="column-wrapper">
      <Column title="План" status="Planned" />
      <Column title="В работе" status="Process" />
      <Column title="Готово" status="Done" />
    </div>
  </div>
</template>

<script>
import Column from './components/Column'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Column,
    AddTask,
    EditTask
  },
  computed: {
    ...mapGetters(['getEditStatus', 'getDarkModeStatus']),
    isEditVisible() {
      return this.getEditStatus;
    },
    isDarkMode() {
      return this.getDarkModeStatus;
    }
  },
  methods: {
    ...mapActions(['darkModeToggle']),
    toggleMode() {
      this.darkModeToggle();
      if (this.isDarkMode) {
        document.body.style.backgroundColor = '#121212';
      } else {
        document.body.style.backgroundColor = '#f5f5f5';
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
}

body .main-title-dark {
  color: #686868;
}

.container {
  width: 80%;
  margin: 0 auto;
  position: relative;
}

.main-title {
  color: rgb(46, 46, 46);
}

.column-wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 30px;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
input[type="checkbox"]:focus {
  outline: 0;
}

.toggle {
  height: 32px;
  width: 52px;
  border-radius: 16px;
  display: inline-block;
  position: relative;
  margin: 0;
  border: 2px solid #474755;
  background: linear-gradient(180deg, #2D2F39 0%, #1F2027 100%);
  transition: all 0.2s ease;
}
.toggle:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1aac9d;
  box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
  transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
}
.toggle:checked {
  border-color: #0d8a7d
}
.toggle:checked:after {
  transform: translatex(20px);
}

.container-top {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

</style>