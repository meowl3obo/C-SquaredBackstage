import { Module } from "vuex"
import { state, TState } from './state';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

const ClassifyModule: Module<TState, TState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default ClassifyModule