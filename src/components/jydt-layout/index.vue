<template>
  <!-- 交易大厅layout -->
  <div class="jydt-layout flex-1">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="tabs">
      <slot name="tabs"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.jydt-layout {
  height: 100%;
  position: relative;
  width: 1200px;
  // padding: 15px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(14, 5, 10, 0.14);
  // overflow: hidden;
  .content {
    width: 100%;
    position: relative;
    // overflow-x: hidden;
    // overflow-y: auto;
    height: calc(100% - 51px);
    //
    .mixin-animation(@shadowSize) {
      //box-shadow: none;
      transition: all 0.5s;
      border: 2px solid #fff;
      box-shadow: 0 10px 10px 0 rgba(213, 213, 213, 0.5);
      &:hover {
        //transform: translateZ(@shadowSize);
        //box-shadow:0 @shadowSize @shadowSize 0 rgba(213,213,213,0.5);
        border: 2px solid #a33636;
      }
    }
    .itemData {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0.1rem 0;
      perspective: 800px;

      .items {
        .mixin-animation(10px);
        width: 282px;
        height: 340px;
        position: relative;
        background: rgba(255, 255, 255, 1);
        //box-shadow:1px 1px 5px #ccc;
        margin-left: 24px;
        margin-bottom: 20px;

        &:nth-child(1),
        &:nth-child(5) {
          margin-left: 0;
        }

        .content-item-img {
          height: 160px;
          //padding-right: 30px;
          text-align: center;

          img {
            height: 100%;
            width: 100%;
          }
        }

        .content-item-title {
          overflow: hidden;
          text-align: center;
          height: 30px;
          flex: none;
          background: rgba(233, 233, 233, 1);

          span {
            display: block;
            text-align: center;
            line-height: 30px;
            font-size: 13px;

            a {
              color: black;
            }
          }
        }

        .content-item-body {
          margin-top: 10px;

          ul {
            li {
              cursor: default;
              color: #999999;
              font-size: 13px;
              margin: 5px 0;

              span {
                color: #333333;
              }

              span.money {
                color: #a33636;
                font-size: 16px;
                font-weight: bold;
              }
            }

            li.address {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-right: 5px;
            }
          }
        }

        .contant-right-item-result {
          position: absolute;
          right: 0;
          bottom: 45px;
          padding: 5px 20px;
          color: #fff;
          border-radius: 50px 0 0 50px;

          &.result-out {
            background: #b9b9b9;
          }

          &.result-success {
            background: #18aa6b;
          }

          &.result-start {
            background: #a33636;
          }
        }

        .tip {
          position: absolute;
          top: 0;
          right: 0;
          height: 23px;
          text-align: center;
          font-size: 13px;
          padding: 0 5px;
          font-weight: bold;
          color: #fff;
          background: #f0b128;
        }
      }
    }
  }
}
</style>