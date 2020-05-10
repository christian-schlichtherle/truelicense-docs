module.exports = {
    description: 'An open source engine for license management on the JVM',
    markdown: {
        extendMarkdown: md => ['abbr', 'deflist'].forEach(plugin => md.use(require('markdown-it-' + plugin)))
    },
    themeConfig: {
        docsBranch: 'develop',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub!',
        nav: [
            {
                link: '/guide/introduction',
                text: 'Guide',
            },
            {
                link: '/reference/config-properties',
                text: 'Reference',
            },
        ],
        repo: 'christian-schlichtherle/truelicense-docs',
        sidebar: {
            '/reference/': [
                'config-properties',
            ],
            '/guide/': [
                'introduction',
                'getting-started',
                'directory-tree',
                'example-configs',
            ],
        }
    },
    title: 'TrueLicense',
}
