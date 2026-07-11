const obsidian = require('obsidian');

class BionicReaderPlugin extends obsidian.Plugin {
    async onload() {
        console.log('Loading Bionic Reader Obsidian plugin');
        
        // Hook into Obsidian's Markdown reading panel pipeline
        this.registerMarkdownPostProcessor((el, ctx) => {
            this.formatElement(el);
        });
    }

    formatElement(element) {
        // Skip tags that should never be formatted
        const ignoredTags = ['SCRIPT', 'STYLE', 'PRE', 'CODE', 'INPUT', 'TEXTAREA', 'SVG'];
        if (ignoredTags.includes(element.tagName)) {
            return;
        }

        // Avoid double formatting already processed sections
        if (element.classList?.contains('bionic-reader-text') || element.closest('.bionic-reader-text')) {
            return;
        }

        const nodes = Array.from(element.childNodes);
        for (let node of nodes) {
            if (node.nodeType === 3) { // Text Node
                const text = node.nodeValue;
                if (!text || !text.trim()) {
                    continue;
                }

                // Transform text node into formatted DOM nodes
                const span = this.transformTextNode(text);
                if (span && node.parentNode) {
                    node.parentNode.replaceChild(span, node);
                }
            } else if (node.nodeType === 1) { // Element Node
                this.formatElement(node);
            }
        }
    }

    transformTextNode(text) {
        // Split by spaces but preserve whitespace tokens
        const tokens = text.split(/(\s+)/);
        const span = document.createElement('span');
        span.className = 'bionic-reader-text';
        let changed = false;

        for (let token of tokens) {
            if (token.trim()) {
                changed = true;
                const match = token.match(/^(\W*)(.*?)(\W*)$/);
                if (!match) {
                    span.appendChild(document.createTextNode(token));
                    continue;
                }
                const [_, prefix, core, suffix] = match;
                if (!core) {
                    span.appendChild(document.createTextNode(token));
                    continue;
                }

                const len = core.length;
                let splitLen = 1;
                if (len <= 3) {
                    splitLen = 1;
                } else if (len <= 5) {
                    splitLen = 2;
                } else if (len <= 8) {
                    splitLen = 3;
                } else {
                    splitLen = Math.max(4, Math.floor(len * 0.4));
                }

                if (prefix) {
                    span.appendChild(document.createTextNode(prefix));
                }

                const bNode = document.createElement('b');
                bNode.textContent = core.substring(0, splitLen);
                span.appendChild(bNode);

                const restNode = document.createTextNode(core.substring(splitLen));
                span.appendChild(restNode);

                if (suffix) {
                    span.appendChild(document.createTextNode(suffix));
                }
            } else {
                span.appendChild(document.createTextNode(token));
            }
        }

        return changed ? span : null;
    }

    onunload() {
        console.log('Unloading Bionic Reader Obsidian plugin');
    }
}

module.exports = BionicReaderPlugin;
