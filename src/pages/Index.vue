<template>
  <div class="home">
    <div class="left">
      <div class="avatar">
        <div class="view" v-for="(item, index) in slideJson.slice(0, 2)" :key="index">
          <div class="view" :class="item[0].widgetType" v-html="item[0].svgRaw" />
        </div>
        <!-- <div class="avatar-payload" v-html="slideJson[0].svgRaw" /> -->
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
      <div class="view" v-for="(item, index) in slideJson" :key="index">
        <div class="t_title">头发</div>
        <div class="t_con">
          <div class="con_item" v-for="itemC in item" :key="itemC.widgetShape" v-html="itemC.svgRaw"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import IconPrev from '@/assets/group/icons/icon-back.svg'
import IconCode from '@/assets/group/icons/icon-next.svg'
import { iconsStore } from '@/store/icons'
import { types, slideJson } from '@/utils/slide'

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

<style lang="scss">
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
      position: relative;
      width: 280px;
      height: 280px;
      background: #fff;
      border-radius: 5px;
      margin: 0 auto;
      overflow: hidden;
    }

    .view{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .face{}
    .tops{
      top: -60px;
      left: -28px;
    }

    svg{
      width: 80%;
      height: 80%;
      margin: 10%;
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
    padding: 0 20px 60px;
    text-align: left;
    overflow-y: auto;

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

    svg {
      width: 80%;
      height: 80%;
      margin: 10%;
    }
  }
}
</style>
