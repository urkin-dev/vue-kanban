<template>
  <div class="container">
    <EditTask v-if="isEditVisible" />
    <h1 class="main-title">Kanban</h1>
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

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Column,
    AddTask,
    EditTask
  },
  computed: {
    ...mapGetters(['getEditStatus']),
    isEditVisible() {
      return this.getEditStatus;
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
</style>
