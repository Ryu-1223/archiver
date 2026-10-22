# madoromi / archiver

AIと一緒につくった小さなウェブサイトを紹介する、日本語のポートフォリオサイトです。制作物一覧とAboutを1ページにまとめています。

## 技術構成

- Next.js 16.4（App Router） / React 19 / TypeScript
- Tailwind CSS 4 / shadcn UI・Base UI
- パッケージ管理：pnpm（`package.json` の指定は `12.3.4`）
- 本番環境のアクセス解析：Vercel Analytics

制作物データは `app/page.tsx` 内で管理します。現時点ではデータベース、CMS、管理画面、独自のAPIはありません。

## ローカル開発

Node.js 20.9以上と、`package.json` の `packageManager` に指定されたpnpmを用意してください。チームやCIでもNode.jsとpnpmのバージョンを揃えて運用します。

```bash
git clone https://github.com/Ryu-1223/archiver.git
cd archiver
pnpm install --frozen-lockfile
pnpm dev
```

ブラウザで <http://localhost:3000> を開きます。ポートが使用中の場合は、開発サーバーのログに表示されるURLを確認してください。

現在の実装で、起動に必要な環境変数はありません。今後ローカル用の設定を追加する場合は、Gitの追跡対象外になっている `.env.local` を使用し、秘密情報をコミットしないでください。

### コマンド

| コマンド | 用途 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm exec tsc --noEmit` | TypeScriptの型チェック |
| `pnpm build` | 本番用ビルドを作成 |
| `pnpm start` | ビルド済みの本番用サーバーを起動 |

`pnpm start` の前には `pnpm build` が必要です。テスト・Lint用のスクリプトは現在ありません。

## 主なファイル

```text
app/
  page.tsx          トップページの構成・制作物データ
  layout.tsx        メタデータ・フォント・アイコン・アクセス解析
  globals.css       配色・レイアウト・レスポンシブ対応
components/ui/
  button.tsx        共通ボタン部品（現在のトップページでは未使用）
lib/
  utils.ts          CSSクラスを結合するユーティリティ
public/            アイコンなどの静的ファイル
next.config.mjs    Next.jsの設定
```

## 日常の更新方法

### 制作物を追加・修正する

`app/page.tsx` 冒頭の `projects` 配列を編集します。配列の順番が表示順になります。

```tsx
{
  title: '新しい制作物',
  description: '制作物の短い説明。',
  category: 'ツール',
  year: '2026',
  url: 'https://your-project.example.com',
  tone: 'ink',
},
```

- `title`：作品名。同じタイトルが重複しないようにします（Reactのキーにも使用）。
- `description`：一覧に表示する説明。
- `category` / `year`：カテゴリと制作年。現在のデザインではスマートフォン幅で非表示になります。
- `url`：公開先URL。リンクは別タブで開きます。
- `tone`：番号の文字色。既存の選択肢は `ink`、`sand`、`clay`、`blue` です。

作品番号と件数は自動で反映されます。ページ上部の期間「2023–2024」とフッターの年「2024」は固定テキストなので、必要に応じて別途更新してください。初期の4作品のURLはサンプルのため、公開時には実際のURLへ差し替えます。

### 文章・見た目を変更する

- キャッチコピー、About、ナビゲーション：`app/page.tsx`
- 色、余白、文字サイズ、スマートフォン表示：`app/globals.css`
- ブラウザのタイトル、説明文、フォント：`app/layout.tsx`
- ファビコンなど：`public/` のファイルと `app/layout.tsx` の参照先

共有UI向けのダークモード変数はありますが、トップページの背景色・文字色は固定されています。ページ全体のダークモードを整備する際は、実際の表示も確認してください。

## 公開・デプロイ

### Vercelで公開する場合

1. VercelでこのGitHubリポジトリをインポートします。
2. Framework PresetをNext.js、アプリのルートをリポジトリ直下に設定します。
3. インストールは `pnpm install --frozen-lockfile`、ビルドは `pnpm build` を使用します。pnpmのバージョンがリポジトリの指定に対応していることを確認してください。
4. プレビュー環境で表示とリンクを確認し、本番に公開します。

Git連携後の自動デプロイ対象はVercel側のProduction Branch設定に従います。このリポジトリにはデプロイ用のCI設定は含まれていません。

`app/layout.tsx` は本番環境でのみVercel Analyticsを読み込みます。解析を利用する場合は、Vercel側でも対象プロジェクトのWeb Analyticsを有効にしてください。

### Node.jsサーバーで公開する場合

```bash
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

必要に応じて `PORT=8080 pnpm start` のようにポートを指定できます。継続運用する場合は、実行環境側でプロセス管理、HTTPS、ログ管理を設定してください。

現在の設定はNext.jsサーバーでの実行を前提とし、静的HTMLの書き出し設定はありません。また、ビルド時には `next/font/google` が使用するGoogle Fontsへの通信が必要になる場合があります。

## 更新時の確認

1. `pnpm dev` でPC幅・スマートフォン幅の表示、ページ内リンク、制作物のリンク先を確認します。
2. `pnpm exec tsc --noEmit` を実行します。
3. `pnpm build` を実行し、必要に応じて `pnpm start` で本番用の表示も確認します。
4. 差分を確認してコミットし、プレビュー環境で確認してから本番へ反映します。

**現在は `next.config.mjs` の `typescript.ignoreBuildErrors` が `true` のため、ビルド成功だけでは型エラーがないことを保証できません。型チェックは別途実行してください。** また、画像最適化は `images.unoptimized: true` で無効化されています。

依存関係を更新するときは `package.json` と `pnpm-lock.yaml` をセットでコミットします。`.next/` と `node_modules/` は生成物のためコミットしません。

開発支援向けの注意事項は `AGENTS.md` を参照してください。Next.jsのコードを変更する際は、そこに従ってインストール済みバージョンのドキュメントも確認します。
