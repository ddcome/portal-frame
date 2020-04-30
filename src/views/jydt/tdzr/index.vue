<template>
  <jydt-layout v-if="true">
    <template #header>首页 > 交易大厅 > 土地转让</template>
    <template #tabs>
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
    <template #content>
      <div class="itemData">
        <div class="items" v-show="!showNone" v-for="(lf, index) in landInfo" :key="index">
          <div class="content-item-img">
            <a @click="showLandInfo(lf)">
              <img :src="lf.imgUrl" />
            </a>
          </div>
          <!-- <div class="tip" dic-type="土地用途查看" binddata="lf.purpose" slice="-2" v-if="lf.xs"></div> -->
          <div class="content-item-title">
            <span class="text-ellipsis" @click="showLandInfo(lf)">
              <a >{{lf.title}}</a>
            </span>
          </div>
          <div class="content-item-body">
            <ul>
              <li class="text-ellipsis">
                公告名称：
                <span :title="lf.noticeName">{{lf.noticeName}}</span>
              </li>
              <li class="text-ellipsis">
                出让面积：
                <span :title="lf.area">{{lf.area}}</span> 平方米
              </li>
              <li class="text-ellipsis" v-show="lf.wayTrade !== '1'">
                起始价：
                <span :title="lf.startPrice" class="money">{{lf.startPrice }}</span>
              </li>
              <li class="text-ellipsis" v-show="lf.wayTrade !== '1'">
                保证金：
                <span :title="lf.deposit" class="money">{{lf.deposit }}</span>
              </li>
              <li class="text-ellipsis" v-show="lf.wayTrade !== '1'">
                保证金到账截止时间：
                <span :title="lf.depositEnd">{{lf.depositEnd}}</span>
              </li>
            </ul>
          </div>
          <div v-if="lf.tradeAction === '1'" class="contant-right-item-result result-success">
            <span>已成交</span>
          </div>
          <div
            v-if="lf.tradeAction === '2' || lf.tradeAction === '3'"
            class="contant-right-item-result result-out"
          >
            <span>已流拍</span>
          </div>
          <div v-if="lf.tradeAction === null" class="contant-right-item-result result-start">
            <span>正在交易</span>
          </div>
        </div>
        <div class="items-none" v-show="showNone">
          <h3>暂无相关土地转让公告，敬请期待更多公告～</h3>
        </div>
      </div>
    </template>
  </jydt-layout>
</template>

