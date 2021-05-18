interface BasePartsData {
  html?: { [name: string]: string };
}

export interface AaaPartsData extends BasePartsData {
  partsType: 'aaa';
  name: string;
  age: number;
}
export interface BbbPartsData extends BasePartsData {
  partsType: 'bbb';
  title: string;
}

export type PostPartsData = AaaPartsData | BbbPartsData;

export interface PostParts {
  id: number;
  templateId: number;
  partsData: PostPartsData;
}

export interface StandardPartsLayout {
  layoutType: 'standard';
  headerArea: PostParts[];
  imageArea: PostParts[];
  articleArea: PostParts[];
}

export interface ColumPartsLayout {
  layoutType: 'colum';
  headerArea: PostParts[];
  imageAreas: [PostParts[], PostParts[], PostParts[]];
  articleAreas: [PostParts[], PostParts[], PostParts[]];
}

export interface LayoutParts {
  id: number;
  templateId: number;
  layout: StandardPartsLayout | ColumPartsLayout;
}

interface LayoutTemplateItem {
  id: number;
  templateType: 'layout';
  template: string;
}
interface PostTemplateItem {
  id: number;
  templateType: 'post';
  template: string;
  defaultPartsData: PostPartsData;
}

export type TemplateItem = LayoutTemplateItem | PostTemplateItem;
