// Configure Prism for manual highlighting
window.Prism = window.Prism || {};
window.Prism.manual = true;

// Prism.js Core Library (minified)
(function(){var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(u){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,e={},M={manual:_self.Prism&&_self.Prism.manual,disableWorkerMessageHandler:_self.Prism&&_self.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof W?new W(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function t(e,r){var a,n;switch(r=r||{},M.util.type(e)){case"Object":if(n=M.util.objId(e),r[n])return r[n];for(var i in a={},r[n]=a,e)e.hasOwnProperty(i)&&(a[i]=t(e[i],r));return a;case"Array":return n=M.util.objId(e),r[n]?r[n]:(a=[],r[n]=a,e.forEach(function(e,n){a[n]=t(e,r)}),a);default:return e}},getLanguage:function(e){for(;e;){var n=t.exec(e.className);if(n)return n[1].toLowerCase();e=e.parentElement}return"none"},setLanguage:function(e,n){e.className=e.className.replace(RegExp(t,"gi"),""),e.classList.add("language-"+n)},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==n)return t[r]}return null}},isActive:function(e,n,t){for(var r="no-"+n;e;){var a=e.classList;if(a.contains(n))return!0;if(a.contains(r))return!1;e=e.parentElement}return!!t}},languages:{plain:e,plaintext:e,text:e,txt:e,extend:function(e,n){var t=M.util.clone(M.languages[e]);for(var r in n)t[r]=n[r];return t},insertBefore:function(t,e,n,r){var a=(r=r||M.languages)[t],i={};for(var l in a)if(a.hasOwnProperty(l)){if(l==e)for(var o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);n.hasOwnProperty(l)||(i[l]=a[l])}var s=r[t];return r[t]=i,M.languages.DFS(M.languages,function(e,n){n===s&&e!=t&&(this[e]=i)}),i},DFS:function e(n,t,r,a){a=a||{};var i=M.util.objId;for(var l in n)if(n.hasOwnProperty(l)){t.call(n,l,n[l],r||l);var o=n[l],s=M.util.type(o);"Object"!==s||a[i(o)]?"Array"!==s||a[i(o)]||(a[i(o)]=!0,e(o,t,l,a)):(a[i(o)]=!0,e(o,t,null,a))}}},plugins:{},highlightAll:function(e,n){M.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var r={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};M.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),M.hooks.run("before-all-elements-highlight",r);for(var a,i=0;a=r.elements[i++];)M.highlightElement(a,!0===n,r.callback)},highlightElement:function(e,n,t){var r=M.util.getLanguage(e),a=M.languages[r];M.util.setLanguage(e,r);var i=e.parentElement;i&&"pre"===i.nodeName.toLowerCase()&&M.util.setLanguage(i,r);var l={element:e,language:r,grammar:a,code:e.textContent};function o(e){l.highlightedCode=e,M.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,M.hooks.run("after-highlight",l),M.hooks.run("complete",l),t&&t.call(l.element)}if(M.hooks.run("before-sanity-check",l),(i=l.element.parentElement)&&"pre"===i.nodeName.toLowerCase()&&!i.hasAttribute("tabindex")&&i.setAttribute("tabindex","0"),!l.code)return M.hooks.run("complete",l),void(t&&t.call(l.element));if(M.hooks.run("before-highlight",l),l.grammar)if(n&&_self.Worker){var s=new Worker(M.filename);s.onmessage=function(e){o(e.data)},s.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else o(M.highlight(l.code,l.grammar,l.language));else o(M.util.encode(l.code))},highlight:function(e,n,t){var r={code:e,grammar:n,language:t};if(M.hooks.run("before-tokenize",r),!r.grammar)throw new Error('The language "'+r.language+'" has no grammar.');return r.tokens=M.tokenize(r.code,r.grammar),M.hooks.run("after-tokenize",r),W.stringify(M.util.encode(r.tokens),r.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest}var a=new i;return I(a,a.head,e),function e(n,t,r,a,i,l){for(var o in r)if(r.hasOwnProperty(o)&&r[o]){var s=r[o];s=Array.isArray(s)?s:[s];for(var u=0;u<s.length;++u){if(l&&l.cause==o+","+u)return;var c=s[u],g=c.inside,f=!!c.lookbehind,h=!!c.greedy,d=c.alias;if(h&&!c.pattern.global){var p=c.pattern.toString().match(/[imsuy]*$/)[0];c.pattern=RegExp(c.pattern.source,p+"g")}for(var v=c.pattern||c,m=a.next,y=i;m!==t.tail&&!(l&&y>=l.reach);y+=m.value.length,m=m.next){var k=m.value;if(t.length>n.length)return;if(!(k instanceof W)){var x,b=1;if(h){if(!(x=z(v,y,n,f))||x.index>=n.length)break;var w=x.index,A=x.index+x[0].length,P=y;for(P+=m.value.length;P<=w;)m=m.next,P+=m.value.length;if(P-=m.value.length,y=P,m.value instanceof W)continue;for(var E=m;E!==t.tail&&(P<A||"string"==typeof E.value);E=E.next)b++,P+=E.value.length;b--,k=n.slice(y,P),x.index-=y}else if(!(x=z(v,0,k,f)))continue;var w=x.index,L=x[0],S=k.slice(0,w),O=k.slice(w+L.length),j=y+k.length;l&&j>l.reach&&(l.reach=j);var C=m.prev;S&&(C=I(t,C,S),y+=S.length),q(t,C,b);var N=new W(o,g?M.tokenize(L,g):L,d,L);if(m=I(t,C,N),O&&I(t,m,O),1<b){var R={cause:o+","+u,reach:j};e(n,t,r,m.prev,y,R),l&&R.reach>l.reach&&(l.reach=R.reach)}}}}}}(e,a,n,a.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=M.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=M.hooks.all[e];if(t&&t.length)for(var r,a=0;r=t[a++];)r(n)}},Token:W};function W(e,n,t,r){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length}function z(e,n,t,r){e.lastIndex=n;var a=e.exec(t);if(a&&r&&a[1]){var i=a[1].length;a.index+=i,a[0]=a[0].slice(i)}return a}function i(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function I(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function q(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;(n.next=r).prev=n,e.length-=a}if(_self.Prism=M,W.stringify=function n(e,t){if("string"==typeof e)return e;if(Array.isArray(e)){var r="";return e.forEach(function(e){r+=n(e,t)}),r}var a={type:e.type,content:n(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},i=e.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(a.classes,i):a.classes.push(i)),M.hooks.run("wrap",a);var l="";for(var o in a.attributes)l+=" "+o+'="'+(a.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+l+">"+a.content+"</"+a.tag+">"},!_self.document)return _self.addEventListener&&(M.disableWorkerMessageHandler||_self.addEventListener("message",function(e){var n=JSON.parse(e.data),t=n.language,r=n.code,a=n.immediateClose;_self.postMessage(M.highlight(r,M.languages[t],t)),a&&_self.close()},!1)),M;var L=M.util.currentScript();function S(){M.manual||M.highlightAll()}if(L&&(M.filename=L.src,L.hasAttribute("data-manual")&&(M.manual=!0)),!M.manual){var O=document.readyState;"loading"===O||"interactive"===O&&L&&L.defer?document.addEventListener("DOMContentLoaded",S):window.requestAnimationFrame?window.requestAnimationFrame(S):window.setTimeout(S,16)}return M}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);})();

