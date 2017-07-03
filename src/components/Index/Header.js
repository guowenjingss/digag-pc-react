/**
 * Created by Yuicon on 2017/6/25.
 */
import React, {Component} from 'react';
import {Button, Input, Menu, Notification} from "element-react";
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      registerDialog: false,
      loginDialog: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    if (nextProps.auth.get('token') && this.state.loginDialog) {
      this.setState({loginDialog: false});
      Notification.success({
        title: '成功',
        message: '登陆成功',
        duration: 1500
      });
    } else if (nextProps.auth.get('error') && this.state.loginDialog) {
      Notification.error({
        title: '错误',
        message: nextProps.auth.get('error'),
        type: 'success',
        duration: 1500
      });
    }


  }

  handleSelect = (index) => {
    console.log(index);
  };

  handleIconClick = () => {
    console.log('handleIconClick', this.state.searchInput);
  };

  handleRegisterDialogClose = () => {
    return () => {
      this.setState({registerDialog: false});
    }
  };

  handleLoginDialogClose = () => {
    return () => {
      this.setState({loginDialog: false});
    }
  };

  render() {
    return (
      <header className="main-header visible">
        <div className="container">
          <a href="/" className="logo">
            <img src="//gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="掘金" className="logo-img"/>
          </a>
          <div className="nav-menu">
            <Menu defaultActive="1" mode="horizontal" onSelect={this.handleSelect}>
              <Menu.Item index="1">首页</Menu.Item>
              <Menu.Item index="2">专栏</Menu.Item>
              <Menu.Item index="3">收藏集</Menu.Item>
              <Menu.Item index="4">发现</Menu.Item>
              <Menu.Item index="5">标签</Menu.Item>
              <Menu.Item index="6">
                <Input
                  size="small"
                  icon="search"
                  placeholder="搜索掘金"
                  onIconClick={this.handleIconClick}
                  onChange={(value) => this.setState({searchInput: value})}
                />
              </Menu.Item>
              <Menu.Item index="7">
                <Button type="text" icon="edit" className="contribute">投稿</Button>
              </Menu.Item>
              <Menu.Item index="8">
                <Button type="text" className="login-btn"
                        onClick={ () => this.setState({loginDialog: true}) }>登录</Button>
                <Button type="text" onClick={ () => this.setState({registerDialog: true}) }>注册</Button>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <RegisterDialog visible={this.state.registerDialog} onClose={this.handleRegisterDialogClose()}
                        registerActions={this.props.registerActions}
        />
        <LoginDialog visible={this.state.loginDialog} onClose={this.handleLoginDialogClose()}
                     loginActions={this.props.loginActions}
        />
      </header>
    )
  }
}
