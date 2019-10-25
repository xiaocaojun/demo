import { parse } from 'url';
let arr=["001","002","003"];
let arr1=["王大权","张小华","吕晓花"];
let arr2=["方华","李勇","王全"];
let id=["001","002","003"];
let mprice=["30","20","40"];
let addressuser1=["北亭肥仔","南亭潮汕火锅","贝岗gogo小天地"];
let addressuser2=["南亭潮汕火锅","贝岗gogo小天地","北亭肥仔"];
let phone1=["13820976350","17624536783","16528397638"];
let phone2=["17820976250","12664536783","18528397538"];
let taxiAddress1=["小谷围街道230湖山村534号","北亭龙山小区621号","中环西路230号小湖单元834号"];
let passengerAddress1=["北亭程式小区232号","中环西路230号小湖单元321号","小谷围街道230号中威成342号"];
let taxisex=["男","女","女"];
let passengersex1=["女","男","男"];
let lTime=["2019-07-24 13：34：43","2019-07-25 14：54：23","2019-07-25 19：25：56"];
let aTime=["2019-07-24 13：10：21","2019-07-25 14：42：23","2019-07-25 18：35：38"];
// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 3; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    idorder: arr[i],
    taxiname:arr1[i],
    passengername:arr2[i],
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    idtaxi:arr[i],
    taxiSex:taxisex[i],
    taxiAge:Math.ceil(Math.random() * 100),
    taxiAddress:taxiAddress1[i],
    passengersex:passengersex1[i],
    passengerAddress:passengerAddress1[i],
    passengerAge:Math.ceil(Math.random() * 100),
    leaveTime:aTime[i],
    arriveTime:lTime[i],
    callNo1: phone1[i],
    callNo2:phone2[i],
    status: Math.floor(Math.random() * 10) % 2,
    updatedAt: new Date(`2019-07-${Math.floor(i ) + 1}`),
    createdAt: new Date(`2019-07-${Math.floor(i ) + 1}`),
    progress: Math.ceil(Math.random() * 100),
    startaddress:addressuser1[i],
    overaddress:addressuser2[i],
    price:mprice[i],
  });
}

function getOrderlist(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  
  if (params.idorder) {
    dataSource = dataSource.filter(data => data.idorder.indexOf(params.idorder) > -1);
  }
  if (params.taxiname) {
    dataSource = dataSource.filter(data => data.taxiname.indexOf(params.taxiname) > -1);
  }
  if (params.passengername) {
    dataSource = dataSource.filter(data => data.passengername.indexOf(params.passengername) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postOrderlist(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getOrderlist(req, res, u);
}

export default {
  'GET /api/orderlist': getOrderlist,
  'POST /api/orderlist':postOrderlist,
};
