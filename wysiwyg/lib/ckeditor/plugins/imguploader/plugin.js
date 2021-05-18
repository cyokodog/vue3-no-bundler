CKEDITOR.plugins.add( 'imguploader', {
  init: function( editor ) {
    // attachedImageの作成後に実行される
    // attachedImageの情報からimgタグを作ってCKEditorに文字列として挿入する
    var callback = function(data) {
      var attachedImage = data.attachedImage;
      var publishedPcImagePath = attachedImage.get('published_pc_image_path');
      var previewPcImagePath = attachedImage.get('preview_pc_image_path');
      var $img = $('<img>');
      $img
        .attr('data-published-pc-image-path', publishedPcImagePath)
        .attr('src', previewPcImagePath);
      editor.insertHtml($img[0].outerHTML);
    };

    // created by CoffeeScript
    // editorElement = editor.element?.$ ? CKEDITOR.currentInstance?.element?.$
    // テキストの幅を越えないように
    var editorElement, ref, ref1, ref2, ref3;
    editorElement = (ref = (ref1 = editor.element) != null ? ref1.$ : void 0) != null ? ref : (ref2 = CKEDITOR.currentInstance) != null ? (ref3 = ref2.element) != null ? ref3.$ : void 0 : void 0;
    var limitWidth = $(editorElement).width() || '';

    editor.addCommand('imguploader', {
      exec: function() {
        this.dialog = new WMS.View.ImageConfigDialog({open : true, limitWidth: limitWidth, callback: callback});
      }
    });
    
    editor.ui.addButton('imguploader', {
      title: '画像を挿入します',
      label: '画像挿入',
      command: 'imguploader',
      toolbar: 'imguploader'    
    });
    

  }
});
