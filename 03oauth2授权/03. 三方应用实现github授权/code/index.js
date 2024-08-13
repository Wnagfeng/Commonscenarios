const Koa = require("koa");
const router = require("koa-router")();
const staticFiles = require('koa-static')
const path = require('path')
const views = require('koa-views')
const axios = require('axios')
const qs = require('qs')
const app = new Koa();

let userInfo = {}

app.use(staticFiles(path.resolve(__dirname, "./public")))
app.use(views('views', { map: { html: 'ejs' } }))

/* 模板路由处理 */
router.get('/login', async ctx => {
  await ctx.render('login')
})
router.get('/home', async ctx => {
  await ctx.render('home', { userInfo })
})

/* 1、拦截前端的a链接跳转 */
router.get('/loginByGithub', async ctx => {
  /* 跳转到git获取授权码的地址  需要携带您在github申请的client_id参数*/
  // 这一步就是为了本来要跳转到loginByGithub页面 我们直接跳转到github授权页面
  const path = 'https://github.com/login/oauth/authorize?client_id=Ov23li73kxA0uZfZf5nW'
  ctx.redirect(path)
})

/* 创建一个授权码的地址路由 你在github上填写的路由*/
// 这里为什么要有 /callback/github这个路由呢？
/*
它这个路由就是你在github上填写的Authorization callback URL  图四
意思是当  用户点击授权后 github会回访到这个路由 
 */
router.get('/callback/github', async ctx => {
  const { code } = ctx.query
  console.log("回访了github授权")
  /* 请求令牌 post  params参数 */
  const accessToken = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: 'Ov23li73kxA0uZfZf5nW', // 申请的client_id
    client_secret: '4736b47aeeb48eac4fe3c4181024eba789032017', // 申请的client_secret
    code
  })
  const { access_token } = qs.parse(accessToken.data)
  /*拿到token后去 获取用户的信息 */
  userInfo = await axios.get('https://api.github.com/user', {
    /* Bearer 后面记得跟一个空格 */
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  userInfo = userInfo.data
  ctx.redirect('/home')
})

app.use(router.routes())
app.listen(3000, () => {
  console.log('server is running on port 3000')
})
