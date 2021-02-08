<template>
  <v-app>
    <v-container fill-height fluid flex-start>
      <v-row align="center" justify="center">
        <v-col cols="6" align="center" justify="center">
          <v-row>
            <v-col>
              <v-card width="500px">
                <v-card-title>
                  <h1>Name Finder</h1>
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Name" outlined v-model="nameInput" />
                  </v-form>
                </v-card-text>
              </v-card>
              <v-card-actions class="justify-center">
                <v-btn color="success" @click="findName(nameInput)">Find</v-btn>
                <v-btn color="success" @click="addName(nameInput)">Add</v-btn>
                <v-btn color="blue" @click="saveToFile()">Save</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Name :names="names"></Name>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Name from "./components/Name.vue";
import { mapActions } from "vuex";

interface NameType {
  name : string
}

const nameArray : NameType[] = [];

export default Vue.extend({
  name: "App",

  components: {
    Name,
  },

  data: () => ({
    names: nameArray,
  }),

  methods: {
    ...mapActions(["getName"]),
    async findName(name: string) {
      const responseName = await this.getName(name);
      const result = responseName.data.name;
      if (typeof result != undefined && result) {
        const names = [{ name: result }];
        this.$data.names = names;
      } else {
        alert("No name found");
      }
    },
    ...mapActions(["insertName"]),
    async addName(name: string) {
      if (!name) {
        alert("Please input a name.");
        return;
      }
      const responseName = await this.insertName(name);
      const result = responseName.data.name;
      if (typeof result != undefined && result) {
        const nameObj = [{ name: responseName }];
        this.$data.names = nameObj;
      }
    },
    ...mapActions(["save"]),
    async saveToFile() {
      this.save(this.$data.names);
    },
  },
});
</script>
