import Vue from 'vue'
import Router from 'vue-router'
import index from '#/index/index'
import home from '#/index/home'             // 首页
import raiders from '#/raiders/raiders'     // 攻略

// 图鉴
import pokedex from '#/pokedex/pokedex'                 // 图鉴
import pokedexList from '#/pokedex/pokedexList'         // 图鉴 - 通用列表
import pokedexDetailGbo from '#/pokedex/pokedexDetailGbo'   // 图鉴 - 详情 - 冈布奥
import pokedexDetailFt from '#/pokedex/pokedexDetailFt'     // 图鉴 - 详情 - 飞艇
import pokedexDetailFs from '#/pokedex/pokedexDetailFs'     // 图鉴 - 详情 - 符石
import pokedexDetailZb from '#/pokedex/pokedexDetailZb'     // 图鉴 - 详情 - 装备
import pokedexDetailSq from '#/pokedex/pokedexDetailSq'     // 图鉴 - 详情 - 神器
import pokedexDetailDj from '#/pokedex/pokedexDetailDj'     // 图鉴 - 详情 - 道具
import pokedexDetailYj from '#/pokedex/pokedexDetailYj'     // 图鉴 - 详情 - 药剂
import pokedexDetailMf from '#/pokedex/pokedexDetailMf'     // 图鉴 - 详情 - 魔法
import pokedexDetailJn from '#/pokedex/pokedexDetailJn'     // 图鉴 - 详情 - 技能
import pokedexDetailGw from '#/pokedex/pokedexDetailGw'     // 图鉴 - 详情 - 怪物
import pokedexSky from '#/pokedex/pokedexSky'           // 图鉴 - 天空问答
import pokedexSkyEdit from '#/pokedex/pokedexSkyEdit'   // 图鉴 - 天空问答编辑
// 图鉴 - 称号图鉴
import pokedexTitle from '#/pokedex/pokedexTitle'       // 图鉴 - 称号图鉴
import pokedexTitleMx from '#/pokedex/pokedexTitleMx'       // 图鉴 - 称号图鉴 - 冒险系
import pokedexTitleMf from '#/pokedex/pokedexTitleMf'       // 图鉴 - 称号图鉴 - 魔法系
import pokedexTitleZs from '#/pokedex/pokedexTitleZs'       // 图鉴 - 称号图鉴 - 战士系
import pokedexTitleJl from '#/pokedex/pokedexTitleJl'       // 图鉴 - 称号图鉴 - 巨龙系
import pokedexTitleEm from '#/pokedex/pokedexTitleEm'       // 图鉴 - 称号图鉴 - 恶魔系
import pokedexTitleJx from '#/pokedex/pokedexTitleJx'       // 图鉴 - 称号图鉴 - 机械系

// 图鉴 - 权限申请
import pokedexPowerTips from '#/pokedex/pokedexPowerTips'   // 图鉴 - 权限提示页
import pokedexPowerQus from '#/pokedex/pokedexPowerQus'     // 图鉴 - 权限答题页
import pokedexPowerOther from '#/pokedex/pokedexPowerOther' // 图鉴 - 权限其他方面填写

import active from '#/active/active'        // 活动
import search from '#/search/search'        // 搜索
import searchList from '#/search/searchList'        // 搜索 - 列表
import searchMore from '#/search/searchMore'        // 搜索 - 更多

// 个人中心
import personal from '#/personal/personal'  // 个人中心
import personalContent from '#/personal/personalContent'  // 个人中心 - 我的内容
import personalMessage from '#/personal/personalMessage'  // 个人中心 - 消息通知
import personalCollection from '#/personal/personalCollection'  // 个人中心 - 我的收藏
import personalDraft from '#/personal/personalDraft'      // 个人中心 - 草稿箱
// 个人中心 - 设置
import personalSetting from '#/personal/personalSetting'  // 个人中心 - 设置
import personalSettingHead from '#/personal/personalSettingHead'  // 个人中心 - 设置 - 自定义头像
import personalSettingBg from '#/personal/personalSettingBg'      // 个人中心 - 设置 - 背景墙选项
import personalSettingSuggestions from '#/personal/personalSettingSuggestions'  // 个人中心 - 设置 - 意见反馈
import personalSettingInfo from '#/personal/personalSettingInfo'  // 个人中心 - 设置 - 通知设置


import detailArticle from '#/common/detailArticle'  // 文章详情

