<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import type {FormInstance} from 'ant-design-vue';
import {request, message} from "../../utils";
import {useUserInfoStore} from '../../store'
import {PlusOutlined, LoadingOutlined} from '@ant-design/icons-vue';
import type {UploadChangeParam, UploadProps} from 'ant-design-vue';

const userInfoStore = useUserInfoStore()
const formRef = ref<FormInstance>();
const router = useRouter()

// 表单数据接口
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

// 页面数据接口
interface PageState {
  loading: boolean;
}

// 表单数据
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

// 页面数据
const pageState = reactive<PageState>({
  loading: false,
});

// 处理登录
const onFinish = async (values: FormState) => {
  pageState.loading = true;
  try {
    const {data} = await request('/users/login', 'post', values);
    userInfoStore.updateUserInfo(data)
    message('success', 'Login Success');
    await router.push('/home')
  } catch (e) {
    console.error(e)
  }
  pageState.loading = false;
};

// 重置表单
const resetForm = () => {
  formRef.value?.resetFields();
};

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');

const handleChange = (info: UploadChangeParam) => {

};

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message('error', 'You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message('error', 'Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const uploadFile = (file: { file: string | Blob; }) => {
  const formData = new FormData();
  formData.append('file', file.file);
  loading.value = true;
  request('/users/upload', 'post', formData, 'formData').then(res => {
    loading.value = false;
    console.log(res)
    // imageUrl.value = res.data.url;
  }).catch(e => {
    loading.value = false;
  })
}
</script>
<template>
  <div class="page-main">
    <div class="login-box">
      <a-form
          :model="formState"
          name="login"
          ref="formRef"
          autocomplete="off"
          @finish="onFinish"
      >
        <a-form-item
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" placeholder="username"/>
        </a-form-item>

        <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="password"/>
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
          <a-button type="primary" html-type="submit" :loading="pageState.loading">login</a-button>
          <a-button type="default" @click="resetForm">reset</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-upload
        v-model:file-list="fileList"
        name="file"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleChange"
        :custom-request="uploadFile"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar"/>
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>
<style lang="scss" scoped>
.page-main {
  width: 100%;
  min-height: 100vh;
  padding: 20px;

  .login-box {
    width: 500px;
  }
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
