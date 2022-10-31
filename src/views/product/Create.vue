<template>
  <div>
    <div>
      <label for="productID">產品名稱</label>
      <input id="productID" type="text" v-model="productData.Name" />
    </div>
    <div>
      <label for="intro">產品簡介</label>
      <input id="intro" type="text" v-model="productData.Intro" />
    </div>
    <div>
      <label for="illustrate">詳細介紹</label>
      <input id="illustrate" type="text" v-model="productData.Illustrate" />
    </div>
    <div>
      <label for="parentClassify">主分類</label>
      <select id="parentClassify" v-model="productData.ParentClassify">
        <option v-for="item in classifies" :key="item.Id" :value="item.Id">
          {{ item.Name }}
        </option>
      </select>
    </div>
    <template v-if="childClassifies && childClassifies.length > 0">
      <div>
        <label for="childClassify">子分類</label>
        <select id="childClassify" v-model="productData.ChildClassify">
          <option v-for="item in childClassifies" :key="item.Id" :value="item.Id">
            {{ item.Name }}
          </option>
        </select>
      </div>
    </template>
    <div>
      <label for="price">價格</label>
      <input id="price" type="number" v-model="productData.Price" />
    </div>
    <div>
      <label for="mainImg">主圖片</label>
      <input id="mainImg" type="file" accept="image/*" @change="uploadMain">
    </div>
    <div>
      <label for="otherImg">其他圖片</label>
      <input id="otherImg" type="file" accept="image/*" @change="uploadOther" multiple>
    </div>
    <div>
      <label for="color">顏色</label>
      <input id="color" type="text" v-model="productData.Color">
    </div>
    <div>
      <label for="size">尺寸</label>
      <input id="size" type="number" v-model="productData.Size">
      <label for="unit">尺寸單位</label>
      <input id="unit" type="text" v-model="productData.Unit">
    </div>
    <div>
      <label for="inventory">庫存</label>
      <input id="inventory" type="number" v-model="productData.Inventory">
    </div>
    <div>
      <button @click="submit">Submit</button>
    </div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useStore } from "vuex"
import { createProduct } from "@/apis/product"
import { IProduct } from "@/type/product/Product";
import { IParentClassify } from "@/type/product/Classify";

export default defineComponent({
  setup() {
    const store = useStore()
    const classifies = computed(() => store.getters["Classify/GetClassify"] as Array<IParentClassify>)
    const mainImgFile = ref<File | null>(null);
    const otherImgFile = ref<Array<File>>([]);
    const productData = reactive<IProduct>({
      Name: "",
      Intro: "",
      Illustrate: "",
      ParentClassify: 1,
      ChildClassify: 1,
      Price: 0,
      Color: "",
      Size: 0,
      Unit: "",
      Inventory: 0,
    });
    const childClassifies = computed(() => {
      return classifies.value.find((x) => x.Id == productData.ParentClassify)?.Child
    })

    const getFormData = () => {
      const formData = new FormData()
      if (!mainImgFile.value) return formData
      formData.append("mainImg", mainImgFile.value)
      formData.append("name", productData.Name)
      formData.append("intro", productData.Intro)
      formData.append("illustrate", productData.Illustrate)
      formData.append("parentClassify", productData.ParentClassify.toString())
      formData.append("childClassify", productData.ChildClassify.toString())
      formData.append("price", productData.Price.toString())
      formData.append("color", productData.Color)
      formData.append("size", productData.Size.toString())
      formData.append("unit", productData.Unit)
      formData.append("inventory", productData.Inventory.toString())
      otherImgFile.value.forEach((item) => {
        formData.append("otherImg", item)
      })

      return formData
    }

    const uploadMain = (imgInput: Event) => {
      const target = imgInput.target as HTMLInputElement
      const { files } = target
      console.log(files)
      if (files) {
        const file = files[0]
        mainImgFile.value = file
      }
    }

    const uploadOther = (imgInput: Event) => {
      otherImgFile.value = []
      const target = imgInput.target as HTMLInputElement
      const { files } = target
      if (files) {
        for (let index = 0; index < files.length; index++) {
          otherImgFile.value.push(files[index])
        }
      }
    }

    const submit = async () => {
      const formData = getFormData()
      const response = await createProduct(formData)
      console.log(response)
    }

    watch(
      () => { return productData.ParentClassify },
      () => { productData.ChildClassify = 1 }
    )

    return { classifies, childClassifies, productData, uploadMain, uploadOther, submit };
  },
});
</script>
