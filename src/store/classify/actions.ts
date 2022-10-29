import { ActionContext, ActionTree } from "vuex"
import { TState } from "./state"
import { MutauionType, Mutations } from "./mutations"
import { IParentClassify } from '@/type/product/Classify'

const enum ActionType {
  SetClassify = "SetClassify"
}

type ActionAugments = Omit<ActionContext<TState, TState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}
type Actions = {
  [ActionType.SetClassify](context: ActionAugments, classify: Array<IParentClassify>): void
}

export const actions: ActionTree<TState, TState> & Actions = {
  [ActionType.SetClassify]({ commit }, classify) {
    commit(MutauionType.SetClassify, classify)
  }
}