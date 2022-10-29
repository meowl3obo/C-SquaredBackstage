import { GetterTree } from "vuex"
import { TState } from "./state"
import { IParentClassify } from '@/type/product/Classify'

type Getters = {
  GetClassify(state: TState): Array<IParentClassify>
}

export const getters: GetterTree<TState, TState> & Getters = {
  GetClassify(state) {
    return state.classify
  }
}