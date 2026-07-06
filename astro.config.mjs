// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// GitHub Pages（プロジェクトページ）向け設定。
// 公開URL: https://stellaberry.github.io/stella-berry-products/
export default defineConfig({
  site: 'https://stellaberry.github.io',
  base: '/stella-berry-products/',
  // ハブのルートは中身を置かず、製品トップ（はじめに）へ送る。
  redirects: {
    '/': '/stella-berry-products/role-garden-webui/',
  },
  integrations: [
    starlight({
      title: 'Role Garden WebUI Documents',
      // 日本語をルート（接頭辞なし）、他4言語は接頭辞つき。未訳ページは日本語へフォールバック。
      defaultLocale: 'root',
      locales: {
        root: { label: '日本語', lang: 'ja' },
        en: { label: 'English', lang: 'en' },
        ko: { label: '한국어', lang: 'ko' },
        zh: { label: '简体中文', lang: 'zh-CN' },
        'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
      },
      logo: { src: './src/assets/logo.svg', alt: 'Role Garden WebUI', replacesTitle: false },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/brand.css'],
      // 既定テーマを「ライト（陽だまりの庭）」に固定（ダークは右上トグルで選択可）。
      // 保存済みの選択が無い初回だけ light を種まきする。
      head: [
        {
          tag: 'script',
          content:
            "try{if(!localStorage.getItem('starlight-theme')){localStorage.setItem('starlight-theme','light');document.documentElement.dataset.theme='light';}}catch(e){}",
        },
      ],
      sidebar: [
        {
          label: 'Role Garden WebUI',
          items: [
            { label: 'はじめに', slug: 'role-garden-webui' },
            { label: 'インストール方法', slug: 'role-garden-webui/install' },
            { label: 'しくみ', slug: 'role-garden-webui/how-it-works' },
            {
              label: '基本操作',
              items: [
                { label: '基本操作の流れ', slug: 'role-garden-webui/basics' },
                { label: 'タイムライン', slug: 'role-garden-webui/basics/timeline' },
                { label: 'プロフィール', slug: 'role-garden-webui/basics/profile' },
                { label: 'フォロワー', slug: 'role-garden-webui/basics/followers' },
                { label: '通知', slug: 'role-garden-webui/basics/notifications' },
                { label: 'DM', slug: 'role-garden-webui/basics/dm' },
                { label: '世界観', slug: 'role-garden-webui/basics/worlds' },
                { label: '分析', slug: 'role-garden-webui/basics/analysis' },
                { label: '設定', slug: 'role-garden-webui/basics/settings' },
              ],
            },
            { label: 'スマホ接続', slug: 'role-garden-webui/mobile' },
            { label: 'トラブル対応', slug: 'role-garden-webui/troubleshooting' },
            { label: '利用規約', slug: 'role-garden-webui/terms' },
            { label: '第三者ライセンス', slug: 'role-garden-webui/third-party-licenses' },
            { label: '更新情報', slug: 'role-garden-webui/changelog' },
          ],
        },
      ],
    }),
  ],
});
