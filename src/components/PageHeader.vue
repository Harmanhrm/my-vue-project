
<template>
    
    <el-menu
      
    >
    <el-menu-item index="1">Workouts</el-menu-item>
    <el-menu-item index="2">History</el-menu-item>
    <el-menu-item index="3">
    <el-dropdown>
      <span class="el-dropdown-link">
       Track
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Weight</el-dropdown-item>
          <el-dropdown-item divided>Custom</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    </el-menu-item>
    
    </el-menu>
  </template>
  
  <script>
import { ArrowDown } from '@element-plus/icons-vue'
  export default {
    name: 'PageHeader',
    data() {
      return {
        isCollapsed: false
      }
    }
  }
  </script>
  
  <style scoped>
  .el-menu {
    margin-left: 25%;
    margin-top: 25%;
    width: 150px;
  }
  .el-menu-item {
    border-left: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
  }
  .el-menu-item:hover {
    background-color: #e6e6e6;
  }
  </style>
  
  
  <script lang="ts" setup>
  </script>
  <style scoped>
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
  </style>
  