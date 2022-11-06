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
      <ckeditor :editor="ClassicEditor" v-model="productData.Illustrate" :config="{}" />
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
      <label for="nowAmount">現貨庫存</label>
      <input id="nowAmount" type="number" v-model="productData.NowAmount">
    </div>
    <div>
      <label for="preOrderAmount">預購上限</label>
      <input id="preOrderAmount" type="number" v-model="productData.PreOrderAmount">
    </div>
    <div>
      <label for="new">新品</label>
      <input id="new" type="checkbox" v-model="isNew" value="1">
    </div>
    <div>
      <label for="sale">特價</label>
      <input id="sale" type="checkbox" v-model="isSale" value="1">
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default defineComponent({
  setup() {
    const store = useStore()
    const classifies = computed(() => store.getters["Classify/GetClassify"] as Array<IParentClassify>)
    const mainImgFile = ref<File | null>(null);
    const otherImgFile = ref<Array<File>>([]);
    const isNew = ref<Array<number>>([])
    const isSale = ref<Array<number>>([])
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
      PreOrderAmount: 0,
      NowAmount: 0,
      IsNew: false,
      IsSale: false,
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
      formData.append("preOrderAmount", productData.PreOrderAmount.toString())
      formData.append("nowAmount", productData.NowAmount.toString())
      formData.append("isNew", productData.IsNew.toString())
      formData.append("isSale", productData.IsSale.toString())
      otherImgFile.value.forEach((item) => {
        formData.append("otherImg", item)
      })

      return formData
    }

    const uploadMain = (imgInput: Event) => {
      const target = imgInput.target as HTMLInputElement
      const { files } = target
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
      if (response.status == 200) {
        const { data } = response;
        console.log(data)
        if (data.ResultCode == 200) clearAll()
      } else {
        console.log(response.status, response.statusText)
      }
    }

    const clearAll = () => {
      productData.Name = ""
      productData.Intro = ""
      productData.Illustrate = ""
      productData.ParentClassify = 1
      productData.ChildClassify = 1
      productData.Price = 0
      productData.Color = ""
      productData.Size = 0
      productData.Unit = ""
      productData.PreOrderAmount = 0
      productData.NowAmount = 0
      productData.IsNew = false
      productData.IsSale = false
      mainImgFile.value = null
      otherImgFile.value = []
      isNew.value = []
      isSale.value = []
    }

    watch(
      () => { return productData.ParentClassify },
      () => { productData.ChildClassify = 1 }
    )

    watch(
      () => { return isNew.value },
      () => { 
        if (isNew.value.length > 0) productData.IsNew = true
        else productData.IsNew = false
      }
    )

    watch(
      () => { return isSale.value },
      () => { 
        if (isSale.value.length > 0) productData.IsSale = true
        else productData.IsSale = false
      }
    )

    


    return { ClassicEditor, classifies, childClassifies, productData, isNew, isSale, uploadMain, uploadOther, submit };
  },
});
</script>

