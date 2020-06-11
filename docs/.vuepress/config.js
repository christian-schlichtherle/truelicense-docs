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
                link: '/guide/introduction.md',
                text: 'Guide',
            },
            {
                link: '/reference/config-properties.md',
                text: 'Reference',
            },
        ],
        repo: 'christian-schlichtherle/truelicense-docs',
        sidebar: {
            '/guide/': [
                'introduction.md',
                'getting-started.md',
                'example-configurations.md',
                'project-structure.md',
                'setting-up-a-vcs.md',
                'building-your-project.md',
                'using-the-cli.md',
                'using-the-wsi.md',
                'using-the-api.md',
                'updating-your-project.md',
            ],
            '/reference/': [
                'config-properties.md',
            ],
        }
    },
    title: 'TrueLicense',
}
