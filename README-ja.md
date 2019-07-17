*[English](README.md) ∙ [日本語](README-ja.md) 

# Gatsby Starter Blog Contentful

Gatsby、Contentful、Netlifyを使って静的Webサイトを構築するためのスターターテンプレート。

[デモ](https://gatsby-starter-blog-contentful.netlify.com/)

## 特徴

- Contentfulでのコンテンツ管理
- レスポンシブデザイン
- Styled components
- SEOフレンド
  - JSON-LD Schema
  - OpenGraphシェアのサポート
  - Sitemapの生成
- Google Analytics
- プログレッシブWebアプリ
- オフラインサポート
- RSSフィード
- JavascriptをStandardJSにリンクするための[Gatsby Standardモジュール](https://www.npmjs.com/package/eslint-config-gatsby-standard)
- JSでCSSをリントするためのStyled ComponentsのStylelintサポート


## 入門

### インストール

```
git clone https://github.com/toshiki-ogata/gatsby-starter-blog-contentful.git
npm i
```

## 設定

### ウェブサイトデータ

`/src/utils/siteConfig.js` を編集する

```
module.exports = {
  siteTitle: 'Gatsby Starter Blog',
  siteTitleAlt: 'Gatsby Starter Blog',
  publisher: 'Publisher named Gatsby Starter Blog',
  siteDescription:
    'A starter template to build amazing static websites with Gatsby, Contentful and Netlify',
  footerAboutText:
    'A starter template to build amazing static websites with Gatsby, Contentful and Netlify',
  siteUrl: 'https://gatsby-starter-blog-contentful.netlify.com/',
  postsPerPage: 9,
  pickUpPosts: ['markdown-cheatsheet', 'sample-post-1', 'sample-post-2'],
  author: 'GSB User',
  userTwitter: '@twitter',
  shortTitle: 'GSB App',
  shareImage: '/assets/share.png',
  shareImageWidth: 1200,
  shareImageHeight: 630,
  siteLogo: '',
  siteIcon: '/logos/logo-512.png',
  backgroundColor: '#000',
  themeColor: '#121212',
  copyright: '© 2019 GSB User',
  social: {
    twitter: `https://twitter.com/`,
    facebook: `https://www.facebook.com/`,
    instagram: `https://www.instagram.com/`,
    youtube: `https://www.youtube.com/`,
    github: `https://github.com/`,
    rss: `/rss.xml`,
  },
}
```
※：ローカルで開発するときに変更内容が反映されていない場合は`npm run clean`、開発サーバーを実行して再起動する必要があります。

### テーマ

`/src/styles/theme.js` を編集する

```
const theme = {
  fontFamily:
    '"Noto Sans", "Noto Sans CJK JP", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif',
  colors: {
    base: '#333',
    background: '#fff',
  },
  sizes: {
    maxWidth: '1050px',
    maxWidthCentered: '650px',
  },
  responsive: {
    medium: '768px',
  },
  lineHeight: {
    small: '1.4',
    medium: '1.8',
  },
  fontWeight: {
    medium: '400',
    large: '700',
  },
}
```

### コンテンツとSEO
1. `static/logos`ディレクトリ内の`share.jpg`,`logo-512`ファイルを置き換えることができます。これらのファイルを置き換えた後は、`/src/utils/siteConfig.js`で指定した画像サイズの寸法に編集してください。

## 展開

### 手動Netlifyデプロイメント

1. `gatsby build` を実行する
2. フォルダ`/public/`をNetlifyにドラッグアンドドロップします。


### GitからのNetlify展開（推奨）

1. [Gitからの新しいNetlifyウェブサイトを始める](https://app.netlify.com/start)
2. GitHubに接続してリポジトリを選択してください
3. Netlifyに移動します。**Settings → Build & Deploy → Build Environment Variables**に移動します。以下の環境変数をスペースIDとContent Delivery APIを使用して追加します - Contentfulからのアクセストークン。また、必要に応じてGoogle Analytics IDを入力することもできます。正しく機能するためには、変数にはこのように正確に名前を付ける必要があります。
```
ACCESS_TOKEN
SPACE_ID
GOOGLE_ANALYTICS
```
4. Netlify：**Deploys**に移動します。クリックし`Trigger deploy`て手動でデプロイを開始し、Webサイトがビルド環境変数を使用して正常にビルドされていることを確認します。この時点でmasterにプッシュするたびに自動的に開始され、運用環境に公開されます。


## 追加の設定

### Contentful Webhook（オプション）
1. Netlifyに移動します： **app.contentful.com → Space Settings → Webhooks**に移動します。新しいビルドフックを作成してください。
2. Contentfulに移動します： **app.contentful.com → Space Settings → Webhooks**。作成したばかりのNetlifyビルドURLを使用してWebフックを作成し、どのイベントが実稼働時にビルドをトリガーするかを構成します。たとえば、次のようにすると、投稿またはページが公開、未公開、または削除されるたびに本番用Webサイトが再構築されます。
