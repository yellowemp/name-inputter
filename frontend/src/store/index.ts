import Vue from "vue";
import Vuex from "vuex";
import axios from "../plugins/axios";

Vue.use(Vuex);

interface NameType {
  name: string
}

export default new Vuex.Store({
  state: {
    name: ""
  },
  mutations: {
    MUTATE_NAME(state, name) {
      state.name = name;
    }
  },
  actions: {
    async getName({ commit }, name: string) {
      const res = await axios({
        url: `/search/${name}`,
        method: "GET"
      });
      return res;
    },
    async deleteName(context, name: string) {
      const res = await axios({
        url: `/delete/${name}`,
        method: "GET"
      })
      return res;
    },
    async insertName(context, name: string) {
      const res = await axios({
        url: `/add/${name}`,
        method: "GET"
      });
      return res;
    },
    async save(context, names: NameType[]) {
      const res = await axios({
        url: `/save`,
        method: "POST",
        data: names
      });
      return res;
    }
  },
  modules: {}
});
