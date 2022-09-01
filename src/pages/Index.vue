<template>
  <div class="home">
    <div class="left">
      <div class="avatar" :style="{background: bgColor}">
        <!-- <div class="view" v-for="(item, index) in slideJson.slice(0, 2)" :key="index">
          <div class="view" :class="item[0].widgetType" v-html="item[0].svgRaw" />
        </div> -->
        <!-- <div class="avatar-payload" v-html="slideJson[0].svgRaw" /> -->

        <div class="avatar-payload" v-html="svgContent"></div>

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
      <div class="view">
        <div class="t_title">背景色</div>
        <div class="t_con">
          <color-picker :defaultColor="bgColor" @change="changeColor($event, 'BG')" :value="bgColor" />
        </div>
      </div>
      <div class="view" v-for="item in slideJson" :key="item.type">
        <div class="t_title">{{item.name}}</div>
        <div v-if="['tops', 'clothes', 'nose', 'glasses'].includes(item.type)">
          <color-picker :show-opacity="false" :defaultColor="item.type === 'tops' ? hairColor: clothesColor" @change="changeColor($event, item.type)" :value="item.type === 'tops' ? hairColor: clothesColor" />
        </div>
        <div class="t_con">
          <div class="con_item" 
          :class="{active: activeShape[item.type] === itemC.widgetShape, none: itemC.widgetShape === 'none'}"
          v-for="(itemC, index) in item.data" 
          :key="index" v-html="itemC.svgRaw" @click="onChange(itemC.widgetType, itemC.widgetShape)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import ColorPicker from 'colorpicker-v3'

import IconPrev from '@/assets/group/icons/icon-back.svg'
import IconCode from '@/assets/group/icons/icon-next.svg'
import { slideJson } from '@/utils/slide'
import { svgData } from '@/utils/dynamic-data'
import { AvatarOption, NONE } from "@/utils/shapeBaseTypes";
import { initAvatarData } from "@/utils/initData";
import { AVATAR_Index } from "@/utils/constant";

// import { iconsStore } from '@/store/icons'

// const store = iconsStore()
// const name = computed(() => store.name)
// const svgContent = computed(() => store.initIcon)
// store.updateName('lee')

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

// 初始化头像数据
const avatarOption: AvatarOption = reactive({
  widgets: initAvatarData
})

const hex = ref("");
const bgColor = ref('#FFEBA4')
const hairColor = ref('#FC909F')
const clothesColor = ref('#F48150')

// 渲染avatar
const svgContent = ref('')

// 选中项
const activeShape = ref({
  face: 'base',
  tops: 'wave',
  ear: 'detached',
  earrings: 'hoop',
  eyebrow: 'eyelashesdown',
  eyes: 'eyeshadow',
  nose: 'curve',
  glasses: 'none',
  mouth: 'nervous',
  beard: 'none',
  clothes: 'collared',
})

const changeColor = (e: {hex: string, rgba: string}, type: string) => {
  if(type === 'BG') {
    bgColor.value = e.rgba
  } else {
    console.log('changeColor', e.rgba, type)
    hairColor.value = e.hex

    const _cur = {
      ...avatarOption.widgets,
      [type]: {
        ...avatarOption.widgets[type],
        fillColor: e.hex,
      }
    }
    avatarOption.widgets = _cur
    console.log(`output->avatarOption`,avatarOption)
  }
}



// 切换
const onChange = (type: string, shape: string) => {
  console.log(`output->onChange`,type, shape)
  const _cur = {
    ...avatarOption.widgets,
    [type]: {
      ...avatarOption.widgets[type],
      "shape": shape,
    }
  }

  activeShape.value[type] = shape
  avatarOption.widgets = _cur
  console.log(`output->avatarOption`,avatarOption)
}

// 导入svg数据
const getSvgInitData = () => {
  // 层级处理
  const sortedList = Object.entries(avatarOption.widgets).sort(
    ([prevShape, prev], [nextShape, next]) => {
      const ix = prev.zIndex ?? AVATAR_Index[prevShape]?.zIndex ?? 0
      const iix = next.zIndex ?? AVATAR_Index[nextShape]?.zIndex ?? 0
      return ix - iix
    }
  )

  const cur: Promise<string>[] = sortedList.map(
    async ([widgetType, opt]) => {
      if (opt.shape !== NONE && svgData?.[widgetType]?.[opt.shape]) {
        const _cur = svgData[widgetType][opt.shape]
        // () => import('/src/assets/widgets/face/base.svg?import&raw')
        return (await _cur()).default
      }
      return ''
    }
  )
  return {cur, sortedList}
}

