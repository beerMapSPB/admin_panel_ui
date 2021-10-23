<template>
  <table class="border border-collapse text-sm">
    <tr>
      <!-- Header cells -->
      <th v-for="col in cols"
          :key="col.param"
          class="border text-left pl-4 py-2 bg-gray-100"
      >
        {{ col.label.text }}
      </th>
      <!-- Actions column header cell -->
      <th v-if="actions && actions.length"
          class="border py-2 bg-gray-100 text-center"
      >
        Actions
      </th>
    </tr>
    <tr v-for="row in data"
        :key="row.id"
    >
      <td v-for="col of cols"
          :key="col.param"
          class="border pl-4 py-2 truncate"
      >
        <template v-if="col.type === 'link-outer'">
          <span class="link-wrap">
            <a href="">{{ row[col.param] }}</a>
          </span>
        </template>
        <template v-else-if="col.type === 'link-inner'">
          <RouterLink :to="{name: col.routeName, params: {[col.param]: row[col.param]}}">
            {{ row[col.param] }}
          </RouterLink>
        </template>
        <template v-else>
          {{ row[col.param] }}
        </template>
      </td>

      <td v-if="actions && actions.length">
        <PopoverMenu :options="actions"
                     :data="row"
                     class="flex justify-center"
        >
          <Icon name="more-horizontal"
                class="text-gray-500"
                :size="20"
          />
        </PopoverMenu>
      </td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
import Icon from '/~/components/icon/Icon.vue'
import PopoverMenu from '/~/components/popover-menu/PopoverMenu.vue'
import { Option } from '/~/components/popover-menu/types/Option'
import { Column } from './types/Column'

const props = defineProps<{
  cols: Column[],
  data: any[],
  actions?: Option[]
}>()

</script>