Vue.use(Router);

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      redirect: '/home'
    },
    // 带导航栏
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        // 首页
        {
          path: '/home',
          name: 'home',
          component: home
        },
        // 攻略
        {
          path: '/raiders',
          name: 'raiders',
          component: raiders
        },
        // 图鉴
        {
          path: '/pokedex',
          name: 'pokedex',
          component: pokedex
        },
        // 图鉴 - 通用列表
        {
          path: '/pokedex/pokedexList',
          name: 'pokedexList',
          component: pokedexList
        },
        // 活动
        {
          path: '/active',
          name: 'active',
          component: active
        },
        // 搜索
        {
          path: '/search',
          name: 'search',
          component: search
        },
        // 搜索 - 列表
        {
          path: '/searchList',
          name: 'searchList',
          component: searchList
        },
        // 搜索 - 更多
        {
          path: '/searchMore',
          name: 'searchMore',
          component: searchMore
        },
        // 个人中心
        {
          path: '/personal',
          name: 'personal',
          component: personal
        }
      ]
    },
    // 不带导航栏
    // 文章详情
    {
      path: '/detailArticle',
      name: 'detailArticle',
      component: detailArticle
    },
    // 个人中心 - 我的内容
    {
      path: '/personalContent',
      name: 'personalContent',
      component: personalContent
    },
    // 个人中心 - 消息通知
    {
      path: '/personalMessage',
      name: 'personalMessage',
      component: personalMessage
    },
    // 个人中心 - 我的收藏
    {
      path: '/personalCollection',
      name: 'personalCollection',
      component: personalCollection
    },
    // 个人中心 - 草稿箱
    {
      path: '/personalDraft',
      name: 'personalDraft',
      component: personalDraft
    },
    // 个人中心 - 设置
    {
      path: '/personalSetting',
      name: 'personalSetting',
      component: personalSetting
    },
    // 个人中心 - 设置 - 自定义头像
    {
      path: '/personalSettingHead',
      name: 'personalSettingHead',
      component: personalSettingHead
    },
    // 个人中心 - 设置 - 背景墙选项
    {
      path: '/personalSettingBg',
      name: 'personalSettingBg',
      component: personalSettingBg
    },
    // 个人中心 - 设置 - 意见反馈
    {
      path: '/personalSettingSuggestions',
      name: 'personalSettingSuggestions',
      component: personalSettingSuggestions
    },
    // 个人中心 - 设置 - 通知设置
    {
      path: '/personalSettingInfo',
      name: 'personalSettingInfo',
      component: personalSettingInfo
    },
    // 图鉴 - 详情 - 冈布奥
    {
      path: '/pokedexList/pokedexDetailGbo',
      name: 'pokedexDetailGbo',
      component: pokedexDetailGbo
    },
    // 图鉴 - 详情 - 飞艇
    {
      path: '/pokedexList/pokedexDetailFt',
      name: 'pokedexDetailFt',
      component: pokedexDetailFt
    },
    // 图鉴 - 详情 - 符石
    {
      path: '/pokedexList/pokedexDetailFs',
      name: 'pokedexDetailFs',
      component: pokedexDetailFs
    },
    // 图鉴 - 详情 - 装备
    {
      path: '/pokedexList/pokedexDetailZb',
      name: 'pokedexDetailZb',
      component: pokedexDetailZb
    },
    // 图鉴 - 详情 - 神器
    {
      path: '/pokedexList/pokedexDetailSq',
      name: 'pokedexDetailSq',
      component: pokedexDetailSq
    },
    // 图鉴 - 详情 - 道具
    {
      path: '/pokedexList/pokedexDetailDj',
      name: 'pokedexDetailDj',
      component: pokedexDetailDj
    },
    // 图鉴 - 详情 - 药剂
    {
      path: '/pokedexList/pokedexDetailYj',
      name: 'pokedexDetailYj',
      component: pokedexDetailYj
    },
    // 图鉴 - 详情 - 魔法
    {
      path: '/pokedexList/pokedexDetailMf',
      name: 'pokedexDetailMf',
      component: pokedexDetailMf
    },
    // 图鉴 - 详情 - 技能
    {
      path: '/pokedexList/pokedexDetailJn',
      name: 'pokedexDetailJn',
      component: pokedexDetailJn
    },
    // 图鉴 - 详情 - 怪物
    {
      path: '/pokedexList/pokedexDetailGw',
      name: 'pokedexDetailGw',
      component: pokedexDetailGw
    },
    // 图鉴 - 天空问答
    {
      path: '/pokedexSky',
      name: 'pokedexSky',
      component: pokedexSky
    },
    // 图鉴 - 天空问答编辑
    {
      path: '/pokedexSkyEdit',
      name: 'pokedexSkyEdit',
      component: pokedexSkyEdit
    },
    // 图鉴 - 称号图鉴
    {
      path: '/pokedexTitle',
      name: 'pokedexTitle',
      component: pokedexTitle,
      children: [
        // 冒险系
        {
          path: '/pokedexTitle/Mx',
          name: 'pokedexTitleMx',
          component: pokedexTitleMx,
        },
        // 魔法系
        {
          path: '/pokedexTitle/Mf',
          name: 'pokedexTitleMf',
          component: pokedexTitleMf,
        },
        // 战士系
        {
          path: '/pokedexTitle/Zs',
          name: 'pokedexTitleZs',
          component: pokedexTitleZs,
        },
        // 巨龙系
        {
          path: '/pokedexTitle/Jl',
          name: 'pokedexTitleJl',
          component: pokedexTitleJl,
        },
        // 恶魔系
        {
          path: '/pokedexTitle/Em',
          name: 'pokedexTitleEm',
          component: pokedexTitleEm,
        },
        // 机械系
        {
          path: '/pokedexTitle/Jx',
          name: 'pokedexTitleJx',
          component: pokedexTitleJx,
        }
      ]
    },
    // 图鉴 - 权限提示页
    {
      path: '/pokedexPowerTips',
      name: 'pokedexPowerTips',
      component: pokedexPowerTips
    },
    // 图鉴 - 权限答题页
    {
      path: '/pokedexPowerQus',
      name: 'pokedexPowerQus',
      component: pokedexPowerQus
    },
    // 图鉴 - 权限其他方面填写
    {
      path: '/pokedexPowerOther',
      name: 'pokedexPowerOther',
      component: pokedexPowerOther
    },
  ]
})
