/* exported split sensitiveWordsV2 */

function orig(wtf) {
  return wtf
}

function split(str) {
  return str.split('\n').filter(orig)
}

// 通用模糊匹配，包含这个词就屏蔽
const sensitiveWordsV2 = split(`
P0WRqyv
P0WRqyvp0
activity
ad
ad_manager
ad_post
adsense
advertise
app_download
app_forum_top_nav
aside_ad
aside_platform
asidead
avideo
baidusearch
beg_card
brank_ad
buy_controller
cashier
celebrity
comtrial
conf_skin
cpro
daoliu
dasense
duoku
encourage
entertainment
firework
fixed_bar
force_login
game
games
gift
head_recom
hot_topic
hottopic
icon
icons
iframe_head
interview
lego
live_tv
local_pb_top
local_poster
locality
marry
medal
meizhi
member_out_date_warn
money
nameplate
pad_overlay
padsense
pay
paykey
payment
paypost
pc2client
pk_fixed_bubble
platform_weal
popup_zhang
post_guessing
post_marry
promoter
purchase
pv_from_client
qianbao
recommend
save_face
score
share
showlist
sign_card
skin_click
snow_flow
snowflow
spage_liveshow_slide
spread
spreadad
stat
stats
stock
tb_gram
tbean
tbmall
tbshare
tcharge
tdou
ten_years
topic_rank
tpl
track
u9aside
umoney
url_check
vip
wallet
xiu8
yunying
`)
