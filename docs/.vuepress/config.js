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
                link: '/guide/introduction.html',
                text: 'Guide',
            },
            {
                link: '/reference/config-properties.html',
                text: 'Reference',
            },
        ],
        repo: 'christian-schlichtherle/truelicense-docs',
        sidebar: {
            '/guide/': [
                'introduction',
                'getting-started',
                'example-configurations',
                'project-structure',
                'setting-up-a-vcs',
                'building-the-project',
                'using-the-cli',
            ],
            '/reference/': [
                'config-properties',
            ],
        }
    },
    title: 'TrueLicense',
}
