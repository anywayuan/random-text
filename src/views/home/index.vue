<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  setup() {
    const imgList = ref<string[]>(["1", "2", "3"]);
    // dom集合
    const divs = ref<HTMLDivElement[]>([]);
    let delay = ref<number>(650);
    let isShow = ref<boolean>(false);

    const showMask = () => {
      isShow.value = true;
    };
    const hideBox = () => {
      isShow.value = false;
    };
    onMounted(() => {
      divs.value.forEach((div, i) => {
        if (i < 15) {
          setInterval(() => {
            div.classList.add("ani");
          }, delay.value);
          delay.value += 200;
        } else {
          setInterval(() => {
            div.classList.add("ani");
          }, delay.value);
        }
      });
    });

    return {
      imgList,
      divs,
      isShow,
      showMask,
      hideBox,
    };
  },
});
</script>

<template>
  <div class="page-main">
    <div class="page-content">
      <div
        v-for="(item, i) in 20"
        :key="item"
        :ref="
          (el) => {
            if (el) divs[i] = el;
          }
        "
        class="thumb"
        :style="{ filter: isShow ? 'blur(5px)' : 'none' }"
        @click="showMask"
      >
        <img class="photo" src="../../assets/todaybing.jpg" alt="" />
        <div class="photo_title">标题</div>
      </div>
    </div>
    <div class="mask" v-show="isShow">
      <p @click.stop="hideBox">MASK</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-main {
  min-height: 100vh;
  background: #292c2f;

  .page-content {
    display: flex;
    flex-wrap: wrap;
    padding-right: 0px;

    .thumb {
      cursor: pointer;
      opacity: 0;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      transition: all 0.5s;
      position: relative;

      &:hover {
        transform: scale(0.98);
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      }

      &.ani {
        animation-name: fadeInAnimation;
      }

      .photo {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .photo_title {
        pointer-events: none;
        bottom: 1.875em;
        left: 2.1875em;
        margin: 0;
        position: absolute;
        z-index: 1;
        color: rgba(255, 255, 255, 0.8);
        font-weight: lighter;
      }
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      width: 100px;
      height: 100px;
      background: red;
    }
  }
}

@media screen and (max-width: 420px) {
  .page-main {
    .page-content {
      .thumb {
        min-height: 18em;
        width: 100%;
      }

      .photo_title {
        font-size: 0.8em;
      }
    }
  }
}

@media screen and (min-width: 420px) and(max-width: 960px) {
  .page-main {
    .page-content {
      .thumb {
        height: calc(28.57143vh - 1.33333em);
        min-height: 22em;
        width: 50%;
      }

      .photo_title {
        font-size: 1em;
      }
    }
  }
}

@media screen and (min-width: 960px) and (max-width: 1680px) {
  .page-main {
    .page-content {
      .thumb {
        height: calc(40vh - 2em);
        min-height: 20em;
        width: 33.33333333%;
      }

      .photo_title {
        font-size: 1.3em;
      }
    }
  }
}

@media screen and (min-width: 1680px) {
  .page-main {
    .page-content {
      .thumb {
        height: calc(40vh - 2em);
        min-height: 20em;
        width: 25%;
      }

      .photo_title {
        font-size: 1.3em;
      }
    }
  }
}

@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>