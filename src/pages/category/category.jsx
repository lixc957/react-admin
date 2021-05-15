import React, { Component, Fragment } from 'react'
import { Button, Icon, Card, Table, message } from 'antd'
import LinkButton from '../../components/link-button'
import { apiGetCategoryList } from '../../api/admin'

export default class Category extends Component {
  extraNode = null // card 右侧
  columns = null // 表格列

  state = {
    title: '一级分类列表',
    loading: false, // 页面是否加载中
    categoryList: [], 
    defaultCategoryList: [
      {
        "parentId": "0",
        "_id": "5c2ed631f352726338607046",
        "name": "分类001",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed647f352726338607047",
        "name": "分类2",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed64cf352726338607048",
        "name": "1分类3",
        "__v": 0
      }
    ],
    parentId: '0', // 父分类id

  }
  // ------------ 自定义方法
  getExtraNode = () => {
    return (
      <Button type='primary'>
        <Icon type='plus'/>
        添加
      </Button>
    )
  }
  getColumnsNode = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        width: 300,
        render: () => (
          <Fragment>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </Fragment>
        )
      }
    ]
  }

  // ------------ 网络请求
  /* 获取分类列表 */
  getCategoryList = async () => {
    this.setState({ loading: true })
    const { parentId, defaultCategoryList } = this.state
    try {
      const res = await apiGetCategoryList(parentId)
      if (res.status === 0) {
        this.setState({ categoryList: res.data.length ? res.data : defaultCategoryList })
      } else {
        message.error('获取分类列表失败！')
      }
    } catch (err) {
      message.error(err.msg)
    }
    this.setState({ loading: false })
  }

  UNSAFE_componentWillMount() {
    this.extraNode = this.getExtraNode()
    this.getColumnsNode()
  }
  componentDidMount() {
    this.getCategoryList()
  }
  render() {
    const { categoryList, title, loading } = this.state
    return (
      <Card title={title} extra={this.extraNode}>
        <Table
          bordered
          loading={loading}
          rowKey='_id'         
          dataSource={categoryList}
          columns={this.columns}
          pagination={{defaultPageSize: 5, showQuickJumper: true}}
        />
      </Card>
    )
  }
}
