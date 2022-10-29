import { MutationTree } from "vuex"
import { TState } from "./state"
import { IParentClassify } from '@/type/product/Classify'

export const enum MutauionType {
  SetClassify = "SetClassify"
}

export type Mutations = {
  [MutauionType.SetClassify](state: TState, classify: Array<IParentClassify>): void
}

export const mutations: MutationTree<TState> & Mutations = {
  [MutauionType.SetClassify](state, classify) {
    state.classify = classify
  }
}