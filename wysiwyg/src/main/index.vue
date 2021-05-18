<template>
  <div>
    <div v-for="layoutParts in layoutPartsList" :key="layoutParts.id">
      <Preview
        :layoutParts="layoutParts"
        :templateList="templateList"
        @select-post-parts="onSelectPostParts"
        @select-layout-parts="onSelectLayoutParts"
        @change-html-data="onChangeHtmlData"
      />
    </div>
    <SideMenu
      v-if="sideMenuVisible"
      :layoutPartsOnly="layoutPartsSelected"
      :partsData="selectedPartsData"
      @changePartsData="onChangePartsData"
    />

<hr/>
selectedPartsData: {{selectedPartsData}}<br/>
layoutPartsList: {{layoutPartsList}}
  </div>
</template>

<script lang="ts" src="./index.ts"/>
