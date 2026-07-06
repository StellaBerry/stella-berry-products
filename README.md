# stella-berry-products

Stella Berry の製品ドキュメント/サポートサイト（[Astro](https://astro.build) + [Starlight](https://starlight.astro.build)）。

公開URL: `https://stellaberry.github.io/stella-berry-products/`
（ルートは製品トップ「はじめに」へリダイレクトします）

## 収録製品

- **Role Garden WebUI Documents** — `role-garden-webui/`

## 開発

```sh
npm install
npm run dev      # ローカル開発サーバー
npm run build    # 本番ビルド（dist/）
npm run preview  # ビルド結果をプレビュー
```

## 多言語

日本語（既定・URL接頭辞なし）＋ 英語 / 韓国語 / 簡体中文 / 繁体中文。
未訳ページは日本語へ自動フォールバックします。翻訳は各言語フォルダに追加していきます。

## テーマ

ライト「陽だまりの庭」を既定、ダーク「宵の庭」を選択可（右上トグル）。配色はアプリ本体のブランドテーマと一致。

## デプロイ / ブランチ運用

`.github/workflows/deploy.yml` により、`main` への push で GitHub Actions がビルドし GitHub Pages へ公開します。
リポジトリの Settings → Pages で Source を「GitHub Actions」に設定してください。

- `main`: 公開される GitHub Pages ソース。
- `develop`: 下書き・更新作業用ブランチ。
- 公開サイトを更新するときだけ `develop` を `main` にマージします。
