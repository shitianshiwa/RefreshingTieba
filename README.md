# RefreshingTieba

过滤贴吧的各种广告、无用的脚本和样式，提升加载速度，减少内存占用，附带免登录看帖，语音贴替换为 html5 播放等功能

# 如何安装

法一：

> 下载 [RefreshingTieba.crx](https://github.com/8qwe24657913/RefreshingTieba/releases)，打开 chrome://extensions/ ，拖入安装

法二：

> 下载 RefreshingTieba 文件夹，用开发者模式加载

### 如何屏蔽启动时的停用提示：

法一：

- [政策模板](https://support.google.com/chrome/a/answer/187202)（这里仅介绍 windows，其它操作系统请按网页中的说明操作）：从网页中下载 chrome.adm 后，打开 gpedit.msc，计算机配置 -> 管理模板 -> 经典管理模版(ADM) -> Google -> Google Chrome -> 扩展程序，在“配置扩展程序安装白名单”中选择“已启用”，加入本扩展 id：eclkpbdcooadmnmfcjblaalkegmemibi
- 对于 windows 家庭版用户，可使用注册表编辑器（regedit） ，在 HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome\ExtensionInstallWhitelist 新建字符串值，名称为从 1 开始累加的自然数，数据还是本扩展 id：eclkpbdcooadmnmfcjblaalkegmemibi

法二需要使用 [GreenChrome](https://shuax.com/portfolio/greenchrome/) / Chrome++ 等屏蔽，这里不多做介绍

## [可选]订阅 ABP 规则

[洁癖所使用的 ABP 规则](https://github.com/8qwe24657913/RefreshingTieba/raw/master/ABP_List.txt)，阻止加载一些本扩展只能隐藏的广告，由于 Github 所限，无法插入订阅链接，只能手动添加订阅

## [实验性扩展]清爽贴吧 β

请注意:

- 清爽贴吧 β 使用的实验性 declarativeWebRequest API 在 Chrome Stable 分支下**不**可用
- 安装此扩展后无需且**不应**安装原扩展，否则可能会造成预料之外的问题

# 做了什么

- 减少不必要的 js、css 加载
- 屏蔽不必要的模块
- 模板元素插入前过滤
- 隐藏不能被过滤的广告
- 减少内存泄漏
- 屏蔽统计
- 免登录看帖
- 语音贴替换为 html5 播放
- 减少滚动时的卡顿
- 使不可关闭的对话框可关闭

# 怎么做的

## 减少不必要的 js、css 加载&屏蔽不必要的模块

hook 了贴吧的`BigPipe`、`_.Module`以及`HTMLScriptElement.prototype.src`，过滤掉无用的 js / css / module

## 模板元素插入前过滤

覆写 `Pagelet.prototype._appendTo` 和 `Pagelet.prototype._getHTML`

## 隐藏不能被过滤的广告

`display:none!important`，没什么好说的

## 减少内存泄漏

贴吧帖子列表页 pjax 时直接操作 `innerHTML`，会导致 `jQuery` 绑定在元素上的事件无法被释放，我重写了这一部分

## 屏蔽统计

把 `alog` 和 `$.stats` 系列函数替换掉

## 免登录看帖

`DOMContentLoaded` 后再修改 `PageData.user.is_login`，以免导致右上角显示不正常，感谢@榕榕

## 语音贴替换为 html5 播放

重写 audio player

## 减少滚动时的卡顿

给滚动系列事件监听加上 passive 属性，不必等到监听函数执行完成后再开始滚动

## 使不可关闭的对话框可关闭

hook `$.dialog`
