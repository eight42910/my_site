# ポートフォリオサイト 仕様書

## 概要
- フレームワーク: Next.js 14 (App Router)
- 言語/スタイル: TypeScript + Tailwind CSS
- コンテンツ: MDX (Works/Blog)
- 主要ページ: Home / Product / Work / Blog / About

## サイトマップ
- `/`: トップ。ヒーロー、サービス、Works抜粋、Blog抜粋
- `/product`: 自作プロダクト/ツール一覧
- `/works`: 作品一覧
- `/works/[slug]`: 作品詳細 (MDX)
- `/blog`: ブログ一覧 (カテゴリタブ)
- `/blog/[slug]`: ブログ詳細 (MDX)
- `/about`: プロフィール + 問い合わせフォーム
- `/rss.xml`: ブログRSS
- `/sitemap.xml`: サイトマップ
- `/robots.txt`: robots

## 画面/機能仕様
### Home (`app/page.tsx`)
- Worksは `content/works` を新着順で取得し、先頭2件のみ表示
- Blogは `content/posts` を新着順で取得し、先頭3件のみ表示
- 主要CTA: Worksへの導線

### Product (`app/product/page.tsx`)
- 配列 `products` によるカード一覧
- `cardVariant` でカードの外観を切り替え (`soft`/`border`)

### Work一覧 (`app/works/page.tsx`)
- 全Worksを新着順で表示
- 偶数/奇数でカードのカラム幅とオフセットを変えてレイアウト

### Work詳細 (`app/works/[slug]/page.tsx`)
- MDX本文を本文領域に表示
- 右カラムにメタ情報 (Year/Category/Roles/Stack/AI Involvement/Outcome/Results)
- ギャラリー画像を2カラムで表示
- JSON-LD: CreativeWork

### Blog一覧 (`app/blog/page.tsx`)
- タブでカテゴリ切替 (Logic=AI/Tech, Sensibility=Wine)
- タブ初期表示は AI

### Blog詳細 (`app/blog/[slug]/page.tsx`)
- カテゴリによって見出しラベル色と本文フォントが変化
- JSON-LD: BlogPosting

### About (`app/about/page.tsx`)
- Capability一覧
- 問い合わせフォーム (mailto)

## コンテンツ仕様
### Blog (MDX)
配置: `content/posts/*.mdx`

フロントマター:
```
title: string
slug: string
date: "YYYY-MM-DD"
excerpt: string
tags: string[]
category: "ai" | "wine"
coverImage?: string
draft?: boolean
```
- `draft: true` の記事は一覧/ RSS / sitemap から除外
- 読了時間は本文から自動算出
- 一覧は `date` の降順で並び替え

### Work (MDX)
配置: `content/works/*.mdx`

フロントマター:
```
title: string
slug: string
year: string
category: string
summary: string
outcome: string
roles: string[]
stack: string[]
coverImage: string
gallery: string[]
aiInvolvement: string
results: string
publishedAt: "YYYY-MM-DD"
```
- 一覧は `publishedAt` の降順で並び替え

## ナビゲーション/アクセシビリティ
- ヘッダーはスクロールに応じて高さと背景が変化
- モバイルメニューはフォーカストラップ/スクロールロックに対応
- `prefers-reduced-motion` を尊重

## SEO/メタデータ
- サイト共通設定: `lib/seo.ts`
- OGP: `public/og/default.svg`
- `robots.txt`, `sitemap.xml`, `rss.xml` は `siteConfig.url` を参照

