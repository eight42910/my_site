# ポートフォリオサイト 運用手順書

## 開発/実行
```
npm install
npm run dev
```
- 開発サーバ: `http://localhost:3000`

## ビルド/本番
```
npm run build
npm run start
```

## コンテンツ更新
### Blog記事の追加/更新
1) `content/posts/*.mdx` を追加または編集  
2) フロントマターに `category` を必ず設定 (`ai` or `wine`)  
3) 下書きは `draft: true` を追加  

注意:
- 一覧/RSS/サイトマップから除外したい場合は `draft: true`
- 記事の公開順は `date` の降順

### Workの追加/更新
1) `content/works/*.mdx` を追加または編集  
2) `coverImage` / `gallery` に使用する画像を `public/works` に追加  
3) `publishedAt` を設定 (新着順に反映)

注意:
- Works一覧は `publishedAt` の降順
- HomeのWorksは先頭2件のみ表示

### Productの更新
- `app/product/page.tsx` の `products` 配列を編集
- カード見た目を変える場合は `cardVariant` を切り替え

## サイト情報/SEO設定
### サイト基本情報
- `lib/seo.ts` の `siteConfig` を更新
  - `url`, `title`, `description`, `twitter`
  - JSON-LD で参照されるため最新の情報を維持

### OGP画像
- 既定OGP: `public/og/default.svg`
- 個別記事/Workで設定する場合は各MDXの `coverImage` を使用

## 問い合わせ先変更
- `components/ContactForm.tsx` の `mailto:` と表示テキストを変更
  - `hello@example.com` を実際の連絡先に置き換え

## 追加/更新時の確認項目
- `npm run lint` が通る
- `npm run build` が通る
- `siteConfig.url` が実ドメインに一致
- `content/posts` と `content/works` の `slug` がURLと一致

