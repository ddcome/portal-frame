<template>
  <jydt-layout>
    <template #header>
      <div class="tag-box">
        <dl v-for="(item, index) in queryList" :key="index">
          <dt class="left">{{item.yw + ':'}}</dt>
          <dd class="content">
            <span :class="{'active': item.all}" @click="queryAll(index)">全部</span>
            <span
              v-for="(subItem, i) in item.children"
              :key="i"
              @click="tagClick(subItem, index)"
              :class="{'active': subItem.checked}"
            >{{subItem.name}}</span>
          </dd>
        </dl>
      </div>
    </template>
    <template #tabs></template>
    <template #content>
      <div class="itemData">
        <div class="items" v-show="!showNone" v-for="(lf, index) in landInfo" :key="index">
          <div class="content-item-img">
            <a href="javascript:void(0);" @click="showLandInfo(lf)">
              <img :src="lf.imgUrl" />
            </a>
          </div>
          <!-- <div
            class="tip"
            dic-type="土地用途查看"
            binddata="lf.landPurpose"
            slice="-2"
            ng-if="lf.landPurpose"
          ></div>-->
          <div class="content-item-title">
            <span class="text-ellipsis">
              <a href="javascript:void(0);" @click="showLandInfo(lf)">{{lf.title}}</a>
            </span>
          </div>
          <div class="content-item-body">
            <ul>
              <li>
                面积：
                <span>{{lf.rentArea}}</span> 平方米
              </li>
              <li>
                租金：
                <span class="money">{{!lf.sumMoney ? '面议' : (lf.sumMoney | TDCZmoneyConvert)}}</span>
              </li>
              <li>
                出租年限：
                <span>{{lf.limitYear}}</span> 年
              </li>
              <li class="address" :title="lf.address">
                坐落：
                <span>{{lf.address}}</span>
              </li>
            </ul>
          </div>
          <div
            v-if="lf.tradeStatus === '1'"
            class="contant-right-item-result result-start"
            style="bottom: 60px;"
          >
            <span>正在交易</span>
          </div>
          <div
            v-if="lf.tradeStatus === '2'"
            class="contant-right-item-result result-out"
            style="bottom: 60px;"
          >
            <span>交易结束</span>
          </div>
        </div>
        <div class="items-none" v-if="showNone">
          <h3>暂无相关土地出租公告，敬请期待更多公告～</h3>
        </div>
      </div>
    </template>
  </jydt-layout>
</template>