// Add basic C-like language if not present
if (!Prism.languages.clike) {
	Prism.languages.clike = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
				lookbehind: true,
				greedy: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true
			}
		],
		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: true,
			inside: {
				'punctuation': /[.\\]/
			}
		},
		'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		'boolean': /\b(?:false|true)\b/,
		'function': /\b\w+(?=\()/,
		'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		'punctuation': /[{}[\];(),.:]/
	};
}

// Dart language support for Prism.js
Prism.languages.dart = Prism.languages.extend('clike', {
	'class-name': [
		{
			pattern: /\b[A-Z]+\w*(?=\s+\w+\s*[;,=)]|\s*<)/,
			inside: {
				'keyword': /\b(?:abstract|base|class|enum|extends|extension|external|final|implements|interface|mixin|sealed|with)\b/,
				'class-name': /\b[A-Z]\w*/
			}
		},
		{
			// variables and parameters
			// this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
			pattern: /(\b(?:class|enum|extends|extension|implements|interface|mixin|on|with)\s+)[A-Z]\w*/,
			lookbehind: true
		},
		// generics
		/\b[A-Z]\w*(?=\s*<)/
	],
	'keyword': [
		/\b(?:abstract|as|assert|async|await|base|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|false|final|finally|for|Function|get|hide|if|implements|import|in|interface|is|late|library|mixin|new|null|on|operator|part|required|rethrow|return|sealed|set|show|static|super|switch|sync|this|throw|true|try|type|typedef|var|void|when|while|with|yield)\b/
	],
	'operator': /\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|<>=!]=?|\?/
});

