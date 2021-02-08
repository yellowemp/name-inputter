<template>
  <v-card max-width="500" v-if="names.length != 0">
    <v-toolbar color="green" dark>
      <v-toolbar-title>Names</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-item v-for="(name, index) in names" :key="name">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="pl-2">{{ name.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="red" @click="removeName(name.name, index)"
              >mdi-minus</v-icon
            >
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Name",

  props: ["names"],

  data: () => ({}),

  methods: {
    ...mapActions(["deleteName"]),
    async removeName(name: string, index: number) {
      const responseName = await this.deleteName(name);
      const namex = [{ name: responseName }];
      this.$data.names = namex;
      this.$delete(this.names, index);
    },
  },
});
</script>