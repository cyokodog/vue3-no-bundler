import { defineComponent, onMounted, PropType, ref, watch } from '@vue/runtime-core';
import { LayoutParts, PostParts, TemplateItem } from '../interface';

export default defineComponent({
  props: {
    templateList: {
      type: Object as PropType<TemplateItem[]>,
      required: true,
    },
    layoutParts: {
      type: Object as PropType<LayoutParts>,
      required: true,
    },
  },
  setup(props, context) {
    const previewRef = ref<HTMLDivElement>();

    const makeDom = (html: string) => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');
      return dom.body.firstElementChild;
    };

    const makeDomFromTemplate = (templateId: number, partsData: object) => {
      const templateItem = props.templateList.find(item => {
        return item.id === templateId;
      });
      const template = templateItem ? templateItem.template : '';
      const templateObj = window.Handlebars.compile(template);
      const html = templateObj(partsData);
      return makeDom(html);
    };

    const prepareWysiwygEl = (targetEl: Element, postParts: PostParts) => {
      window.CKEDITOR.dtd.$editable.span = 1;
      window.CKEDITOR.dtd.$editable.a = 1;

      const els = targetEl.querySelectorAll('[data-html]');
      if (els) {
        els.forEach(el => {
          const name = el.getAttribute('data-html');
          if (postParts.partsData.html && name) {
            const html = postParts.partsData.html[name];
            const dom = makeDom(`<textarea>${html}</textarea>`);
            if (dom) {
              el.append(dom);

              const editor = window.CKEDITOR.inline(dom, {
                allowedContent: {
                  $1: {
                    elements: window.CKEDITOR.dtd,
                    attributes: true,
                    styles: true,
                    classes: true,
                  },
                },
              });

              const foo = (editor: any, name: string) => {
                editor.on('blur', () => {
                  // console.log('blur', editor.getData());
                  // html[name] = editor.getData();
                  const data = editor.getData();
                  context.emit('change-html-data', { name, html: data });
                });
              };
              foo(editor, name);

              // editor.on('blur', () => {
              //   console.log('blur', editor.getData());
              // });
            }
          }
        });
      }
    };

    const renderPostParts = (targetEl: HTMLDivElement, postParts: PostParts) => {
      const el = makeDomFromTemplate(postParts.templateId, postParts.partsData);
      if (!el) return;

      prepareWysiwygEl(el, postParts);

      // const els = el.querySelectorAll('[data-html]');
      // if (els) {
      //   els.forEach(el => {
      //     const name = el.getAttribute('data-html');
      //     if (postParts.partsData.html && name) {
      //       const html = postParts.partsData.html[name];
      //       const dom = makeDom(`<textarea>${html}</textarea>`);
      //       if (dom) {
      //         el.append(dom);
      //       }
      //     }
      //   });
      // }

      el.addEventListener('click', event => {
        context.emit('select-post-parts', { postParts });
        event.stopPropagation();
      });
      targetEl.append(el);
    };

    const renderLayoutParts = (targetEl: HTMLDivElement, layoutParts: LayoutParts) => {
      if (!previewRef.value) return;

      const el = makeDomFromTemplate(layoutParts.templateId, {});
      if (!el) return;
      el.addEventListener('click', event => {
        context.emit('select-layout-parts', { layoutParts });
        event.stopPropagation();
      });
      targetEl.append(el);

      if (layoutParts.layout.layoutType === 'standard') {
        layoutParts.layout.articleArea.forEach(childParts => {
          const area = targetEl.querySelector('[data-articleArea]') as HTMLDivElement;
          if (area) {
            renderPostParts(area, childParts);
          }
        });
      }
      // ...any layout

      // const elList = previewRef.value.querySelectorAll('[data-wysiwyg] > textarea');
      // if (elList && elList.length) {
      //   window.CKEDITOR.dtd.$editable.span = 1;
      //   window.CKEDITOR.dtd.$editable.a = 1;
      //   elList.forEach(el => {
      //     const editor = window.CKEDITOR.inline(el, {
      //       allowedContent: {
      //         $1: {
      //           elements: window.CKEDITOR.dtd,
      //           attributes: true,
      //           styles: true,
      //           classes: true,
      //         },
      //       },
      //     });

      //     editor.on('change', () => {
      //       console.log('change');
      //     });
      //     editor.on('blur', () => {
      //       console.log('blur');
      //     });
      //   });
      // }
    };

    onMounted(() => {
      if (!previewRef.value) return;
      renderLayoutParts(previewRef.value, props.layoutParts);
    });

    watch(
      () => props.layoutParts,
      () => {
        if (!previewRef.value) return;
        previewRef.value.innerHTML = '';
        renderLayoutParts(previewRef.value, props.layoutParts);
      },
      {
        deep: true,
      },
    );
    return {
      previewRef,
    };
  },
});
