// https://github.com/PrismJS/prism/blob/master/plugins/diff-highlight/prism-diff-highlight.js

module.exports = (Prism) => {
  const LANGUAGE_REGEX = /diff-([\w-]+)/i;
  const HTML_TAG =
    /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/gi;
  //this will match a line plus the line break while ignoring the line breaks HTML tags may contain.
  const HTML_LINE = RegExp(
    /(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))/.source.replace(
      /__/g,
      function () {
        return HTML_TAG.source;
      },
    ),
    'gi',
  );

  const PREFIXES = Prism.languages.diff.PREFIXES;

  Prism.hooks.add('before-sanity-check', function (env) {
    const lang = env.language;
    if (LANGUAGE_REGEX.test(lang) && !env.grammar) {
      env.grammar = Prism.languages[lang] = Prism.languages['diff'];
    }
  });
  Prism.hooks.add('before-tokenize', function (env) {
    const lang = env.language;
    if (LANGUAGE_REGEX.test(lang) && !Prism.languages[lang]) {
      Prism.languages[lang] = Prism.languages['diff'];
    }
  });

  Prism.hooks.add('wrap', function (env) {
    let diffLanguage, diffGrammar;

    if (env.language !== 'diff') {
      const langMatch = LANGUAGE_REGEX.exec(env.language);
      if (!langMatch) {
        return; // not a language specific diff
      }

      diffLanguage = langMatch[1];
      diffGrammar = Prism.languages[diffLanguage];
    }

    // one of the diff tokens without any nested tokens
    if (env.type in PREFIXES) {
      /** @type {string} */
      const content = env.content.replace(HTML_TAG, ''); // remove all HTML tags

      /** @type {string} */
      const decoded = content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');

      // remove any one-character prefix
      const code = decoded.replace(/(^|[\r\n])./g, '$1');

      // highlight, if possible
      let highlighted;
      if (diffGrammar) {
        highlighted = Prism.highlight(code, diffGrammar, diffLanguage);
      } else {
        highlighted = Prism.util.encode(code);
      }

      // get the HTML source of the prefix token
      const prefixToken = new Prism.Token('prefix', PREFIXES[env.type], [
        /\w+/.exec(env.type)[0],
      ]);
      const prefix = Prism.Token.stringify(prefixToken, env.language);

      // add prefix
      const lines = [];
      let m;
      HTML_LINE.lastIndex = 0;
      // biome-ignore lint/suspicious/noAssignInExpressions: TODO
      while ((m = HTML_LINE.exec(highlighted))) {
        lines.push(prefix + m[0]);
      }
      if (/(?:^|[\r\n]).$/.test(decoded)) {
        // because both "+a\n+" and "+a\n" will map to "a\n" after the line prefixes are removed
        lines.push(prefix);
      }
      env.content = lines.join('');

      if (diffGrammar) {
        env.classes.push(`language-${diffLanguage}`);
      }
    }
  });
};
