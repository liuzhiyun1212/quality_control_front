<template>
  <div>
    <el-card style="margin-left: 0.5%; width:100%;height: 1000px;">
        <div class="mainContainer" style="width: 50%;float: left;">
        <p style="text-align: center; color:blue; font-weight: 1000;font-size: 25px;">问题规律分析统计</p>
			<ul class="leftContent">
				<li class="labelContent" @click="hand(1)">
					<span class="label-title">质量问题发生时间</span>
					<span class="label-body">
                        <span class="problem">问题数:&nbsp;&nbsp;</span>
                        <span style="font-style: italic; font-size: 2vh;padding-right: 10px;">年度</span><span style="padding-right: 20px;">{{this.count1Year}}</span>
                        <span style="font-style: italic; font-size: 2vh;padding-right: 10px;">季度</span><span>{{this.count1Quarter}}</span>
                    </span>
				</li>
				<li class="labelContent" @click="hand(2)">
					<span class="label-title">质量问题涉及到的机型</span>
					<span class="label-body">
                    <span class="problem">问题数:</span>{{this.count2}}</span>
                </li>
				<li class="labelContent" @click="hand(3)">
					<span class="label-title">质量问题发生机型随时间变化情况</span>
					<span class="label-body">
                    <span class="problem">问题数:</span>{{this.count3}}</span>
                </li>
				<li class="labelContent" @click="hand(4)">
					<span class="label-title">涉及到的机型使用强度随时间变化</span>
					<span class="label-body">
                    <span class="problem">问题数:</span>{{this.count4}}</span>
                </li>
				<li class="labelContent" @click="hand(5)">
					<span class="label-title">质量问题高发故障模式</span>
					<span class="label-body">
                    <span class="problem">问题数:</span>{{this.count5}}</span>
                </li>
				<li class="labelContent" @click="hand(6)">
					<span class="label-title">质量问题故障模式随时间变化情况</span>
					<span class="label-body">
                    <span class="problem">问题数:</span>
                        <span style="font-style: italic; font-size: 18px;padding-right: 10px;">年度</span><span style="padding-right: 20px;">{{this.count6Year}}</span>
                        <span style="font-style: italic; font-size: 18px;padding-right: 10px;">季度</span><span>{{this.count6Quarter}}</span>
                    </span>
				</li>
				<li class="labelContent" @click="hand(7)">
					<span class="label-title">质量问题发生地理环境</span>
					 <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count7}}</span>
                </li>
                <li class="labelContent" @click="hand(8)">
					<span class="label-title">故障件种类</span>
					 <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count8}}</span>
				</li>
                <li class="labelContent" @click="hand(9)">
					<span class="label-title">故障件名称</span>
					 <span class="label-body">
                        
                    <span class="problem">问题数:</span>{{this.count9}}</span>
				</li>
                <li class="labelContent" @click="hand(10)">
					<span class="label-title">故障件名称随时间变化情况统计</span>
					<span class="label-body">
                    <span class="problem">问题数:</span>
                        <span style="font-style: italic; font-size: 18px;padding-right: 10px;">年度</span><span style="padding-right: 20px;">{{this.count10Year}}</span>
                        <span style="font-style: italic; font-size: 18px;padding-right: 10px;">季度</span><span>{{this.count10Quarter}}</span>
                    </span>
				</li>
                <li class="labelContent" @click="hand(11)">
					<span class="label-title">故障件安装位置</span>
					 <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count11}}</span>
				</li>
                <li class="labelContent" @click="hand(12)">
					<span class="label-title">故障件安装方法</span>
					 <span class="label-body">
                    <span class="problem">问题数:&nbsp;&nbsp;</span>
                     </span>
				</li>
			</ul>
		</div>
        <div class="change" style="width: 50%;float: left;">
            <p style="text-align: center; color:blue; font-weight: 1000;font-size: 25px;">原因推测分析</p>
			<ul class="rightContent">
                <li class="rightLabelContent"></li>
                <li class="rightLabelContent"></li>
                <li class="rightLabelContent"></li>
                <li class="rightLabelContent"></li>
            </ul>
        </div>
    </el-card>
    <!-- <ul>
        <li>质量问题发生时间:   季度<span>{{this.count1Quarter}}</span>年度<span>{{this.count1Year}}</span></li>
        <li>质量问题涉及到的机型:   <span>{{this.count2}}</span></li>
        <li>质量问题发生机型随时间变化情况:   <span>{{this.count3}}</span></li>
        <li>质量问题高发故障模式:   <span>{{this.count5}}</span></li>
        <li>质量问题故障模式随时间变化情况:   季度<span>{{this.count6Quarter}}</span>年度<span>{{this.count6Year}}</span></li>
        <li>质量问题发生地理环境:   <span>{{this.count7}}</span></li>
        <li>故障件种类:   <span>{{this.count8}}</span></li>
        <li>故障件名称:   <span>{{this.count9}}</span></li>
        <li>故障件名称随时间变化情况统计:   季度<span>{{this.count10Quarter}}</span>年度<span>{{this.count10Year}}</span></li>
        <li>故障件安装位置:   <span>{{this.count11}}</span></li>
    </ul> -->
  </div>