// 获取渲染svg
const getSvgRawList = async () => {
  // 获取所有svg
  const svgInitData = getSvgInitData()
  const cur = await Promise.all(svgInitData.cur).then((raw) => {
    // <g transform="translate(0, 0)"> 导致显示位置错乱
    // raw.len = 11: ['<svg\n  width="200"\n  height="320"\n  viewBox="0 0 2…"white"\n      />\n    </clipPath>\n  </defs>\n</svg>', '<svg\n  width="96"\n  height="49"\n  viewBox="0 0 96 …20.4021)"\n      fill="black"\n    />\n  </g>\n</svg>', '<svg\n  width="32"\n  height="40"\n  viewBox="0 0 32 …1921"\n      stroke-width="4"\n    />\n  </g>\n</svg>', '<svg\n  width="149"\n  height="51"\n  viewBox="0 0 14…      stroke-linecap="round"\n    />\n  </g>\n</svg>', '<svg\n  width="240"\n  height="212"\n  viewBox="0 0 2…lack"\n      stroke-width="4"\n    />\n  </g>\n</svg>', '', '<svg\n  width="64"\n  height="64"\n  viewBox="0 0 64 …lack"\n      stroke-width="4"\n    />\n  </g>\n</svg>', '<svg\n  width="48"\n  height="52"\n  viewBox="0 0 48 …#000"\n      stroke-width="4"\n    />\n  </g>\n</svg>', '', '', '<svg\n  width="281"\n  height="93"\n  viewBox="0 0 28…    stroke-linejoin="round"\n    />\n  </g>\n</svg>\n']
    const _cur = raw.map((svgRaw, i) => {
      /**
       * sortedList: len = 11, 二维数组
       * widgetFillColor：获取填充色
       * svgRaw：完整svg数据
       
        * -> 截取掉头部
        * svgRaw.indexOf('>', svgRaw.indexOf('<svg'))：index eg：109
        * - indexOf(searchString, ?position)
        * - svgRaw.indexOf('<svg') => 0
        * - slice(?start, ?end)
        * 
        * -> 截取掉尾部
        * .replace('</svg>', '')
        * 
        * -> 颜色替换
        * .replaceAll(searchValue, replaceValue)
        * 部分部位svg 存在：fill="$fillColor" -> 替换为 widgetFillColor
        */

      // if(svgInitData?.sortedList[i][1]) {
      //   console.log(`output->glasses`,svgInitData?.sortedList[i][1])
      // }
      const widgetFillColor = svgInitData?.sortedList[i][1].fillColor
      let content = svgRaw
        .slice(svgRaw.indexOf('>', svgRaw.indexOf('<svg')) + 1)
        .replace('</svg>', '').replaceAll(
        '$fillColor',
        widgetFillColor || '#000000'
      )

      /**
       * 输出每一个部位的svg
       * id=(eg:"vue-color-avatar-eyes"
       */
      return `
        <g id="vue-color-avatar-${svgInitData?.sortedList[i][0]}">
          ${content}
        </g>
      `
    })
    return _cur
  })

  return cur
}

// 依赖追踪
watchEffect(async () => {
  console.log(`output->watchEffect`,avatarOption.widgets)
  const svgRawList = await getSvgRawList()

  const size = ref(280)
  svgContent.value = `
    <svg
      width="280"
      height="280"
      viewBox="0 0 ${size.value / 0.7} ${size.value / 0.7}"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100, 65)">
        ${svgRawList.join('')}
      </g>
    </svg>
  `

  // console.log('svgContent', svgContent)
})

</script>

<style lang="scss">
  @import 'colorpicker-v3/dist/style.css';

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

    .avatar-payload{
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
    }

    // svg{
    //   width: 80%;
    //   height: 80%;
    //   margin: 10%;
    // }

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
    width: 326px;
    border-left: 1px solid #3c3b3b;
    padding: 0 20px 60px;
    text-align: left;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
      height: 6px;
    }
    // 滚动区域背景
    &::-webkit-scrollbar-track-piece {
      background-color: rgb(17, 16, 16);
      background-color: white;
      -webkit-border-radius: 6px;
    }
  
    // 竖向滚动条
    &::-webkit-scrollbar-thumb:vertical {
      height: 5px;
      background-color: rgb(70, 68, 68);
      background-color: #AAAAAA;
      -webkit-border-radius: 6px;
    }

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
      width: 80px;
      height: 80px;
      // background-color: #2c323a;
      // border: 1px solid #2c323a;
      background-color: #2b2c2e26;
      border: 1px solid #2b2c2e26;
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

    .none {
      font-size: 30px;
      line-height: 80px;
      text-align: center;
      font-weight: normal;
    }
  }
}
</style>
