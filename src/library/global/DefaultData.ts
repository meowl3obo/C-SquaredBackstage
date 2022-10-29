import store from "@/store"
import { GetClassifies } from "@/apis/classify"

export const getClassifies = async () => {
  const classifiesRes = await GetClassifies()
  if (classifiesRes.status == 200) {
    const { data } = classifiesRes
    store.dispatch("Classify/SetClassify", data)
  }
}