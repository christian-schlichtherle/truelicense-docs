import {defineConfig} from 'vitepress'
import abbr from 'markdown-it-abbr'
import deflist from 'markdown-it-deflist'

export default defineConfig({
    title: 'TrueLicense',
    description: 'An open source engine for license management on the JVM',
    cleanUrls: true,
    lastUpdated: true,
    head: [
        ['link', {rel: 'icon', href: '/image/wizard-2.png'}],
    ],
    markdown: {
        config: md => [abbr, deflist].forEach(plugin => md.use(plugin)),
    },
    sitemap: {
        hostname: 'https://truelicense.namespace.global',
    },
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/christian-schlichtherle/truelicense-docs/edit/develop/docs/:path',
            text: 'Edit this page on GitHub!',
        },
        footer: {
            message: 'Apache License 2.0',
            copyright: 'Copyright © 2020 - 2026 Schlichtherle IT Services',
        },
        nav: [
            {text: 'Guide', link: '/guide/introduction'},
            {text: 'Reference', link: '/reference/config-properties'},
        ],
        // Replaces the per page `sidebarDepth: 2` frontmatter of the previous VuePress setup.
        outline: [2, 3],
        search: {
            provider: 'local',
        },
        sidebar: {
            '/guide/': [
                {
                    text: 'Guide',
                    items: [
                        {text: 'Introduction', link: '/guide/introduction'},
                        {text: 'Getting Started', link: '/guide/getting-started'},
                        {text: 'Example Configurations', link: '/guide/example-configurations'},
                        {text: 'Project Structure', link: '/guide/project-structure'},
                        {text: 'Setting Up A VCS', link: '/guide/setting-up-a-vcs'},
                        {text: 'Building Your Project', link: '/guide/building-your-project'},
                        {text: 'Using The CLI', link: '/guide/using-the-cli'},
                        {text: 'Using The WSI', link: '/guide/using-the-wsi'},
                        {text: 'Using The API', link: '/guide/using-the-api'},
                        {text: 'Updating Your Project', link: '/guide/updating-your-project'},
                    ],
                },
            ],
            '/reference/': [
                {
                    text: 'Reference',
                    items: [
                        {text: 'Configuration Properties', link: '/reference/config-properties'},
                    ],
                },
            ],
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/christian-schlichtherle/truelicense'},
        ],
    },
})
