<template>
  <div>
    <h2>sidemenu</h2>

    <h3>部品設定</h3>

    <p>...</p>

    <template v-if="!layoutPartsOnly">
      <h3>要素設定</h3>

      <AaaPartsSettings
        v-if="aaaPartsSettingsVisible"
        :partsData="partsData"
        @changePartsData="onChangePartsData"
      />
      <BbbPartsSettings
        v-if="bbbPartsSettingsVisible"
        :partsData="partsData"
        @changePartsData="onChangePartsData"
      />
    </template>

  </div>
</template>

<script lang="ts" src="./index.ts"/>
