CKEDITOR.plugins.add( 'pictgram', {
  init: function( editor ) {

    function PictgramButton(editor, category){
        this.editor    = null;
        this.$list     = null;
        this.items     = null;
        this.category  = '';
        this.selected  = '';
        this.page      = 0;
        this.perPage   = 20;
        this.init(editor, category);
    };
    PictgramButton.prototype.init = function(editor, category){
        this.editor   = editor;
        this.category = category;
        this.addCommand();
        this.addButton();
        this.addDialog();
    };
    PictgramButton.prototype.getDialogName = function(){
        return 'pictgramDialog' + this.category;
    };
    PictgramButton.prototype.getCommandName = function(){
        return 'showPictgramDialog' + this.category;
    };
    PictgramButton.prototype.addCommand = function(){
        this.editor.addCommand( this.getDialogName(),new CKEDITOR.dialogCommand( this.getDialogName() ) );
    };
    PictgramButton.prototype.addButton = function(){
        this.editor.ui.addButton( 'Pictgram' + this.category, {
          title   : this.category + '素材を選択します',
          label   : this.category,
          command : this.getDialogName(),
          toolbar : 'pictgram'
        });
    };
    PictgramButton.prototype.addDialog = function(){
        CKEDITOR.dialog.add( this.getDialogName(), $.proxy(this.createDialogDefinition, this) );
    };
    PictgramButton.prototype.getPicts = function(){
        if (!this.items) {
            this.items = cms.materials.getMaterials(this.category);
        }
        return this.items;
    };
    PictgramButton.prototype.getListElement = function(){
        var dialog = CKEDITOR.dialog.getCurrent();
        var $list = $(dialog.getElement().$).find('.cms-pictgram-list').eq(0);
        return $list;
    };
    PictgramButton.prototype.addPictList = function(){
        var $list = this.$list;
        var picts = this.items;
        if (picts.models.length >= this.perPage * this.page) {
            for (var i = this.perPage * this.page, n = Math.min(this.perPage * (this.page + 1), picts.models.length); i < n; i++){
                var pict = picts.at(i);
                var $item = this.createPictListItem(pict);
                $list.append($item);
            }
            this.page++;
        }
        $list.off('scroll');
        $list.on('scroll', $.proxy(this.onScroll, this));
    };
    PictgramButton.prototype.createPictListItem = function(pict){
        var $item = $('<li><img src="' + pict.get('material_url') + '" alt="" /></li>');
        $item.attr('data-model', pict.cid);
        $item.on('click', $.proxy(this.onSelectItem, this));
        return $item;
    };
    PictgramButton.prototype.onSelectItem = function(e){
        e.preventDefault();
        this.$list.find('li').removeClass('cms-selected');
        $target = $(e.currentTarget);
        $target.addClass('cms-selected');
        this.selected = $target.attr('data-model') || '';
    };
    PictgramButton.prototype.createDialogDefinition = function( api ) {
        var dialogDefinition = {
            title: this.category,
            minWidth: 390,
            minHeight: 130,
            contents: [
                {
                    id: 'selector',
                    label: 'Label',
                    title: 'Title',
                    expand: true,
                    padding: 0,
                    elements: [
                        {
                            type: 'html',
                            id  : 'list',
                            html: '<ul class="cms-pictgram-list"></ul>'
                        }
                    ]
                }
            ],
            buttons: [ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ],
            onOk: $.proxy(this.onOk, this),
            onShow: $.proxy(this.onShow, this)
        };

        return dialogDefinition;
    };
    PictgramButton.prototype.onScroll = function(e) {
        var $list         = this.$list;
        var top           = $list.prop('scrollTop');
        var areaHeight    = $list.prop('offsetHeight');
        var contentHeight = $list.prop('scrollHeight');
        if (top + areaHeight >= contentHeight) {
            this.addPictList();
        }
    }
    PictgramButton.prototype.onShow = function(e) {
        this.selected = '';
        this.$list    = this.getListElement();
        this.items    = this.getPicts();
        this.page     = Math.ceil(this.$list.find('li').length / this.perPage);

        this.$list.find('li').removeClass('cms-selected');

        if (this.page == 0) {
            this.addPictList();
        }
    }
    PictgramButton.prototype.escapeHTML = function escapeHTML(str) {
      return (str || '').replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    PictgramButton.prototype.getHTML = function(pict) {
        return '<img class="mod-pictgram" src="' + this.escapeHTML(pict.get('material_url')) + '" data-published-pc-image-path="' + this.escapeHTML(pict.get('material_image_path')) + '" alt="" />'
    }
    PictgramButton.prototype.onOk = function() {
        var editor       = CKEDITOR.dialog.getCurrent().getParentEditor();
        var value        = this.selected;
        var picts        = this.items;
        if (!picts || !value) {
            return;
        }
        var pict = picts.get(value);
        if (pict) {
            editor.insertHtml(this.getHTML(pict));
        }
    };

    if (window.cms && cms.materials && typeof cms.materials.getCategories === 'function') {
      (function(categories){
        if (categories && categories.forEach) {
          categories.forEach(function(category, index){
            new PictgramButton(editor, category);
          });
        }
      })(cms.materials.getCategories());
    }

  }
});