<script>
export default {
  data() {
    return {
      // 标签查询数组
      queryList: [
        {
          yw: '行政区',
          children: []
        },
        {
          yw: '转让底价',
          children: [
            {
              name: '100万以下',
              fieldname: { auctionStratPrice: 0, auctionEndPrice: 1000000 }
            },
            {
              name: '100-500万',
              fieldname: {
                auctionStratPrice: 1000000,
                auctionEndPrice: 5000000
              }
            },
            {
              name: '500-1000万',
              fieldname: {
                auctionStratPrice: 5000000,
                auctionEndPrice: 10000000
              }
            },
            {
              name: '1000-5000万',
              fieldname: {
                auctionStratPrice: 10000000,
                auctionEndPrice: 50000000
              }
            },
            {
              name: '5000-10000万',
              fieldname: {
                auctionStratPrice: 500000000000,
                auctionEndPrice: 100000000
              }
            },
            {
              name: '1-5亿',
              fieldname: {
                auctionStratPrice: 100000000,
                auctionEndPrice: 500000000
              }
            },
            {
              name: '5亿以上',
              fieldname: {
                auctionStratPrice: 500000000,
                auctionEndPrice: 500000000000
              }
            }
          ]
        },
        {
          yw: '出让面积',
          children: [
            {
              name: '5000平方米以下',
              fieldname: { areaBegin: 0, areaEnd: 5000 }
            },
            {
              name: '5000-10000平方米',
              fieldname: { areaBegin: 5000, areaEnd: 10000 }
            },
            {
              name: '1-5万平方米',
              fieldname: { areaBegin: 10000, areaEnd: 50000 }
            },
            {
              name: '5-10万平方米',
              fieldname: { areaBegin: 50000, areaEnd: 100000 }
            },
            {
              name: '10-50万平方米',
              fieldname: { areaBegin: 100000, areaEnd: 500000 }
            },
            {
              name: '50万平方米以上',
              fieldname: { areaBegin: 500000, areaEnd: 500000000 }
            }
          ]
        },
        {
          yw: '土地用途',
          children: []
        },
        {
          yw: '交易方式',
          children: [
            {
              name: '动态竞价（拍卖）',
              fieldname: { clickTagName1: '动态竞价（拍卖）' }
            },
            {
              name: '限时竞价（挂牌）',
              fieldname: { clickTagName1: '限时竞价（挂牌）' }
            }
          ]
        },
        {
          yw: '交易状态',
          children: [
            { name: '正在交易', fieldname: { clickTagName2: '正在交易' } },
            { name: '交易结束', fieldname: { clickTagName2: '交易结束' } }
          ]
        }
      ],
      // 是否展示土地信息
      showNone: false,
      // 土地信息
      landInfo: [
        {
          arrayPurpose: null,
          linkman: '甄时代',
          linkmanPhonenum: '13233456754',
          ywh: 'Z202003080001',
          landNum: 'XMBH202003080002',
          waySale: '2',
          timeSale: '10',
          projectNum: 'XMBH202003080002',
          deposit: 20000,
          depositStart: 1583663880000,
          depositEnd: 1583665200000,
          startPrice: 2000000,
          basePrice: 200,
          priceIncrease: 20000,
          listStart: null,
          listEnd: null,
          auctionStart: 1583665500000,
          auctionEnd: 1583665800000,
          buyer: 'JMH20200308001',
          buyerLoginName: 'zj',
          price: '2020000',
          noticeNum: '清徐县转[2020]0308067号',
          bdcqzh: 'XMBH202003080002',
          qxdm: '140121',
          regionname: '140121',
          landName: null,
          location: '山西省太原市清徐县清源镇醋乡街',
          area: 208,
          purpose: '085',
          plotRatio: null,
          buildingDensity: null,
          greeningRate: null,
          otherInfo: null,
          bz: null,
          tdxz: '102',
          qllx: '3',
          zdszd: null,
          zdszx: null,
          zdszb: null,
          zdszn: null,
          noticeName: '清源镇出让208平方米土地',
          startTime: 1583663880000,
          endTime: 1583668800000,
          publishTime: 1583663954000,
          state: '1',
          limit: null,
          entryStart: 1583663880000,
          entryEnd: 1583665200000,
          comments: null,
          evaluatiPrice: 200,
          wayAuction: null,
          wayTrade: '2',
          tradeAction: '1',
          startPriceBegin: null,
          startPriceEnd: null,
          areaBegin: null,
          areaEnd: null,
          startTimeRule: null,
          listStartRule: null,
          startPriceRule: null,
          limitRule: null,
          queryType: null,
          tradeStatus: null,
          imgUrl: '8ca773ed1e874a3c8c450f327bb2a1b7',
          dealTime: 1583665800000,
          auctionStratTime: null,
          auctionEndTime: null,
          auctionStratPrice: null,
          auctionEndPrice: null,
          longitude: '112.336045',
          latitude: '37.602313',
          realEstateUnitType: null,
          description: null,
          rightstartTime: 1583596800000,
          rightendTime: 1924012800000,
          title: '清徐县 208平方米 文体娱乐用地 转让',
          bdcdyh: 'XMBH202003080002',
          orderBy: null,
          ggdate: null
        },
        {
          arrayPurpose: null,
          linkman: '甄三七',
          linkmanPhonenum: '13633475437',
          ywh: 'Z202003050002',
          landNum: 'XMBH202003050002',
          waySale: '2',
          timeSale: '10',
          projectNum: 'XMBH202003050002',
          deposit: 5000,
          depositStart: 1583378220000,
          depositEnd: 1583379300000,
          startPrice: 3000000,
          basePrice: 3000000,
          priceIncrease: 50000,
          listStart: null,
          listEnd: null,
          auctionStart: 1583379600000,
          auctionEnd: 1583379900000,
          buyer: 'JMH20200305003',
          buyerLoginName: 'zj',
          price: '3300000',
          noticeNum: '清徐县转[2020]0305065号',
          bdcqzh: 'XMBH202003050002',
          qxdm: '140121',
          regionname: '140121',
          landName: null,
          location: '山西省太原市清徐县清源镇紫林路27号',
          area: 385,
          purpose: '052',
          plotRatio: null,
          buildingDensity: null,
          greeningRate: null,
          otherInfo: null,
          bz: null,
          tdxz: '102',
          qllx: '3',
          zdszd: null,
          zdszx: null,
          zdszb: null,
          zdszn: null,
          noticeName: '清源镇紫林路',
          startTime: 1583378220000,
          endTime: 1583379900000,
          publishTime: 1583378467000,
          state: '1',
          limit: null,
          entryStart: 1583378220000,
          entryEnd: 1583379000000,
          comments: null,
          evaluatiPrice: 3000000,
          wayAuction: null,
          wayTrade: '2',
          tradeAction: '1',
          startPriceBegin: null,
          startPriceEnd: null,
          areaBegin: null,
          areaEnd: null,
          startTimeRule: null,
          listStartRule: null,
          startPriceRule: null,
          limitRule: null,
          queryType: null,
          tradeStatus: null,
          imgUrl: '0c07ec2096034c57aa5acd7f6e07e86a',
          dealTime: 1583379883000,
          auctionStratTime: null,
          auctionEndTime: null,
          auctionStratPrice: null,
          auctionEndPrice: null,
          longitude: '112.355957',
          latitude: '37.618632',
          realEstateUnitType: null,
          description: null,
          rightstartTime: 1583337600000,
          rightendTime: 1924099200000,
          title: '清徐县 385平方米 住宿餐饮用地 转让',
          bdcdyh: 'XMBH202003050002',
          orderBy: null,
          ggdate: null
        },
        {
          arrayPurpose: null,
          linkman: '甄三五',
          linkmanPhonenum: '13633425254',
          ywh: 'Z202003050001',
          landNum: 'XMBH202003050001',
          waySale: '2',
          timeSale: '10',
          projectNum: 'XMBH202003050001',
          deposit: 50000,
          depositStart: 1583337600000,
          depositEnd: 1583337600000,
          startPrice: 30000000,
          basePrice: 2000000,
          priceIncrease: 50000,
          listStart: null,
          listEnd: null,
          auctionStart: 1583337600000,
          auctionEnd: 1583337600000,
          buyer: null,
          buyerLoginName: null,
          price: '30150000',
          noticeNum: '清徐县转[2020]0305064号',
          bdcqzh: 'XMBH202003050001',
          qxdm: '140121',
          regionname: '140121',
          landName: null,
          location: '山西省太原市清徐县清源镇西关大街',
          area: 373,
          purpose: '121',
          plotRatio: null,
          buildingDensity: null,
          greeningRate: null,
          otherInfo: null,
          bz: null,
          tdxz: '102',
          qllx: '3',
          zdszd: null,
          zdszx: null,
          zdszb: null,
          zdszn: null,
          noticeName: '西关大街出让土地',
          startTime: 1583371620000,
          endTime: 1583373000000,
          publishTime: 1583371737000,
          state: '1',
          limit: null,
          entryStart: 1583337600000,
          entryEnd: 1583337600000,
          comments: null,
          evaluatiPrice: 2000000,
          wayAuction: null,
          wayTrade: '2',
          tradeAction: '1',
          startPriceBegin: null,
          startPriceEnd: null,
          areaBegin: null,
          areaEnd: null,
          startTimeRule: null,
          listStartRule: null,
          startPriceRule: null,
          limitRule: null,
          queryType: null,
          tradeStatus: null,
          imgUrl: 'a1cf8073bf564fb0823ccba1270a68ff',
          dealTime: 1583337600000,
          auctionStratTime: null,
          auctionEndTime: null,
          auctionStratPrice: null,
          auctionEndPrice: null,
          longitude: '112.338791',
          latitude: '37.611017',
          realEstateUnitType: null,
          description: null,
          rightstartTime: 1583337600000,
          rightendTime: 1924012800000,
          title: '清徐县 373平方米 空闲地 转让',
          bdcdyh: 'XMBH202003050001',
          orderBy: null,
          ggdate: null
        },
        {
          arrayPurpose: null,
          linkman: '甄小米',
          linkmanPhonenum: '13622343237',
          ywh: 'Z202003040003',
          landNum: 'XMBH202003040003',
          waySale: '2',
          timeSale: '10',
          projectNum: 'XMBH202003040003',
          deposit: 2000,
          depositStart: 1583251200000,
          depositEnd: 1583251200000,
          startPrice: 200000,
          basePrice: 2000000,
          priceIncrease: 200000,
          listStart: null,
          listEnd: null,
          auctionStart: 1583251200000,
          auctionEnd: 1583251200000,
          buyer: null,
          buyerLoginName: null,
          price: null,
          noticeNum: '清徐县转[2020]0304063号',
          bdcqzh: 'XMBH202003040003',
          qxdm: '140121',
          regionname: '140121',
          landName: null,
          location: '山西省太原市清徐县清源镇039省道',
          area: 372,
          purpose: '121',
          plotRatio: null,
          buildingDensity: null,
          greeningRate: null,
          otherInfo: null,
          bz: null,
          tdxz: '102',
          qllx: '3',
          zdszd: null,
          zdszx: null,
          zdszb: null,
          zdszn: null,
          noticeName: '清源镇出让土地',
          startTime: 1583329800000,
          endTime: 1583331300000,
          publishTime: 1583329903000,
          state: '1',
          limit: null,
          entryStart: 1583251200000,
          entryEnd: 1583251200000,
          comments: null,
          evaluatiPrice: 2000000,
          wayAuction: null,
          wayTrade: '2',
          tradeAction: '2',
          startPriceBegin: null,
          startPriceEnd: null,
          areaBegin: null,
          areaEnd: null,
          startTimeRule: null,
          listStartRule: null,
          startPriceRule: null,
          limitRule: null,
          queryType: null,
          tradeStatus: null,
          imgUrl: '708ece929cf442cbaf9771727a97c43a',
          dealTime: 1583251200000,
          auctionStratTime: null,
          auctionEndTime: null,
          auctionStratPrice: null,
          auctionEndPrice: null,
          longitude: '112.364617',
          latitude: '37.635309',
          realEstateUnitType: null,
          description: null,
          rightstartTime: 1583251200000,
          rightendTime: 1924012800000,
          title: '清徐县 372平方米 空闲地 转让',
          bdcdyh: 'XMBH202003040003',
          orderBy: null,
          ggdate: null
        },
        {
          arrayPurpose: null,
          linkman: '甄小米',
          linkmanPhonenum: '13622343237',
          ywh: 'Z202003040003',
          landNum: 'XMBH202003040003',
          waySale: '2',
          timeSale: '10',
          projectNum: 'XMBH202003040003',
          deposit: 2000,
          depositStart: 1583329800000,
          depositEnd: 1583331000000,
          startPrice: 200000,
          basePrice: 2000000,
          priceIncrease: 200000,
          listStart: null,
          listEnd: null,
          auctionStart: 1583330700000,
          auctionEnd: 1583331600000,
          buyer: null,
          buyerLoginName: null,
          price: '600000',
          noticeNum: '清徐县转[2020]0304063号',
          bdcqzh: 'XMBH202003040003',
          qxdm: '140121',
          regionname: '140121',
          landName: null,
          location: '山西省太原市清徐县清源镇039省道',
          area: 372,
          purpose: '121',
          plotRatio: null,
          buildingDensity: null,
          greeningRate: null,
          otherInfo: null,
          bz: null,
          tdxz: '102',
          qllx: '3',
          zdszd: null,
          zdszx: null,
          zdszb: null,
          zdszn: null,
          noticeName: '清源镇出让土地',
          startTime: 1583329800000,
          endTime: 1583331300000,
          publishTime: 1583329903000,
          state: '1',
          limit: null,
          entryStart: 1583329800000,
          entryEnd: 1583331000000,
          comments: null,
          evaluatiPrice: 2000000,
          wayAuction: null,
          wayTrade: '2',
          tradeAction: '1',
          startPriceBegin: null,
          startPriceEnd: null,
          areaBegin: null,
          areaEnd: null,
          startTimeRule: null,
          listStartRule: null,
          startPriceRule: null,
          limitRule: null,
          queryType: null,
          tradeStatus: null,
          imgUrl: '708ece929cf442cbaf9771727a97c43a',
          dealTime: 1583330968000,
          auctionStratTime: null,
          auctionEndTime: null,
          auctionStratPrice: null,
          auctionEndPrice: null,
          longitude: '112.364617',
          latitude: '37.635309',
          realEstateUnitType: null,
          description: null,
          rightstartTime: 1583251200000,
          rightendTime: 1924012800000,
          title: '清徐县 372平方米 空闲地 转让',
          bdcdyh: 'XMBH202003040003',
          orderBy: null,
          ggdate: null
        },
        {
          arrayPurpose: null,
          linkman: '甄预审',
          linkmanPhonenum: '13633425671',
          ywh: 'Z202003040002',
          landNum: 'XMBH202003040002',
          waySale: '2',
          timeSale: '0',
          projectNum: 'XMBH202003040002',
          deposit: 2000,
          depositStart: 1583251200000,
          depositEnd: 1583251200000,
          startPrice: 5000000,
          basePrice: 2000000,
          priceIncrease: 20000,
          listStart: null,
          listEnd: null,
          auctionStart: 1583251200000,
          auctionEnd: 1583251200000,
          buyer: null,
          buyerLoginName: null,
          price: '2000000',
          noticeNum: '清徐县转[2020]0304062号',
          bdcqzh: 'XMBH202003040002',
          qxdm: '140121',
          regionname: '140121',
          landName: null,
          location: '山西省晋中市祁县贾令镇366县道',
          area: 371,
          purpose: '071',
          plotRatio: null,
          buildingDensity: null,
          greeningRate: null,
          otherInfo: null,
          bz: null,
          tdxz: '102',
          qllx: '3',
          zdszd: null,
          zdszx: null,
          zdszb: null,
          zdszn: null,
          noticeName: '0304出让土地',
          startTime: 1583307060000,
          endTime: 1583308500000,
          publishTime: 1583307127000,
          state: '1',
          limit: null,
          entryStart: 1583251200000,
          entryEnd: 1583251200000,
          comments: null,
          evaluatiPrice: 2000000,
          wayAuction: null,
          wayTrade: '2',
          tradeAction: '1',
          startPriceBegin: null,
          startPriceEnd: null,
          areaBegin: null,
          areaEnd: null,
          startTimeRule: null,
          listStartRule: null,
          startPriceRule: null,
          limitRule: null,
          queryType: null,
          tradeStatus: null,
          imgUrl: 'c5dec46799c748c1a23791d744abf4a7',
          dealTime: 1583251200000,
          auctionStratTime: null,
          auctionEndTime: null,
          auctionStratPrice: null,
          auctionEndPrice: null,
          longitude: '112.374016',
          latitude: '37.428901',
          realEstateUnitType: null,
          description: null,
          rightstartTime: 1583251200000,
          rightendTime: 1609344000000,
          title: '清徐县 371平方米 城镇住宅用地 转让',
          bdcdyh: 'XMBH202003040002',
          orderBy: null,
          ggdate: null
        },
        {
          arrayPurpose: null,
          linkman: '甄方法',
          linkmanPhonenum: '13644256728',
          ywh: 'Z202003040001',
          landNum: 'XMBH202003040001',
          waySale: '2',
          timeSale: '10',
          projectNum: 'XMBH202003040001',
          deposit: 20000,
          depositStart: 1583286660000,
          depositEnd: 1583287800000,
          startPrice: 200000,
          basePrice: 2000000,
          priceIncrease: 20000,
          listStart: null,
          listEnd: null,
          auctionStart: 1583288100000,
          auctionEnd: 1583288400000,
          buyer: null,
          buyerLoginName: null,
          price: '260000',
          noticeNum: '清徐县转[2020]0304061号',
          bdcqzh: 'XMBH202003040001',
          qxdm: '140121',
          regionname: '140121',
          landName: null,
          location: '山西省太原市清徐县清源镇永福街31号',
          area: 370,
          purpose: '061',
          plotRatio: null,
          buildingDensity: null,
          greeningRate: null,
          otherInfo: null,
          bz: null,
          tdxz: '102',
          qllx: '3',
          zdszd: null,
          zdszx: null,
          zdszb: null,
          zdszn: null,
          noticeName: '永福街出让土地',
          startTime: 1583286660000,
          endTime: 1583289000000,
          publishTime: 1583286875000,
          state: '1',
          limit: null,
          entryStart: 1583286660000,
          entryEnd: 1583287800000,
          comments: null,
          evaluatiPrice: 2000000,
          wayAuction: null,
          wayTrade: '2',
          tradeAction: '1',
          startPriceBegin: null,
          startPriceEnd: null,
          areaBegin: null,
          areaEnd: null,
          startTimeRule: null,
          listStartRule: null,
          startPriceRule: null,
          limitRule: null,
          queryType: null,
          tradeStatus: null,
          imgUrl: '22a57ff2491f403e88a1c419bfd015e4',
          dealTime: 1583288400000,
          auctionStratTime: null,
          auctionEndTime: null,
          auctionStratPrice: null,
          auctionEndPrice: null,
          longitude: '112.333504',
          latitude: '37.611887',
          realEstateUnitType: null,
          description: null,
          rightstartTime: 1583251200000,
          rightendTime: 1924876800000,
          title: '清徐县 370平方米 工业用地 转让',
          bdcdyh: 'XMBH202003040001',
          orderBy: null,
          ggdate: null
        },
        {
          arrayPurpose: null,
          linkman: '甄方法',
          linkmanPhonenum: '13644256728',
          ywh: 'Z202003040001',
          landNum: 'XMBH202003040001',
          waySale: '2',
          timeSale: '10',
          projectNum: 'XMBH202003040001',
          deposit: 20000,
          depositStart: 1583251200000,
          depositEnd: 1583251200000,
          startPrice: 200000,
          basePrice: 2000000,
          priceIncrease: 20000,
          listStart: null,
          listEnd: null,
          auctionStart: 1583251200000,
          auctionEnd: 1583251200000,
          buyer: null,
          buyerLoginName: null,
          price: null,
          noticeNum: '清徐县转[2020]0304061号',
          bdcqzh: 'XMBH202003040001',
          qxdm: '140121',
          regionname: '140121',
          landName: null,
          location: '山西省太原市清徐县清源镇永福街31号',
          area: 370,
          purpose: '061',
          plotRatio: null,
          buildingDensity: null,
          greeningRate: null,
          otherInfo: null,
          bz: null,
          tdxz: '102',
          qllx: '3',
          zdszd: null,
          zdszx: null,
          zdszb: null,
          zdszn: null,
          noticeName: '永福街出让土地',
          startTime: 1583286660000,
          endTime: 1583289000000,
          publishTime: 1583286875000,
          state: '1',
          limit: null,
          entryStart: 1583251200000,
          entryEnd: 1583251200000,
          comments: null,
          evaluatiPrice: 2000000,
          wayAuction: null,
          wayTrade: '2',
          tradeAction: '2',
          startPriceBegin: null,
          startPriceEnd: null,
          areaBegin: null,
          areaEnd: null,
          startTimeRule: null,
          listStartRule: null,
          startPriceRule: null,
          limitRule: null,
          queryType: null,
          tradeStatus: null,
          imgUrl: '22a57ff2491f403e88a1c419bfd015e4',
          dealTime: 1583251200000,
          auctionStratTime: null,
          auctionEndTime: null,
          auctionStratPrice: null,
          auctionEndPrice: null,
          longitude: '112.333504',
          latitude: '37.611887',
          realEstateUnitType: null,
          description: null,
          rightstartTime: 1583251200000,
          rightendTime: 1924876800000,
          title: '清徐县 370平方米 工业用地 转让',
          bdcdyh: 'XMBH202003040001',
          orderBy: null,
          ggdate: null
        }
      ]
    };
  },
  created() {
    //
    this.queryList.forEach((item) => {
      item.all = true;
    });
    console.log('queryList', this.queryList);
  },
  methods: {
    // 展示土地详情
    showLandInfo(lf) {
      console.log('lf', lf)
      this.$router.push({path:'/home/jydt/tdjy/tdzr/tdzrdetail'});
    }
  }
};
</script>

<style lang="less" scoped>
.test {
  height: 10%;
}
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