<script>
export default {
  data() {
    return {
      queryList: [
        {
          yw: '行政区',
          children: []
        },
        {
          yw: '出让面积',
          children: [
            {
              name: '5000平方米以下',
              fieldname: { areaStart: 0, areaEnd: 5000 }
            },
            {
              name: '5000-10000平方米',
              fieldname: { areaStart: 5000, areaEnd: 10000 }
            },
            {
              name: '1-5万平方米',
              fieldname: { areaStart: 10000, areaEnd: 50000 }
            },
            {
              name: '5-10万平方米',
              fieldname: { areaStart: 50000, areaEnd: 100000 }
            },
            {
              name: '10-50万平方米',
              fieldname: { areaStart: 100000, areaEnd: 500000 }
            },
            {
              name: '50万平方米以上',
              fieldname: { areaStart: 500000, areaEnd: 500000000 }
            }
          ]
        },
        {
          yw: '土地用途',
          children: []
        },
        {
          yw: '交易状态',
          children: [
            { name: '正在交易', fieldname: { jyzt: '1' } },
            { name: '交易结束', fieldname: { jyzt: '2' } }
          ]
        }
      ],
      // 是否展示土地信息
      showNone: false,
      // 土地信息
      landInfo: [
        {
          title: '山西省 150平方米 宗教用地 出租',
          tradeStatus: '1',
          region: '140100',
          limitYear: '11',
          contactPerson: '甄房东',
          address: '山西省太原市清徐县清源镇致富路',
          rentArea: '150',
          mortgageArea: null,
          sumMoney: null,
          fileID: null,
          landPurpose: '094',
          demandType: null,
          ywh: 'Z202002240011',
          houseType: null,
          doorModel: null,
          estateUnitCode: null,
          programNum: 'XMBH202002240040',
          rentType: null
        },
        {
          title: '尖草坪区 10001平方米 茶园 出租',
          tradeStatus: '1',
          region: '140108',
          limitYear: '10',
          contactPerson: '拉倒',
          address: '北京市海淀区四季青镇杏石口路乙18号院嘉德乐公馆',
          rentArea: '10001',
          mortgageArea: null,
          sumMoney: '4613',
          fileID: null,
          landPurpose: '022',
          demandType: null,
          ywh: 'Z202002170008',
          houseType: null,
          doorModel: null,
          estateUnitCode: null,
          programNum: 'XMBH202002170011',
          rentType: null
        },
        {
          title: '山西省 11022平方米 军事设施用地 出租',
          tradeStatus: '2',
          region: '140100',
          limitYear: '2',
          contactPerson: '找那个',
          address: '北京市海淀区四季青镇闵航路8号闵航路16号院',
          rentArea: '11022',
          mortgageArea: null,
          sumMoney: '200000120',
          fileID: null,
          landPurpose: '091',
          demandType: null,
          ywh: 'Z202002170007',
          houseType: null,
          doorModel: null,
          estateUnitCode: null,
          programNum: 'XMBH202002170008',
          rentType: null
        },
        {
          title: '清徐县 601平方米  天然牧草地 出租',
          tradeStatus: '2',
          region: '140121',
          limitYear: '50',
          contactPerson: 'one',
          address: '湖北省武汉市洪山区梨园街道鹏程花园鹏程花园(徐东大街)',
          rentArea: '601',
          mortgageArea: null,
          sumMoney: null,
          fileID: '3762a6783a314fb78480b2adc572a53e',
          landPurpose: '041',
          demandType: null,
          ywh: 'Z201909170022',
          houseType: null,
          doorModel: null,
          estateUnitCode: null,
          programNum: 'XMBH201909170012',
          rentType: null
        },
        {
          title: '万柏林区 1545616平方米 水浇地 出租',
          tradeStatus: '2',
          region: '140109',
          limitYear: '1',
          contactPerson: '站施工队',
          address:
            '湖北省武汉市汉阳区洲头街街道汉阳区城市管理局委员会洲头城管所',
          rentArea: '1545616',
          mortgageArea: null,
          sumMoney: '615496418',
          fileID: '0e2a2c3d5b404d1ba2a7afbdb847fc64',
          landPurpose: '012',
          demandType: null,
          ywh: 'Z201909120002',
          houseType: null,
          doorModel: null,
          estateUnitCode: null,
          programNum: 'XMBH201909120005',
          rentType: null
        },
        {
          title: '尖草坪区 123平方米 其它草地 出租',
          tradeStatus: '1',
          region: '140108',
          limitYear: '123',
          contactPerson: '壮壮',
          address: '湖北省武汉市洪山区和平街道东方玉龙居',
          rentArea: '123',
          mortgageArea: null,
          sumMoney: '123',
          fileID: '1462d7c5d9994dc9b4c172a6d2877222',
          landPurpose: '043',
          demandType: null,
          ywh: 'Z201909110009',
          houseType: null,
          doorModel: null,
          estateUnitCode: 'XMBH201909110013',
          programNum: 'XMBH201909110013',
          rentType: null
        },
        {
          title: '阳曲县 5005平方米 茶园 出租',
          tradeStatus: '1',
          region: '140122',
          limitYear: '25',
          contactPerson: '李四',
          address: '湖北省武汉市东西湖区金银湖街道中共李家墩社区委员会银湖苑',
          rentArea: '5005',
          mortgageArea: null,
          sumMoney: '5632',
          fileID: 'eb7ae5c55da0473f92a95efdf1aada1c',
          landPurpose: '022',
          demandType: null,
          ywh: 'Z201909090014',
          houseType: null,
          doorModel: null,
          estateUnitCode: null,
          programNum: 'XMBH201909090020',
          rentType: null
        },
        {
          title: '尖草坪区 5000平方米 其他园地 出租',
          tradeStatus: '2',
          region: '140108',
          limitYear: '20',
          contactPerson: '张三900',
          address: '湖北省武汉市东西湖区金银湖街道金银湖街道办事处银湖九号',
          rentArea: '5000',
          mortgageArea: null,
          sumMoney: '9000000',
          fileID: '6c802abffee04dac9db80104aa9545a8',
          landPurpose: '023',
          demandType: null,
          ywh: 'Z201909030040',
          houseType: null,
          doorModel: null,
          estateUnitCode: null,
          programNum: 'XMBH201909030049',
          rentType: null
        }
      ]
    };
  },
  created() {
    this.queryList.forEach((item) => {
      item.all = true;
    });
    console.log('queryList', this.queryList);
  }
};
</script>

<style lang="less" scoped>
//标签页样式
.tag-box {
  border: 1px solid #f1f1f1;
  > dl {
    margin: 0;
    //height: 100%;
    display: flex;
    border-top: 1px solid #f1f1f1;

    .left {
      flex: 1.5;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      box-sizing: border-box;
      text-align: center;
      padding: 15px 0;
      border-right: 1px solid #f1f1f1;
    }

    .content {
      flex: 15;
      padding: 9px 0;
      //height: 50.8px;
      //line-height: 50.8px;

      span {
        display: inline-block;
        text-align: center;
        padding: 7px 16px;
        font-size: 13px;
        color: #666;
        cursor: pointer;
        margin-left: 15px;
      }

      span.active {
        border-radius: 50px;
        color: #fff;
        font-weight: bold;
        background-color: #a33636;
      }
    }

    .right {
      flex: 1;

      span {
        display: inline-block;
        position: relative;
        padding: 0.02rem 0.15rem 0.02rem 0.1rem;
        margin-top: 0.04rem;
        border: 1px solid #e6e6e6;
        color: #999;
        cursor: pointer;

        .icon-sort-down {
          position: absolute;
          top: 10%;
          right: 0;
          color: #b5b5b5;
        }

        .icon-sort-up {
          position: absolute;
          top: 25%;
          right: 0;
          color: #b5b5b5;
        }
      }
    }
  }

  dl:nth-of-type(1) {
    border: none;
  }

  .hide {
    height: 0.32rem;
    overflow: hidden;
  }
}

</style>
