# RefreshingTieba
过滤贴吧的各种广告、无用的脚本和样式，提升加载速度，减少内存占用，附带免登录看帖，语音贴替换为html5播放等功能

# 如何安装
法一：
> 下载[RefreshingTieba.crx](https://github.com/8qwe24657913/RefreshingTieba/raw/master/RefreshingTieba.crx)，打开chrome://extensions/，拖入安装

法二：
> 下载RefreshingTieba文件夹，用开发者模式加载

### 如何屏蔽启动时的停用提示：

法一需要[下载chrome.adm](https://support.google.com/chrome/a/answer/187202)，打开gpedit.msc，计算机配置 -> 管理模板 -> 经典管理模版(ADM) -> Google -> Google Chrome -> 扩展程序，在“配置扩展程序安装白名单”中选择“已启用”，加入本扩展id：eclkpbdcooadmnmfcjblaalkegmemibi

法二需要添加启动参数--enable-automation --disable-infobars

# 做了什么
* 减少不必要的js、css加载
* 屏蔽不必要的模块
* 模板元素插入前过滤
* 隐藏不能被过滤的广告
* 减少内存泄漏
* 屏蔽统计
* 免登录看帖
* 语音贴替换为html5播放
* 减少滚动时的卡顿

# 怎么做的
## 减少不必要的js、css加载&屏蔽不必要的模块
hook了贴吧的BigPipe、_.Module以及HTMLScriptElement.prototype.src，过滤掉无用的js/css/module
## 模板元素插入前过滤
覆写Pagelet.prototype._appendTo和Pagelet.prototype._getHTML
## 隐藏不能被过滤的广告
display:none!important，没什么好说的
## 减少内存泄漏
贴吧帖子列表页pjax时直接操作innerHTML，会导致jQuery绑定在元素上的事件无法被释放，我重写了这一部分
## 屏蔽统计
把alog和$.stats系列函数替换掉
## 免登录看帖
DOMContentLoaded后再修改PageData.user.is_login，以免导致右上角显示不正常，感谢@榕榕
## 语音贴替换为html5播放
重写audio player
## 减少滚动时的卡顿
给滚动系列事件监听加上passive属性，不必等到监听函数执行完成后再开始滚动
