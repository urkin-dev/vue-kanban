<template>
  <div class="container">
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

export default {
  name: 'App',
  components: {
    Column,
    AddTask
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
