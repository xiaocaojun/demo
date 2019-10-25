import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Orderdetails.less';

const { Description } = DescriptionList;


class Orderlist extends Component {

  render() {
    const url=this.props.match.url;
    var strs = new Array(); //定义一数组
    strs = url.split("/"); //字符分割

    const nullobj={
      idorder:"",//订单id
      taxiname:"",//司机昵称
      idtaxi:"",//司机id
      taxiSex:"",//司机性别
      taxiAddress:"",//司机家庭住址
      taxiAge:"",//司机年龄
      callNo2:"",//司机电话
      passengername:"",
      passengersex:"",
      passengerAddress:"",
      passengerAge:"",
      callNo1:"",
      leaveTime:"",
      overaddress:"",
      arriveTime:"",
      startaddress:"",
      price:"",
  };

  let order=[];
  try{
      var obj=this.props.location.state.data.list;
      for(var i in obj) {
          for(var j in obj[i]){
              if(strs[3]==obj[i].idorder)
              order=obj[i];
          }
      }
  }catch(err){
      order=nullobj;
  }

    return (
      <PageHeaderWrapper title="订单详情页">
        <Card bordered={false}>
           <DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
            <Description term="订单编号">{order.idorder}</Description>
            <Description term="司机姓名">{order.taxiname}</Description>
            <Description term="乘客姓名">{order.passengername}</Description>
            <Description term="出发时间">{order.leaveTime}</Description>
            <Description term="出发地点">{order.startaddress}</Description>
            <Description term="结束时间">{order.arriveTime}</Description>
            <Description term="结束地点">{order.overaddress}</Description>
            <Description term="价格">{order.price}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="司机信息" style={{ marginBottom: 32 }}>
            <Description term="司机ID">{order.idtaxi}</Description>
            <Description term="姓名">{order.taxiname}</Description>
            <Description term="性别">{order.taxiSex}</Description>
            <Description term="年龄">{order.taxiAge}</Description>
            <Description term="联系电话">{order.callNo2}</Description>
            <Description term="家庭住址">{order.taxiAddress}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="乘客信息" style={{ marginBottom: 32 }}>
            <Description term="姓名">{order.passengername}</Description>
            <Description term="性别">{order.passengersex}</Description>
            <Description term="年龄">{order.passengerAge}</Description>
            <Description term="联系电话">{order.callNo1}</Description>
            <Description term="家庭住址">{order.passengerAddress}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Orderlist;
