// macOS 风格代码块（重构版）
// 支持 Hexo highlight.js 输出的 <figure class="highlight lang"> 结构，以及裸 <pre><code>
(function () {
    // 语言显示名映射（更友好）
    var LANG_MAP = {
        js: 'JavaScript', javascript: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript',
        py: 'Python', python: 'Python', bash: 'Bash', sh: 'Shell', shell: 'Shell', zsh: 'Zsh',
        html: 'HTML', css: 'CSS', json: 'JSON', yml: 'YAML', yaml: 'YAML', toml: 'TOML',
        md: 'Markdown', markdown: 'Markdown', java: 'Java', c: 'C', cpp: 'C++', cxx: 'C++',
        csharp: 'C#', cs: 'C#', go: 'Go', rs: 'Rust', rust: 'Rust', php: 'PHP', rb: 'Ruby',
        ruby: 'Ruby', sql: 'SQL', xml: 'XML', diff: 'Diff', plain: 'Text', text: 'Text',
        dockerfile: 'Dockerfile', makefile: 'Makefile', ini: 'INI', conf: 'Config'
    };

    function prettyLang(lang) {
        if (!lang) return 'Text';
        var k = String(lang).toLowerCase();
        return LANG_MAP[k] || lang;
    }

    function detectLangFromFigure(figure) {
        var classes = figure.className.split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] !== 'highlight' && classes[i] !== '') return classes[i];
        }
        var code = figure.querySelector('code');
        if (code) {
            var m = (code.className || '').match(/language-([\w-]+)/);
            if (m) return m[1];
        }
        return '';
    }

    function detectLangFromPre(pre) {
        if (pre.dataset && pre.dataset.language) return pre.dataset.language;
        var code = pre.querySelector('code');
        var cls = code ? (code.className || '') : '';
        var m = cls.match(/language-([\w-]+)/) || cls.match(/lang-([\w-]+)/);
        return m ? m[1] : '';
    }

    function buildHeader(lang) {
        var header = document.createElement('div');
        header.className = 'mac-code-header';

        var dots = document.createElement('span');
        dots.className = 'mac-code-dots';
        dots.innerHTML =
            '<span class="mac-code-dot red"></span>' +
            '<span class="mac-code-dot yellow"></span>' +
            '<span class="mac-code-dot green"></span>';

        var title = document.createElement('span');
        title.className = 'mac-code-title';
        title.textContent = prettyLang(lang);

        var actions = document.createElement('span');
        actions.className = 'mac-code-actions';

        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'mac-code-btn mac-code-toggle';
        toggle.setAttribute('aria-label', 'Toggle code');
        toggle.innerHTML = '<mdui-icon name="unfold_less"></mdui-icon>';

        var copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'mac-code-btn mac-code-copy';
        copy.setAttribute('aria-label', 'Copy code');
        copy.innerHTML = '<mdui-icon name="content_copy"></mdui-icon>';

        actions.appendChild(toggle);
        actions.appendChild(copy);

        header.appendChild(dots);
        header.appendChild(title);
        header.appendChild(actions);
        return header;
    }

    // 包装 Hexo highlight.js 输出的 figure
    function wrapFigure(figure) {
        if (figure.closest('.mac-code-block')) return;
        var lang = detectLangFromFigure(figure);

        var block = document.createElement('div');
        block.className = 'mac-code-block';
        var header = buildHeader(lang);
        var body = document.createElement('div');
        body.className = 'mac-code-body';

        // 先在原位置用 block 替换 figure，再组装内部结构（避免循环引用）
        figure.parentNode.replaceChild(block, figure);
        body.appendChild(figure);
        block.appendChild(header);
        block.appendChild(body);
        block.setAttribute('data-lang', lang || '');
    }

    // 包装裸 pre（未走 highlight.js 的代码）
    function wrapBarePre(pre) {
        if (pre.closest('.mac-code-block')) return;
        if (pre.closest('figure.highlight')) return;

        var lang = detectLangFromPre(pre);

        var block = document.createElement('div');
        block.className = 'mac-code-block';
        var header = buildHeader(lang);
        var body = document.createElement('div');
        body.className = 'mac-code-body';

        pre.parentNode.replaceChild(block, pre);
        body.appendChild(pre);
        block.appendChild(header);
        block.appendChild(body);
        block.setAttribute('data-lang', lang || '');
    }

    function getCodeText(block) {
        var codePre = block.querySelector('.code pre') || block.querySelector('.mac-code-body > pre');
        return codePre ? codePre.textContent : '';
    }

    function flashCopy(button) {
        var icon = button.querySelector('mdui-icon');
        var orig = icon ? icon.name : '';
        if (icon) icon.name = 'check';
        button.classList.add('copied');
        setTimeout(function () {
            if (icon) icon.name = orig || 'content_copy';
            button.classList.remove('copied');
        }, 1800);
    }

    function fallbackCopy(text, button) {
        try {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            flashCopy(button);
        } catch (err) {
            console.error('Copy failed', err);
        }
    }

    function init() {
        // 先处理 figure.highlight（Hexo 高亮输出）
        var figures = document.querySelectorAll('figure.highlight');
        for (var i = 0; i < figures.length; i++) {
            wrapFigure(figures[i]);
        }

        // 再处理裸 pre（非高亮代码）
        var pres = document.querySelectorAll('.article-content pre');
        for (var j = 0; j < pres.length; j++) {
            if (pres[j].closest('figure.highlight')) continue;
            if (pres[j].closest('.mac-code-block')) continue;
            wrapBarePre(pres[j]);
        }

        // 事件委托：折叠/展开 & 复制
        document.addEventListener('click', function (e) {
            if (!e.target || !e.target.closest) return;

            var toggle = e.target.closest('.mac-code-toggle');
            if (toggle) {
                var block = toggle.closest('.mac-code-block');
                if (block) {
                    block.classList.toggle('is-collapsed');
                    var icon = toggle.querySelector('mdui-icon');
                    if (icon) {
                        icon.name = block.classList.contains('is-collapsed') ? 'unfold_more' : 'unfold_less';
                    }
                }
                return;
            }

            var copyBtn = e.target.closest('.mac-code-copy');
            if (copyBtn) {
                var block = copyBtn.closest('.mac-code-block');
                if (!block) return;
                var text = getCodeText(block);
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text)
                        .then(function () { flashCopy(copyBtn); })
                        .catch(function () { fallbackCopy(text, copyBtn); });
                } else {
                    fallbackCopy(text, copyBtn);
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
