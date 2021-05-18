import { defineComponent, reactive, ref } from '@vue/runtime-core';
import { LayoutParts, PostParts, PostPartsData, TemplateItem } from './interface';

import Preview from './Preview/index.vue';
import SideMenu from './SideMenu/index.vue';

const layoutPartsListRaw: LayoutParts[] = [
  {
    id: 1,
    templateId: 81,
    layout: {
      layoutType: 'standard',
      headerArea: [],
      imageArea: [],
      articleArea: [
        {
          id: 11,
          templateId: 92,
          partsData: {
            partsType: 'bbb',
            title: 'hogeTitle',
          },
        },
        {
          id: 12,
          templateId: 91,
          partsData: {
            partsType: 'aaa',
            name: 'zzzzzzzzzzzzzzzzzz',
            age: 30,
            html: {
              foo: '<p>abc</p>',
              bar: '<p>xyz</p>',
            },
          },
        },
        {
          id: 13,
          templateId: 92,
          partsData: {
            partsType: 'bbb',
            title: 'aaaaaaaaaaaa',
          },
        },
      ],
    },
  },
  {
    id: 2,
    templateId: 81,
    layout: {
      layoutType: 'standard',
      headerArea: [],
      imageArea: [],
      articleArea: [
        {
          id: 31,
          templateId: 92,
          partsData: {
            partsType: 'bbb',
            title: 'hogeTitle',
          },
        },
      ],
    },
  },
];

const layoutPartsList = reactive(layoutPartsListRaw);

const templateList: TemplateItem[] = [
  {
    id: 81,
    templateType: 'layout',
    template: `
      <div style="border:solid 5px green">
        <div data-articleArea style="padding:10px"></div>
      </div>
    `,
  },
  {
    id: 91,
    templateType: 'post',
    defaultPartsData: {
      partsType: 'aaa',
      name: 'a',
      age: 9,
      html: {
        foo: '<p>x1</p>',
        bar: '<p>y1</p>',
      },
    },
    template: `
      <div style="border:solid 1px red">
        <h5>{{name}}</h5>
        <div>{{age}}</div>
        <div data-wysiwyg data-html="foo"></div>
        <hr/>
        <div data-wysiwyg data-html="bar"></div>
      </div>
    `,
  },
  {
    id: 92,
    templateType: 'post',
    defaultPartsData: {
      partsType: 'bbb',
      title: 'xxxx',
    },
    template: `
      <div style="border:solid 1px blue">
        <div>{{title}}</div>
      </div>
    `,
  },
];

export default defineComponent({
  components: {
    Preview,
    SideMenu,
  },
  setup() {
    const sideMenuVisible = ref(false);
    const layoutPartsSelected = ref(false);

    const selectedPartsData = ref<PostPartsData>({
      partsType: 'aaa',
      name: '',
      age: 0,
    });

    // const onSelectPartsData = (params: { partsData: PostPartsData }) => {
    //   sideMenuVisible.value = true;
    //   selectedPartsData.value = params.partsData;
    // };

    const onSelectPostParts = (params: { postParts: PostParts }) => {
      sideMenuVisible.value = true;
      layoutPartsSelected.value = false;
      selectedPartsData.value = params.postParts.partsData;
    };

    const onSelectLayoutParts = (_params: { layoutParts: LayoutParts }) => {
      layoutPartsSelected.value = true;
      sideMenuVisible.value = true;
    };

    const onChangePartsData = (params: { partsData: PostPartsData }) => {
      Object.assign(selectedPartsData.value, params.partsData);
    };

    const onChangeHtmlData = (params: { name: string; html: string }) => {
      const { name, html } = params;
      if (selectedPartsData.value.html) {
        selectedPartsData.value.html[name] = html;
      }
    };

    return {
      layoutPartsList,

      templateList,
      selectedPartsData,
      sideMenuVisible,
      layoutPartsSelected,

      onSelectPostParts,
      onSelectLayoutParts,
      onChangePartsData,
      onChangeHtmlData,
    };
  },
});