Prism.languages.insertBefore('dart', 'class-name', {
	'metadata': {
		pattern: /@\w+/,
		alias: 'function'
	}
});

Prism.languages.insertBefore('dart', 'class-name', {
	'generics': {
		pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
		inside: {
			'class-name': /\b[A-Z]\w*/,
			'keyword': /\b(?:extends|super)\b/,
			'punctuation': /[<>(),.:]/,
			'operator': /[&?|]/
		}
	}
});

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function getGitHubUrl(repo, file) {
    return `https://github.com/${encodeURI(repo)}/blob/main/${encodeURI(file)}`;
}

class GitHubNotesWidget {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            proxyUrl: options.proxyUrl || './github-proxy.php',
            autoRefresh: options.autoRefresh || false,
            refreshInterval: options.refreshInterval || 300000, // 5 minutes
            showLastUpdated: options.showLastUpdated !== false,
            showRefreshButton: options.showRefreshButton !== false,
            loadingText: options.loadingText || 'Loading notes...',
            errorRetryDelay: options.errorRetryDelay || 5000,
            maxRetries: options.maxRetries || 3,
            ...options
        };

        this.repo = element.dataset.repo;
        // Strip any anchor from the file path and store separately
        const fileParts = (element.dataset.file || '').split('#');
        this.file = fileParts[0];
        this.anchor = element.dataset.anchor || fileParts[1] || null;
        this.cacheDuration = element.dataset.cacheDuration || null;

        this.retryCount = 0;
        this.refreshTimer = null;

        if (!this.repo || !this.file) {
            this.showError('Missing required data attributes: data-repo and data-file');
            return;
        }

        this.init();
    }

    init() {
        this.createStructure();
        this.loadContent();

        if (this.options.autoRefresh) {
            this.startAutoRefresh();
        }
    }

    createStructure() {
        this.element.className = 'github-notes-widget';
        this.element.innerHTML = `
            <div class="github-notes-header">
                <div class="github-notes-title">
                    <a href="${getGitHubUrl(this.repo, this.file)}" target="_blank" rel="noopener noreferrer" class="repo-link" title="View on GitHub">
                        <span class="repo-name">${escapeHtml(this.repo)}</span>
                        <span class="file-path">${escapeHtml(this.file)}</span>
                    </a>
                </div>
                <div class="github-notes-controls">
                    ${this.options.showRefreshButton ? '<button class="refresh-btn" title="Refresh content">↻</button>' : ''}
                    ${this.options.showLastUpdated ? '<span class="last-updated"></span>' : ''}
                </div>
            </div>
            <div class="github-notes-content">
                <div class="loading-spinner">${this.options.loadingText}</div>
            </div>
        `;

        // Add event listeners
        if (this.options.showRefreshButton) {
            const refreshBtn = this.element.querySelector('.refresh-btn');
            refreshBtn.addEventListener('click', () => this.refresh());
        }
    }

    async loadContent(forceRefresh = false) {
        const contentDiv = this.element.querySelector('.github-notes-content');
        const lastUpdatedSpan = this.element.querySelector('.last-updated');

        if (!forceRefresh) {
            this.showLoading();
        }

        try {
            const url = new URL(this.options.proxyUrl, window.location.href);
            url.searchParams.set('repo', this.repo);
            url.searchParams.set('file', this.file);

            if (forceRefresh) {
                url.searchParams.set('refresh', '1');
            }

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Unknown error occurred');
            }

            contentDiv.innerHTML = `<div class="github-content">${data.content}</div>`;

            // Apply syntax highlighting to code blocks
            this.applySyntaxHighlighting();

            // Scroll to anchor if specified
            if (this.anchor) {
                const target = contentDiv.querySelector('#' + CSS.escape(this.anchor));
                if (target) {
                    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                }
            }

            if (this.options.showLastUpdated && lastUpdatedSpan) {
                const lastUpdated = new Date(data.timestamp * 1000);
                lastUpdatedSpan.textContent = `Updated: ${lastUpdated.toLocaleString()}`;
                lastUpdatedSpan.className = 'last-updated';
            }

            // Reset retry count on success
            this.retryCount = 0;

            // Dispatch custom event
            this.element.dispatchEvent(new CustomEvent('github-notes-loaded', {
                detail: { content: data.content, timestamp: data.timestamp }
            }));

        } catch (error) {
            console.error('GitHub Notes Widget Error:', error);
            this.showError(error.message);

            // Retry logic
            if (this.retryCount < this.options.maxRetries) {
                this.retryCount++;
                setTimeout(() => this.loadContent(forceRefresh), this.options.errorRetryDelay);
            }
        }
    }

    showLoading() {
        const contentDiv = this.element.querySelector('.github-notes-content');
        contentDiv.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                ${this.options.loadingText}
            </div>
        `;
    }

    showError(message) {
        const contentDiv = this.element.querySelector('.github-notes-content');
        const githubUrl = getGitHubUrl(this.repo, this.file);

        if (this.retryCount < this.options.maxRetries) {
            contentDiv.innerHTML = `
                <div class="error-message">
                    <strong>Error loading notes:</strong> ${escapeHtml(message)}
                    <br><small>Retrying in ${this.options.errorRetryDelay / 1000} seconds... (${this.retryCount + 1}/${this.options.maxRetries})</small>
                </div>
            `;
        } else {
            contentDiv.innerHTML = `
                <div class="error-message error-final">
                    <strong>Unable to load content</strong>
                    <p>This content is temporarily unavailable. You can view it directly on GitHub or try again.</p>
                    <div class="error-actions">
                        <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="github-link-btn">View on GitHub</a>
                        <button class="retry-btn" onclick="this.closest('.github-notes-widget').gitHubWidget.refresh()">Try Again</button>
                    </div>
                </div>
            `;
        }

        const lastUpdatedSpan = this.element.querySelector('.last-updated');
        if (lastUpdatedSpan) {
            lastUpdatedSpan.textContent = 'Failed to load';
            lastUpdatedSpan.className = 'last-updated error';
        }
    }

    applySyntaxHighlighting() {
        // Find all code blocks in the widget
        const codeBlocks = this.element.querySelectorAll('pre code');

        codeBlocks.forEach(codeBlock => {
            // Detect language from class attributes
            let language = 'none';
            const classes = codeBlock.className || '';
            const languageMatch = classes.match(/(?:^|\s)(?:language-|lang-)(\w+)(?:\s|$)/);

            if (languageMatch) {
                language = languageMatch[1].toLowerCase();
            } else {
                // Try to detect from parent pre element
                const parentClasses = codeBlock.parentElement ? codeBlock.parentElement.className || '' : '';
                const parentLanguageMatch = parentClasses.match(/(?:^|\s)(?:language-|lang-)(\w+)(?:\s|$)/);
                if (parentLanguageMatch) {
                    language = parentLanguageMatch[1].toLowerCase();
                }
            }

            // Set the language class for Prism.js
            if (language && language !== 'none' && Prism.languages[language]) {
                // Add language class to code element if not present
                if (!codeBlock.classList.contains(`language-${language}`)) {
                    codeBlock.classList.add(`language-${language}`);
                }

                // Apply syntax highlighting
                try {
                    Prism.highlightElement(codeBlock);
                } catch (error) {
                    console.warn('Failed to highlight code block:', error);
                }
            }
        });
    }

    refresh() {
        this.retryCount = 0;
        this.loadContent(true);
    }

    startAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }

        this.refreshTimer = setInterval(() => {
            this.loadContent(false);
        }, this.options.refreshInterval);
    }

    stopAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }

    destroy() {
        this.stopAutoRefresh();
        this.element.innerHTML = '';
    }
}

// Auto-initialize widgets
document.addEventListener('DOMContentLoaded', function() {
    const widgets = document.querySelectorAll('.github-notes[data-repo][data-file]');

    widgets.forEach(element => {
        // Parse options from data attributes
        const options = {};

        if (element.dataset.proxyUrl) options.proxyUrl = element.dataset.proxyUrl;
        if (element.dataset.autoRefresh) options.autoRefresh = element.dataset.autoRefresh === 'true';
        if (element.dataset.refreshInterval) options.refreshInterval = parseInt(element.dataset.refreshInterval) * 1000;
        if (element.dataset.loadingText) options.loadingText = element.dataset.loadingText;

        // Create widget instance and store reference
        element.gitHubWidget = new GitHubNotesWidget(element, options);
    });
});

// Global function for manual initialization
window.initGitHubNotesWidget = function(selector, options) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        if (!element.gitHubWidget) {
            element.gitHubWidget = new GitHubNotesWidget(element, options);
        }
    });
};