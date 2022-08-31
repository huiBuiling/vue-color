<template>
  <div class="home">
    <div class="left">
      <div class="avatar">
        <div class="avatar-payload" v-html="svgContent" />
      </div>

      <!-- opera_group  -->
      <div class="opera_group">
        <div class="opera_group_i prev"><img :src="actions[0].icon" :alt="actions[0].tip" /></div>
        <div class="opera_group_i next"><img :src="actions[1].icon" :alt="actions[1].tip" /></div>
      </div>

      <!-- btn_group -->
      <div class="btn_group">
        <div class="btn_i btn_1">随机生成</div>
        <div class="btn_i btn_2">下载头像</div>
        <div class="btn_i btn_3">批量生成</div>
      </div>
    </div>

    <!-- 可视化块 -->
    <div class="right">
      <!-- 脸蛋 -->
      <div class="t_title">脸蛋</div>
      <div class="t_con">
        <div class="con_item"></div>
        <div class="con_item"></div>
        <div class="con_item"></div>
      </div>

      <!-- 头发 -->
      <div class="t_title">头发</div>
      <div class="t_con">
        <div class="con_item"></div>
        <div class="con_item"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import IconPrev from '@/assets/group/icons/icon-back.svg'
import IconCode from '@/assets/group/icons/icon-next.svg'
import { iconsStore } from '@/store/icons'

const store = iconsStore()
const name = computed(() => store.name)
const svgContent = computed(() => store.initIcon)
store.updateName('lee')

const actions = computed(() => [
  {
    // type: ActionType.Undo,
    icon: IconPrev,
    tip: '撤回'
    // disabled: !canUndo.value,
  },
  {
    // type: ActionType.Redo,
    icon: IconCode,
    tip: '前进'
    // disabled: !canRedo.value,
  }
])
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #a4b2c1;
  background-color: #14161a;
  display: flex;
  .left {
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-top: 150px;
    .avatar {
      width: 280px;
      height: 280px;
      background: #fff;
      border-radius: 5px;
      margin: 0 auto;
    }
    .opera_group {
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      background-color: #2a2f37;
      border-radius: 100px;
      margin: 50px auto;
    }
    .opera_group_i {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: #404854;
      border-radius: 50%;
      transition: opacity 0.2s;
      opacity: 0.6;
    }

    .btn_group {
      width: 330px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
    }
    .btn_i {
      width: 80px;
      padding: 10px;
      background-color: #404854;
      border-radius: 10px;
      font-weight: 600;
    }
  }
  .right {
    width: 300px;
    border-left: 1px solid #3c3b3b;
    padding: 0 20px;
    text-align: left;
    .t_title {
      font-size: 16px;
      font-weight: 600;
      line-height: 23px;
      margin: 40px 0 20px;
    }

    .t_con {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .con_item {
      width: 25%;
      height: 5rem;
      background-color: #2c323a;
      border: 1px solid #2c323a;
      border-radius: 10px;
      margin: 10px;
      cursor: pointer;
    }
    .active,
    .con_item:hover {
      border: 1px solid #6967fe;
    }
  }
}
</style>
