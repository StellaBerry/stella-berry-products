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
        // 全言語で Noto ファミリーを使用(ja=JP / en=Noto Sans / ko=KR / zh-CN=SC / zh-TW=TC)。
        // フォント本体(woff2)は unicode-range 分割されており、必要な文字分のみダウンロードされる。
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+JP:wght@400;600;700&family=Noto+Sans+KR:wght@400;600;700&family=Noto+Sans+SC:wght@400;600;700&family=Noto+Sans+TC:wght@400;600;700&display=swap',
          },
        },
      ],
      sidebar: [
        {
          label: 'Role Garden WebUI',
          items: [
            { label: 'はじめに', translations: { en: 'Getting Started', ko: '시작하기', 'zh-CN': '开始使用', 'zh-TW': '開始使用' }, slug: 'role-garden-webui' },
            { label: 'インストール方法', translations: { en: 'Installation', ko: '설치 방법', 'zh-CN': '安装方法', 'zh-TW': '安裝方法' }, slug: 'role-garden-webui/install' },
            { label: 'しくみ', translations: { en: 'How It Works', ko: '작동 원리', 'zh-CN': '工作原理', 'zh-TW': '運作原理' }, slug: 'role-garden-webui/how-it-works' },
            {
              label: '基本操作',
              translations: { en: 'Basics', ko: '기본 조작', 'zh-CN': '基本操作', 'zh-TW': '基本操作' },
              items: [
                { label: '基本操作の流れ', translations: { en: 'Basic Workflow', ko: '기본 조작 흐름', 'zh-CN': '基本操作流程', 'zh-TW': '基本操作流程' }, slug: 'role-garden-webui/basics' },
                { label: 'タイムライン', translations: { en: 'Timeline', ko: '타임라인', 'zh-CN': '时间线', 'zh-TW': '時間軸' }, slug: 'role-garden-webui/basics/timeline' },
                { label: 'プロフィール', translations: { en: 'Profile', ko: '프로필', 'zh-CN': '个人资料', 'zh-TW': '個人檔案' }, slug: 'role-garden-webui/basics/profile' },
                { label: 'フォロワー', translations: { en: 'Followers', ko: '팔로워', 'zh-CN': '关注者', 'zh-TW': '追蹤者' }, slug: 'role-garden-webui/basics/followers' },
                { label: '通知', translations: { en: 'Notifications', ko: '알림', 'zh-CN': '通知', 'zh-TW': '通知' }, slug: 'role-garden-webui/basics/notifications' },
                { label: 'DM', slug: 'role-garden-webui/basics/dm' },
                { label: '世界観', translations: { en: 'Worlds', ko: '세계관', 'zh-CN': '世界观', 'zh-TW': '世界觀' }, slug: 'role-garden-webui/basics/worlds' },
                { label: '分析', translations: { en: 'Analysis', ko: '분석', 'zh-CN': '分析', 'zh-TW': '分析' }, slug: 'role-garden-webui/basics/analysis' },
                { label: '設定', translations: { en: 'Settings', ko: '설정', 'zh-CN': '设置', 'zh-TW': '設定' }, slug: 'role-garden-webui/basics/settings' },
              ],
            },
            { label: 'スマホ接続', translations: { en: 'Mobile Access', ko: '스마트폰 연결', 'zh-CN': '手机连接', 'zh-TW': '手機連線' }, slug: 'role-garden-webui/mobile' },
            { label: 'トラブル対応', translations: { en: 'Troubleshooting', ko: '문제 해결', 'zh-CN': '故障排除', 'zh-TW': '疑難排解' }, slug: 'role-garden-webui/troubleshooting' },
            { label: '利用規約', translations: { en: 'Terms of Use', ko: '이용약관', 'zh-CN': '使用条款', 'zh-TW': '使用條款' }, slug: 'role-garden-webui/terms' },
            { label: '第三者ライセンス', translations: { en: 'Third-Party Licenses', ko: '제3자 라이선스', 'zh-CN': '第三方许可', 'zh-TW': '第三方授權' }, slug: 'role-garden-webui/third-party-licenses' },
            { label: '更新情報', translations: { en: 'Changelog', ko: '업데이트 정보', 'zh-CN': '更新信息', 'zh-TW': '更新資訊' }, slug: 'role-garden-webui/changelog' },
          ],
        },
      ],
    }),
  ],
});
