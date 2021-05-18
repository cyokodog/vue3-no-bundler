/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	config.language = 'ja';

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'mode', groups: ['sourcedialog'] },
		{ name: 'imguploader', groups: ['imguploader'] },
		{ name: 'undo', groups: ['undo', 'selection'] },
		{ name: 'customlinks' },
		{ name: 'insert' },
		{ name: 'pictgram', groups: ['pictgram'] },
		'/',
		{ name: 'styles' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'colors' },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks' ] },
		{ name: 'align' }
	];

	config.removePlugins = [
    'magicline',
    'floatingspace',
    'pastefromword'
  ].join(',');

	config.extraPlugins = [
    'colordialog',
    'selectall',
//    'smiley',
    'pictgram',
    'justify',
    'panelbutton',
    'colorbutton',
    'customlink',
    'font',
    'custom_floatingspace',
    'sourcedialog',
		'imguploader',
    'indentblock',
    'webkit-span-fix'
  ].join(',');

  // indentOffsetでインデント量を変更できる
  config.indentOffset = 30;

	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	config.removeButtons = 'Styles,Format,Image,SpecialChar,JustifyBlock';

	config.allowedContent = {
		'div': {
			attributes: '*',
			styles: '*'
		},
		'p h1 h2 h3 h4 h5 h6': {
			styles: 'text-align, margin-left'
		},
		'a': {
			attributes: '*',
			styles: '*',
			classes: '*'
		},
		'img': {
			attributes: '*',
			styles: '*',
			classes: '*'
		},
		'span': {
			attributes: '*',
			styles: 'color, font-size, background-color',
			classes: '*'
		},
		'table thead tbody tr th td caption': {
			attributes: '*',
			styles: '*',
			classes: '*'
		},
		'li': {
			attributes: '*',
			styles: '*',
			classes: '*'
		},
		'strong em ul ol u hr blockquote': true
	};
};
