import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, List} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Description } = DescriptionList;
  class UserTest extends Component {
    constructor(props){
      super(props);
      this.state={
        data:[],
      };
  }

  componentDidMount(){
    var obj1=[];
    fetch('https://www.kingdom174.work/ALogin?ADname=%E8%8C%83%E8%80%81%E6%9D%BF&password=12345',
    {
      method:'GET', 
    })
    .then(res => res.text()
    )
    .then(
   res => {
     console.log(res);

     fetch(`https://www.kingdom174.work/userlist?token=${res}`,
     {
       method:'GET',
     })
     .then(res=>res.json())
     .then(res=>{
       console.log(res);
      this.setState({
      data:res
    })
     })
     }
   );
  }

    render() {
      
      const columns = [
        {
          title: '用户名',
          dataIndex: 'UserName',
          key: 'UserName',
        },
        {
          title: '性别',
          dataIndex: 'Sex',
          key: 'Sex',
        },
        {
          title: '类别',
          dataIndex: 'Status',
          key: 'Status',
        },
        {
          title: '余额',
          dataIndex: 'Balance',
          key: 'Balance',
        },
        {
          title: '地址',
          dataIndex: 'StaLocation',
          key: 'StaLocation',
        },
      ];
      

      console.log(this.state.data[0]);
    return (
      <PageHeaderWrapper title="用户测试页">
        <Table dataSource={this.state.data} columns={columns} />;
      </PageHeaderWrapper>
    );
  }
}

export default UserTest;