</template>

<script>
import {oneQuality,oneYear,selectPlaneType,faultStatistics,faultModelByYearSum,faultModelByQuarterSum,
    highSumByEnvironment,selectFaultyCount,selectAllType,nameAndModelByQuarter,nameAndModelByYear} from '@/api/system/dev';
import { getCheckList} from "@/api/chart/aircraftTypeWithTime";
import { getCheckList as useIntensity} from "@/api/chart/useIntensity";
import {pointCount} from "@/api/system/design.js"

export default {
    data () {
        return {
            count1Quarter:[],
            count1Year:[],
            count2:[],
            count3:[],
            count4:[],
            count5:[],
            count6Quarter:[],
            count6Year:[],
            count7:[],
            count8:[],
            count9:[],
            count10Quarter:[],
            count10Year:[],
            count11:[],
            count12:[],
        }
    },
    methods: {
        hand(x){
            switch(x){
                case 1:
                this.$router.push({ path: '/problemAnalysis', query: {type:'a'} })
                    break;
                case 2:
                this.$router.push({ path: '/problemAnalysis', query: {type:'b'} })
                    break;
                case 3:
                this.$router.push({ path: '/problemAnalysis', query: {type:'c'} })
                    break;
                case 4:
                this.$router.push({ path: '/problemAnalysis', query: {type:'d'} })
                    break;
                case 5:
                this.$router.push({ path: '/problemAnalysis', query: {type:'e'} })
                    break;
                case 6:
                this.$router.push({ path: '/problemAnalysis', query: {type:'f'} })
                    break;
                case 7:
                this.$router.push({ path: '/problemAnalysis', query: {type:'g'} })
                    break;
                case 8:
                this.$router.push({ path: '/problemAnalysis', query: {type:'h'} })
                    break;
                case 9:
                this.$router.push({ path: '/problemAnalysis', query: {type:'i'} })
                    break;
                case 10:
                this.$router.push({ path: '/problemAnalysis', query: {type:'j'} })
                    break;
                case 11:
                this.$router.push({ path: '/problemAnalysis', query: {type:'k'} })
                    break;
                case 12:
                this.$router.push({ path: '/problemAnalysis', query: {type:'l'} })
                    break;
                
            }
        },
        // 4.2.1.1
    oneQuality() {
      oneQuality(this.queryParams).then((response) => {
        this.count1Quarter = response.length;
      })
    },
    oneYear() {
        oneYear(this.queryParams).then((response) => {
        this.count1Year = response.length;
      })
    },
    // 4.2.1.2
    selectPlaneType() {
        selectPlaneType(this.queryParams).then((response) => {
        this.count2 = response.length;
      })
    },
    // 4.2.1.3
    getCheckList() {
        let queryParams = {checkedMethodName: 'allCheck'}
            getCheckList(queryParams).then(res => {
                this.count3 = res.rows.length;
                // console.log(res.rows.length);
            });
        },
    // 4.2.1.4
    useIntensity() {
        let queryParams = {checkedMethodName: 'allCheck'}
        useIntensity(queryParams).then(res => {
            this.count4 = res.rows.length;
                // console.log(res.rows.length);
            });
    },
    // 4.2.1.5
    faultStatistics() {
        faultStatistics(this.queryParams).then(response => {
            this.count5 = response.length;
                // console.log(this.count5);
            });
    },
    // 4.2.1.6
    faultModelByQuarterSum() {
        faultModelByQuarterSum(this.queryParams).then(response => {
            this.count6Quarter = response.length;
                // console.log(this.count6Quarter);
            });
    },
    faultModelByYearSum(){
        faultModelByYearSum(this.queryParams).then(response => {
            this.count6Year = response.length;
                // console.log(this.count6Year);
            });
    },
    // 4.2.1.7
    highSumByEnvironment(){
        highSumByEnvironment(this.queryParams).then(response => {
            this.count7 = response.length;
                // console.log(this.count7);
            });
    },
    // 4.2.1.8
    selectAllType(){
        selectAllType(this.queryParams).then(response => {
            this.count8 = response.length;
                // console.log("xxxxxxxxx",this.count8);
            });
    },
    // 4.2.1.9
    selectFaultyCount(){
        selectFaultyCount(this.queryParams).then(response => {
            this.count9 = response.length;
                // console.log(this.count9);
            });
    },
    // 4.2.1.10
    nameAndModelByQuarter(){
        nameAndModelByQuarter(this.queryParams).then(response => {
            this.count10Quarter = response.length;
                // console.log(this.count10);
            });
    },
    nameAndModelByYear(){
        nameAndModelByYear(this.queryParams).then(response => {
            this.count10Year = response.length;
                // console.log(this.count11);
            });
    },
    // 4.2.1.11
    pointCount(){
        pointCount(this.queryParams).then(response => {
            this.count11 = response.length;
                // console.log(this.count11);
            });
    },
    },
    
    created() {
        this.oneQuality();
        this.oneYear();
        this.selectPlaneType();
        this.getCheckList();
        this.useIntensity();
        this.faultStatistics();
        this.faultModelByQuarterSum();
        this.faultModelByYearSum();
        this.highSumByEnvironment();
        this.selectFaultyCount();
        this.nameAndModelByQuarter();
        this.nameAndModelByYear();
        this.pointCount();
        this.selectAllType();
    },
}
</script>

