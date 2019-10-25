import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './userdetails.less';

const { Description } = DescriptionList;
  class Userdetails extends Component {

    render() {

    const url=this.props.match.url;
    var strs = new Array(); //定义一数组
    strs = url.split("/"); //字符分割

    const nullobj={
        name:'',
        avatar:'',
        desc:'',
        progress:'',
        status:'',
        callNo:'',
        title:'',
    };

    let person=[];
    try{
        var obj=this.props.location.state.data.list;
        for(var i in obj) {
            for(var j in obj[i]){
                if(strs[3]==obj[i].name)
                person=obj[i];
            }
        }
        if(person.status==0){
          person.status="司机";
        }
        else{
          person.status="乘客";
        }
    }catch(err){
        person=nullobj;
    }

    return (
      <PageHeaderWrapper title="用户详情页">
        <Card bordered={false}>
           <DescriptionList size="large" title="用户身份信息" style={{ marginBottom: 32 }}>
          
            <Description term="用户姓名">{person.name}</Description>
            <Description term="性别">{person.sex}</Description>
            <Description term="年龄">{person.progress}</Description>
            <Description term="用户类别">{person.status}</Description>
            <Description term="联系电话">{person.callNo}</Description>
            <Description term="家庭住址">{person.address}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Userdetails;
