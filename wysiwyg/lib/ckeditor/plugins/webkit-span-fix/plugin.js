(function() {
  // register plugin
  CKEDITOR.plugins.add('webkit-span-fix', {
    // initialize plugin
    init: function(editor) {
      // CKEditorの paste 処理用に id="cke_pastebin" な要素を追加しておく
      var b = new CKEDITOR.dom.element('fake-body');
      b.setAttribute('id', 'cke_pastebin');
      b.appendTo(editor.element);

      var el = editor.element.$;  // 監視するDOM
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
          var elems = m.target.querySelectorAll('p span,p em,p strong,p u');
          [].forEach.call(elems, function(el) {
            var css = el.style.cssText;

            switch(el.tagName.toLowerCase()) {
              case 'span':
                // elのインラインスタイルにemでfont-sizeが指定されてる場合にspanを削除する
                // data-cke-bookmark を持つ要素はCKEditorの paste 処理用なので削除しない
                if (el.dataset.ckeBookmark === undefined && /font-size:\s?.*?em;/.test(css)) {
                  // font-size: *em; だけ指定してある場合にはspan削除
                  if (/^font-size:\s?.*?em;$/.test(css)) {
                    var node = document.createTextNode(el.textContent);
                    el.parentNode.replaceChild(node, el);
                  }
                  // ほかのスタイルも指定されてるならfont-sizeとline-heightのスタイルだけ削除
                  else {
                    el.style.fontSize = null;
                    el.style.lineHeihgt = null;
                  }
                }
                else if(el.textContent === '') {
                  el.parentNode.removeChild(el)
                }
                break;

              case 'em':
              case 'strong':
              case 'u':
                // elのインラインスタイルにemでfont-sizeが指定されてる場合にインラインのfont-sizeとline-heightを削除する
                if (/font-size:\s?.*?em;/.test(css)) {
                  el.style.fontSize = null
                  el.style.lineHeihgt = null;
                }
                break;
            }
          });
        });
      });
      var config = {
        attributes: true,
        childList: true,
        characterData: true
      };
      // 監視の開始
      observer.observe(el, config);
    }
  });
})();
