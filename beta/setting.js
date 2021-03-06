'use strict'
/* global split sensitiveWordsV2 */
/* exported getSpecialModules setting */
// 是否开启debug模式
const debugMode = false

// 从模板中移除的元素
const selector = split(`
[id="pagelet_frs-aside/pagelet/ad"]
[id*="encourage"]
[id*="entertainment"]
[id*="hottopic"]
[id*="firework"]
[class*="encourage"]
[class*="entertainment"]
[class*="firework"]
.game-head-game-info-wrapper
.game_frs_in_head
.top_iframe
#forum_recommend
#thread_list > li:not(.j_thread_list):not(.thread_top_list_folder)
#thread_list > style
.app_download_box
.app_download_wrap
.activity_head
.nani_app_download_box
.brank_ad_wap
.brank_desc_wrap
.interview
.meizi-header-wrapper
.showlist_wap
#branding_ads
.bus-top-activity-wrap
`).join()
// bigpipe黑名单，全名
const bigpipeBlackList = split(`
frs-aside/pagelet/ad
frs-aside/pagelet/search_back
`)
// bigpipe白名单，全名
const bigpipeWhiteList = split(`
`)
// module白名单，全名
const moduleWhiteList = split(`
`)
// module黑名单，全名
const moduleBlackList = split(`
ueditor/widget/topic_suggestion
puser/widget/myApp
fanclub/widget/fancard
star/widget/crowdfundingTraveling
pfrs/widget/FanspartyAside
ppb/widget/postList/PrintFlower
ppb/widget/specialAutoFocus
puser/widget/ticketWarning
fanclub/widget/fan_aside
pfrs/widget/frs_stamp_notice
frs-aside/widget/search_back
frs-aside/widget/showlist
frs-aside/pagelet/base_aside
frs-footer/widget/frs_from_guide
frs-header/widget/brankForumCard
pb/widget/page_aside
`)
const HOSTMAP = {
  'codemonkey.baidu.com': 'https://sp1.baidu.com/9bkCaTOb_gsJiBGko9WTAnF6hhy',
  'g.imgsrc.baidu.com': 'https://ss0.bdstatic.com/-fo4cT78BgN3otqbppnN2DJv',
  'c.imgsrc.baidu.com': 'https://ss0.bdstatic.com/9fo4cT78BgN3otqbppnN2DJv',
  'wbapi.baidu.com': 'https://sp2.baidu.com/6bYHfD4a2gU2pMbgoY3K',
  'gx.baidu.com': 'https://sp0.baidu.com/-ax1bjeh1BF3odCf',
  'f.hiphotos.baidu.com': 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy',
  'ecmc.bdimg.com': 'https://ss2.bdstatic.com/-0U0b8Sm1A5BphGlnYG',
  'f.imgsrc.baidu.com': 'https://ss0.bdstatic.com/-vo4cT78BgN3otqbppnN2DJv',
  's1.bdstatic.com': 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K',
  'e.hiphotos.baidu.com': 'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy',
  'g.hiphotos.baidu.com': 'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy',
  'h.hiphotos.baidu.com': 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy',
  'b.imgsrc.baidu.com': 'https://ss0.bdstatic.com/9vo4cT78BgN3otqbppnN2DJv',
  'c.hiphotos.baidu.com': 'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy',
  'ecma.bdimg.com': 'https://ss1.bdstatic.com/-0U0bXSm1A5BphGlnYG',
  'd.hiphotos.baidu.com': 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy',
  'b.hiphotos.baidu.com': 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy',
  'a.hiphotos.baidu.com': 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy',
  'wpl.baidu.com': 'https://sp2.baidu.com/6aQ_sjip0QIZ8tyhnq',
  'e.imgsrc.baidu.com': 'https://ss0.bdstatic.com/-4o4cT78BgN3otqbppnN2DJv',
  'd.hiphotos.bdimg.com': 'https://ss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy',
  'bos.lego.baidu.com': 'https://ss0.baidu.com/9rkZsjKl1wd3otqbppnN2DJv',
  'e.hiphotos.bdimg.com': 'https://ss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy',
  'f.hiphotos.bdimg.com': 'https://ss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy',
  'map.baidu.com': 'https://sp1.baidu.com/80MWsjip0QIZ8tyhnq',
  'ecmd.bdimg.com': 'https://ss0.bdstatic.com/-0U0aHSm1A5BphGlnYG',
  'a.imgsrc.baidu.com': 'https://ss0.bdstatic.com/94o4cT78BgN3otqbppnN2DJv',
  'muses.baidu.com': 'https://sp0.baidu.com/8_1ZaSna2gU2pMbgoY3K',
  'd.imgsrc.baidu.com': 'https://ss0.bdstatic.com/-Po4cT78BgN3otqbppnN2DJv',
  'j.map.baidu.com': 'https://sp0.baidu.com/7vo0bSba2gU2pMbgoY3K',
  'api.map.baidu.com': 'https://sp2.baidu.com/9_Q4sjOpB1gCo2Kml5_Y_D3',
  'bdimg.share.baidu.com': 'https://ss1.baidu.com/9rA4cT8aBw9FktbgoI7O1ygwehsv',
  'b.hiphotos.bdimg.com': 'https://ss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy',
  'h.imgsrc.baidu.com': 'https://ss0.bdstatic.com/7Po4cT78BgN3otqbppnN2DJv',
  'g.hiphotos.bdimg.com': 'https://ss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy',
  'h.hiphotos.bdimg.com': 'https://ss2.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy',
  'c.hiphotos.bdimg.com': 'https://ss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy',
  'a.hiphotos.bdimg.com': 'https://ss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy',
  'bzclk.baidu.com': 'https://sp0.baidu.com/9q9JcDHa2gU2pMbgoY3K',
  'ecmb.bdimg.com': 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG',
}
const scriptBlackList = [
  'gss0.baidu.com/6qVSsjikBxIFlNKl8IuM_a/',
  'fex.bdstatic.com/hunter/alog/',
  'passport.baidu.com/static/passpc-base/js/(dv/8|ld|fld).min.js(?|$)',
  'passport.baidu.com/static/passpc-account/js/module/fingerload.js(?|$)',
  'hm.baidu.com/',
  'dlswbr.baidu.com/', // 采用包括但不限于 canvas 指纹，WebRTC 获取真实 IP 等方法搜集用户隐私
  'img.baidu.com/hunter/',
  'xiangce.baidu.com/public_home/api/checkshow?', // 一个根本不存在的API……
  'afd.baidu.com/',
  'tb1.bdstatic.com/tb/cms/(itieba/oftenforum_jsdata|ofjsdata).js(?|$)',
  'm.baidu.com/static/as/res2exe/js/',
  '(' +
    [...Object.entries(HOSTMAP)]
      .reduce((prev, [http, https]) => prev.concat([http, https.slice(8)]), [])
      .join('|') +
    ')/',
].map(rule => '^https?://' + rule.replace(/(\.|\/|\?)/g, '\\$1'))
// 屏蔽后需要覆盖原方法的模块
function getSpecialModules(noop, emptyStr, html5AudioPlayer, initGeeTestService) {
  'use strict'
  const hookBSK = info => {
    const encrypt = info.sub.encrypt
    info.sub.encrypt = function(IN, OUT) {
      return encrypt.call(this, IN, OUT).then(OUT => {
        try {
          const tbsarr = IN.tbs.split('').map(x => x.charCodeAt(0))
          const parsed = JSON.parse(
            String.fromCharCode(
              ...atob(OUT._BSK)
                .split('')
                .map((chr, i) => chr.charCodeAt(0) ^ tbsarr[i % tbsarr.length]),
            ),
          )
          console.log('百度收集到的用户信息：', parsed)
        } finally {
          // eslint-disable-next-line no-unsafe-finally
          return OUT
        }
      })
    }
  }
  return {
    block: {
      'props/component/PropsApi': {
        showUI: emptyStr,
        showUIHtml: emptyStr,
      },
      'puser/component/PropsApi': {
        showUIHtml: emptyStr,
      },
      'user/widget/icons': {
        getPreIconHtml: emptyStr,
        getTbvipIconHtml: emptyStr,
        getIconsHtml: emptyStr,
      },
      'user/widget/Icons': {
        getPreIconHtml: emptyStr,
        getTbvipIconHtml: emptyStr,
        getIconsHtml: emptyStr,
      },
      'puser/widget/icons': {
        getPreIconHtml: emptyStr,
        getTbvipIconHtml: emptyStr,
        getIconsHtml: emptyStr,
      },
      'puser/widget/Icons': {
        getPreIconHtml: emptyStr,
        getTbvipIconHtml: emptyStr,
        getIconsHtml: emptyStr,
      },
      'user/widget/month_icon': {
        getMonthIcon: emptyStr,
      },
      'puser/widget/MonthIcon': {
        getMonthIcon: emptyStr,
      },
      'ihome/widget/MonthIcon': {
        getMonthIcon: emptyStr,
      },
      'props/widget/Residual': {
        showUI: emptyStr,
      },
      'tbui/widget/tbshare_popup': {
        setShareContent: noop,
      },
      'pcommon/widget/pb_track': {
        _track: noop,
      },
      'tbmall/component/util': {
        getMaxLevel() {
          return 0
        },
      },
      'pcommon/widget/AudioPlayer': html5AudioPlayer,
      'tbui/widget/audio_player': html5AudioPlayer,
      'common/widget/AudioPlayer': html5AudioPlayer,
    },
    override: {
      'frs-list/pagelet/thread_list': {
        checkLogin: noop,
        threadEasterEggsTrack: noop,
        bindJoinVipStat: noop,
      },
      'puser/widget/sign_mod_bright': {
        handlePrintFlower: noop,
      },
      'tbui/widget/js_redirect': {
        _track: noop,
      },
      'tbui/widget/aside_float_bar': {
        _square: noop,
        _bottle: noop,
        _nobottle: noop,
        _radar: noop,
        _tsukkomi: noop,
        _home: noop,
        _down: noop,
        bottleBubble: noop,
      },
      'pcommon/widget/AsideFloatBar': {
        _square: noop,
        _radar: noop,
        _tsukkomi: noop,
        _props: noop,
        _down: noop,
      },
      'common/widget/AsideFloatBar': {
        _square: noop,
        _radar: noop,
        _tsukkomi: noop,
        _home: noop,
        _props: noop,
        _down: noop,
      },
      'tbui/widget/http_transform': {
        httpLinkHover: noop,
      },
      'common/widget/Userbar': {
        _isDateTime: noop,
        _bluePush: noop,
        _bindEvent: noop,
        _buildMember: noop,
        _flowRateTest: noop,
        _getJoinVip: noop,
        _buildToHome: noop,
        _buildToExtraUrl: noop,
        _buildOfflineCard: noop,
      },
      'spage/widget/forumDirectory': {
        showYYLiveForum: noop,
        buildYYLiveForum: noop,
        getYYLiveForum: noop,
      },
      'album/component/initApiConfig': {
        loginEvent: noop,
        showLikeButton: noop,
        hideLikeButton: noop,
        setLikeButtonPosition: noop,
        resetAndshowLikeButton: noop,
        queryAndshowLikeButton: noop,
      },
      'ppb/widget/postList': {
        _processSaveFaceBubble: noop,
      },
      'pcommon/widget/RichPoster': {
        bindSuperMemberExpUpTrack: noop,
      },
      'album/widget/imgLikeAction': {
        mobileDownloadClick: noop,
        createLikeButton() {
          const t = this
          const e = [
            '<div class="fav-wrapper" style="">',
            '<div class="fav-toolbar" style="display:none">',
            '<a href="#" class="share j_shareImg" onclick="return false"></a>',
            '</div>',
            '<div class="fav-success" style="display:none;">',
            '<span class="ico"></span>',
            '</div>',
            '<div class="fav-fail" style="display:none;">',
            '<span class="ico"></span>',
            '<span class="text ndefault">\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01</span>',
            '<span class="text n20028">\u62B1\u6B49\uFF0C\u60A8\u6CA1\u6709\u6743\u9650\u8FDB\u884C\u8BE5\u9879\u64CD\u4F5C</span>',
            '</div>',
            '<div id="album_hl_container" style="display:none;"></div>',
            '</div>',
          ].join('')
          t.favConfig.likeButton = window
            .jQuery(e)
            .appendTo(document.body)
            .find('.fav-toolbar')
        },
      },
      'common/widget/PostService': {
        initGeeTestService,
      },
      'pcommon/widget/PostService': {
        initGeeTestService,
      },
      'pcommon/widget/SimplePoster': {
        initGeeTestService,
      },
      'poster/widget/post_service': {
        initGeeTestService,
      },
      'common/widget/SimplePoster': {
        initGeeTestService,
      },
    },
    hook: {
      'frs-list/widget/util_media_controller'(info) {
        const render = info.sub.render
        info.sub.render = function(config) {
          config.videoAutoPlay = 0 // 禁用 frs 页视频自动播放
          return render.call(this, config)
        }
      },
      'ppb/widget/NoAutoVideo'(info) {
        const render = info.sub.render
        info.sub.render = function(config) {
          config.can_auto_play = 0 // 禁用 pb 页视频自动播放
          return render.call(this, config)
        }
        info.sub._getAdReplaceElem = noop
        for (const key of ['_createVideoTagForH5Browser', '_createTponitVideoTagForH5Browser']) {
          const orig = info.sub[key]
          info.sub[key] = function(...args) {
            return orig.call(this, ...args).replace('autoplay="true"', 'autoplay="false"') // 禁用 pb 页视频自动播放
          }
        }
      },
      'ppb/widget/sub_list/subListTotal'(info) {
        const _getSubContent = info.sub._getSubContent
        info.sub._getSubContent = function(content) {
          if (content.is_fold) {
            console.log('[清爽贴吧]已阻止自动折叠：', {
              ...content,
            })
          }
          content.is_fold = 0 // 阻止 pb 页自动折叠楼中楼
          return _getSubContent.call(this, content)
        }
        info.sub._getAnchor = emptyStr
      },
      'ppb/widget/sub_list/postTail'(info) {
        const getPostTailTpl = info.sub.getPostTailTpl
        info.sub.getPostTailTpl = function(content, author) {
          if (content.is_fold) {
            console.log(
              '[清爽贴吧]已阻止自动折叠：',
              {
                ...content,
              },
              author,
            )
          }
          content.is_fold = 0 // 阻止 pb 页自动折叠楼中楼
          return getPostTailTpl.call(this, content, author)
        }
      },
      'common/widget/BskService': hookBSK,
      'poster/widget/bsk_service': hookBSK,
      /*
      'message/widget/chat_content': function(info) {
        if (!info.requires) info.requires = []
        info.requires.push('common/widget/TbLcs')
        const initial = info.sub.initial
        info.sub.initial = function(config) {
          if (!config.lcs.sendMessage) {
            config.lcs = this.requireInstance('common/widget/TbLcs', [])
          }
          return initial.call(this, config)
        }
      },
      */
    },
  }
}
const setting = {
  debugMode,
  sensitiveWordsV2,
  selector,
  bigpipeWhiteList,
  bigpipeBlackList,
  moduleWhiteList,
  moduleBlackList,
  scriptBlackList,
}
