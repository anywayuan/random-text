import { request } from "../../utils";
import { Ref, ref } from "vue";
import { useThrottleFn } from "@vueuse/core";

/**
 * @function useGetText 获取随机文本相关逻辑
 * @return {string} randomText 请求到到随机文本
 * @return {function} getText 获取文本的请求方法
 * */
interface useGetText {
  randomText: Ref<string>;
  getText: Function;
}

const useGetText = (): useGetText => {
  let randomText = ref<string>("");
  const ids = ref<number[]>([0]);

  const getText = async (): Promise<void> => {
    try {
      const params = {
        ids: ids.value,
      };

      const { data } = await request("/fuck", "", params);
      console.log(data);

      if (ids.value.length >= data.count + 1) {
        ids.value = [0];
      }

      ids.value.push(data.data.id);

      randomText.value = data.data.text;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    randomText,
    getText,
  };
};

/**
 * @function useClickToggle 点击切换相关逻辑
 * @return {boolean} randomText 动画切换
 * @return {function} handleClick 点击事件
 * */
interface useClickToggle {
  isToggle: Ref<boolean>;
  handleClick: Function;
}

const useClickToggle = (getText: Function): useClickToggle => {
  let isToggle = ref<boolean>(true);
  let timer = setTimeout(() => {
    isToggle.value = false;
  }, 1000);

  const debouncedFn = useThrottleFn(async () => {
    clearTimeout(timer);
    await getText();
    isToggle.value = true;
    timer = setTimeout(() => {
      isToggle.value = false;
    }, 1000);
  }, 1500);

  const handleClick = async () => {
    debouncedFn();
  };

  return {
    isToggle,
    handleClick,
  };
};

export { useGetText, useClickToggle };
