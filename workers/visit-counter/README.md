# 访问计数 Worker

## 部署

1. 注册 / 登录 [Cloudflare](https://dash.cloudflare.com/sign-up)
2. 本机安装 Node 后，在本目录执行：

```bash
npx wrangler login
npx wrangler kv namespace create VISITS
# 把输出的 id 填进 wrangler.toml 的 id / preview_id
npx wrangler deploy
```

3. 部署成功后会得到类似 `https://xyzw-visit.<子域>.workers.dev` 的地址
4. 把该地址填进站点根目录 `app.js` 里的 `VISIT_API`
