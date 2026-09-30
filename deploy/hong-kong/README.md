# SecondOrder Scenario 香港部署

网站已支持完全静态部署。页面、脚本、PDF 导出库、DM Sans 和 Manrope 字体由网站自身提供；中文使用设备本地字体，不请求 Google Fonts。模型计算和场景保存都在浏览器中运行。

## 准备

- 自有域名。
- 香港地区 Linux 云主机，已安装官方 Docker Engine 和 Docker Compose 插件。
- 域名的 A 记录指向主机公网 IPv4。只有主机支持 IPv6 时才添加 AAAA 记录。
- 主机允许 TCP 80、443。UDP 443 为可选的 HTTP/3。
- 此部署需要自行准备域名和云账号，不包含购买、开户或备案申请。

## 从代码构建

使用 GitHub 仓库 `ElaineYiyaoLiu/SecondOrder-Scenario` 的 `main` 分支。
在项目目录运行：

```sh
cp deploy/hong-kong/.env.example deploy/hong-kong/.env
```

编辑 `.env`，填入真实域名和证书联系邮箱，然后运行：

```sh
docker compose --env-file deploy/hong-kong/.env -f deploy/hong-kong/compose.yaml up -d --build
```

Caddy 会自动申请并续期 HTTPS 证书。首次申请需要域名解析正确、80/443 可达，以及主机能访问证书服务。

更新时先取得最新代码，再运行同一条 Compose 命令。证书数据保存在 Docker 卷中，请勿用 `down -v` 清除。

## 直接上传静态部署包

解压 `SecondOrder-Scenario-HK-static.zip`，将其中 `site/` 的内容放到主机的 `/srv/secondorder`。
安装官方 Caddy，将附带的 `Caddyfile` 作为配置，并给 Caddy 服务设置 `SITE_DOMAIN` 与 `ACME_EMAIL` 环境变量。域名和邮箱占位值必须替换。

静态文件也可以由其他支持 HTTPS 的 Web 服务器托管；不需要常驻 Node.js 服务。

## 迁移场景

1. 在旧网站点击“导出场景”，保存 JSON 备份。
2. 打开新域名，点击“导入场景”，选择备份。
3. 已有场景保留；相同备份不会重复导入相同记录，ID 冲突时使用新 ID。总数超过 30 个时整次导入会拒绝，不会只导入部分记录。
4. 导入后检查场景参数、对比选择和参照路径。之后的分享链接会使用新域名。

## 上线检查

请在中国大陆的移动、联通、电信网络及手机浏览器实际测试：

- 首页、中文切换及字体显示。
- 新建、保存、删除、撤销、刷新后保留场景。
- JSON 导出与导入、分享链接。
- PDF 与 CSV 下载。
- 无混合内容，所有字体、JS、CSS 均从自己的域名加载。

当前配置未在香港真实主机或中国大陆网络上验证，不能将现有 Vercel 预览视为大陆可达性证明。