<style  scoped>
/* 综合css */

.leftContent li{
    display: block;
    float: left;
    color: #ffffff;
    width: 40%;
    height: 70px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    margin-left: 5px;
}

.rightContent li{
    display: inline-block;
    color: #ffffff;
    width: 40%;
    height: 70px;
    margin-bottom: 10px;
    border-radius: 10px;
    margin-right: 5px;
}
/* .rightContent .right{
    display: block;
    float:right;
    color: #ffffff;
    width: 25%;
    height: 70px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 5px;
    padding-top: 5px;
    margin-left: 600px;
} */
.rightContent li{
    background-color: #0082bd;
}
.problem::after{
    content: "　 ";
}
/* li{
    float:left;width:190px;padding:5px;
    display: block;
    width: 150px;
    float: left;
    height: 70px;
    margin-bottom: 10px;
    border-radius: 10px;
    color: white;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
} */
.leftContent li:first-child{
    background-color: #0082bd;
    /* display: inline-block; */
}
.leftContent li:nth-child(2){
    background-color: #3bb54b;
}

.leftContent li:nth-child(3){
    background-color: #19599d;
}
.leftContent li:nth-child(4){
    background-color: #cb5454;
}
.leftContent li:nth-child(5){
    background-color: #0082bd;
}
.leftContent li:nth-child(6){
    background-color: #3bb54b;
}
.leftContent li:nth-child(7){
    background-color: #19599d;
}
.leftContent li:nth-child(8){
    background-color: #cb5454;
}
.leftContent li:nth-child(9){
    background-color: #19599d;
}
.leftContent li:nth-child(10){
    background-color: #ff7f27;
}
.leftContent li:nth-child(11){
    background-color: #3bb54b;
}
.leftContent li:nth-child(12){
    background-color: #19599d;
}
.leftContent .labelContent .label-body {
    display: block;
    cursor: pointer;
    /* text-align: center; */
    margin-top: 1px;
    /* font-size: 15px; */
}
/* .leftContent .labelContent .label-title {
    font-family: 微软雅黑;
    font-size: 18px;
    opacity: 2;
    display: inline-block;
    padding-left: 14px;
}
.leftContent .labelContent .label-body {
    opacity: 0.7;
    padding-left: 14px;
    font-family: DIN Alternate Bold, Arial;
    font-size: 25px;
    display: block;
    cursor: pointer;
    margin-top: 1px;
}
.leftContent {
    position: relative;
    background-repeat: no-repeat;
    background-position: 0 0;
    left: 17px;
    width: 300px;
    height: 250px;
    padding: 14px 0px 0px 16px;
} */
</style>