import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import AlertWarning from 'material-ui/svg-icons/alert/warning';

import request from 'superagent';

import License from './license';

let g_uid = 0;
const guid = () => {
  ++g_uid;
  return g_uid;
};

const App = React.createClass({
  getInitialState() {
    return {
      stepIndex: 4,
      checkSystemp: {
        next: false,
        items: [
          {
            name: 'PHP',
            icon: '',
            text: '未检查',
            des: '程序运行之基石'
          },
          {
            name: 'PDO',
            icon: '',
            text: '未检查',
            des: '用于与数据库通信'
          },
          {
            name: 'GD库',
            icon: '',
            text: '未检查',
            des: '图片处理库'
          },
          {
            name: 'cURL',
            icon: '',
            text: '未检查',
            des: '服务端http通信工具'
          },
        ],
        checkBottomText: '检查环境',
        checkBottomDisabled: false,
      },
      alert: {
        open: false,
        message: ''
      },
      database: {
        next: true,
        error: '',
        text: '下一步',
      },
      admin: {
        username: {
          value: 'admin',
        },
        email: {
          value: '',
        },
        password: {
          value: '',
        }
      }
    };
  },

  render() {
    return (
      <MuiThemeProvider mui={getMuiTheme(darkBaseTheme)}>
        <div
          style={styles.root}
        >
          <header
            style={styles.header}
          >
            <img src={'dist/thinksns.gif'} />
            <span style={styles.headerTitle}>安装向导</span>
          </header>
          <Stepper
            activeStep={this.state.stepIndex}
            linear={true}
            orientation={'vertical'}
          >
            {/* 安装协议 */}
            <Step>
              <StepLabel>安装许可协议</StepLabel>
              <StepContent>
                <License />
                <div style={styles.bottomCommonStyle}>
                  <RaisedButton
                    label="同意协议并安装"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{marginRight: 12}}
                    onTouchTap={() => {
                      this.state.stepIndex = 1;
                      this.setState(this.state);
                    }}
                  />
                </div>
              </StepContent>
            </Step>
            {/* 环境检查 */}
            <Step>
              <StepLabel>服务器配置检查 & 目录和文件的写权限检查</StepLabel>
              <StepContent>
                <Table
                  selectable={false}
                >
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                  >
                    <TableRow>
                      <TableHeaderColumn>检查项目</TableHeaderColumn>
                      <TableHeaderColumn>检查结果</TableHeaderColumn>
                      <TableHeaderColumn>功能说明</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                  >
                  {this.state.checkSystemp.items.map((item) => (
                    <TableRow key={guid()}>
                      <TableRowColumn>{item.name}</TableRowColumn>
                      <TableRowColumn
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {item.icon == 'success' && (
                          <ActionCheckCircle
                            color={'#0096e5'}
                            style={{
                              marginRight: 6,
                            }}
                          />
                        )}
                        {item.icon == 'error' && (
                          <AlertWarning
                            color={'#ff0000'}
                            style={{
                              marginRight: 6,
                            }}
                          />
                        )}
                        {item.text}
                      </TableRowColumn>
                      <TableRowColumn>{item.des}</TableRowColumn>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
                <div style={styles.bottomCommonStyle}>
                  <RaisedButton
                    label="上一步"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{
                      marginRight: 12,
                    }}
                    onTouchTap={() => {
                      this.state.stepIndex = 0;
                      this.setState(this.state);
                    }}
                  />
                  <RaisedButton
                    label={this.state.checkSystemp.checkBottomText}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{marginRight: 12}}
                    disabled={this.state.checkSystemp.checkBottomDisabled}
                    onTouchTap={this.handleCheckSystemp}
                  />
                  <RaisedButton
                    label="下一步"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{marginRight: 12}}
                    disabled={!this.state.checkSystemp.next}
                    onTouchTap={() => {
                      this.state.stepIndex = 2;
                      this.setState(this.state);
                    }}
                  />
                </div>
              </StepContent>
            </Step>
            {/* 数据库信息设置 & 数据库版本检查 */}
            <Step>
              <StepLabel>数据库信息设置 & 数据库版本检查</StepLabel>
              <StepContent>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn>数据库地址：</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          id={'db-localhost'}
                          hintText={'数据库地址'}
                          defaultValue={'localhost'}
                          ref={'host'}
                        />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>数据库端口：</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          id={'db-port'}
                          hintText={'数据库端口'}
                          defaultValue={3306}
                          ref={'port'}
                        />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>数据库登录名：</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          id={'db-username'}
                          hintText={'数据库登录名'}
                          defaultValue={'root'}
                          ref={'username'}
                        />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>数据库登录密码：</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          id={'db-password'}
                          hintText={'数据库登录密码'}
                          ref={'password'}
                          type={'password'}
                        />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>数据库名：</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          id={'db-name'}
                          hintText={'数据库名称'}
                          defaultValue={'thinksns_v4'}
                          ref={'database'}
                        />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>数据表前缀：</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          id={'db-prefix'}
                          hintText={'数据表前缀'}
                          defaultValue={'ts_'}
                          ref={'prefix'}
                        />
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
                <div style={styles.bottomCommonStyle}>
                  <RaisedButton
                    label="上一步"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{
                      marginRight: 12,
                    }}
                    onTouchTap={() => {
                      this.state.stepIndex = 1;
                      this.setState(this.state);
                    }}
                  />
                  <RaisedButton
                    label={this.state.database.text}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{marginRight: 12}}
                    disabled={!this.state.database.next}
                    onTouchTap={this.handleSubmitDatabase}
                  />
                </div>
              </StepContent>
            </Step>
            {/* 设置创始人信息 */}
            <Step>
              <StepLabel>设置创始人信息</StepLabel>
              <StepContent>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn>用户名：</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          id={'admin-username'}
                          hintText={'创始人用户名'}
                          defaultValue={this.state.admin.username.value}
                          ref={'adminUserName'}
                          onChange={() => {
                            this.state.admin.username.value = this.refs.adminUserName.getValue();
                          }}
                        />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>E-Mail：</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          id={'admin-email'}
                          hintText={'创始人邮箱'}
                          defaultValue={this.state.admin.email.value}
                          ref={'adminEmail'}
                          type={'email'}
                          onChange={() => {
                            this.state.admin.email.value = this.refs.adminEmail.getValue();
                          }}
                        />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>密码：</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          id={'admin-password'}
                          hintText={'创始人密码'}
                          defaultValue={this.state.admin.password.value}
                          ref={'adminPassword'}
                          type={'password'}
                          onChange={() => {
                            this.state.admin.password.value = this.refs.adminPassword.getValue();
                          }}
                        />
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
                <div style={styles.bottomCommonStyle}>
                  <RaisedButton
                    label="上一步"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{
                      marginRight: 12,
                    }}
                    onTouchTap={() => {
                      this.state.stepIndex = 2;
                      this.setState(this.state);
                    }}
                  />
                  <RaisedButton
                    label={'下一步'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{marginRight: 12}}
                    onTouchTap={this.handleSubmitAdmin}
                  />
                </div>
              </StepContent>
            </Step>
            {/* 安装 & 导入数据库数据 & 创始人信息确认 */}
            <Step>
              <StepLabel>安装 & 导入数据库数据 & 创始人信息确认</StepLabel>
              <StepContent>
                <p>创始人用户名：{this.state.admin.username.value}</p>
                <p>创始人邮箱：{this.state.admin.email.value}</p>
                <p>创始人密码：{this.state.admin.password.value}</p>
                <div style={styles.bottomCommonStyle}>
                  <RaisedButton
                    label="上一步"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{
                      marginRight: 12,
                    }}
                    onTouchTap={() => {
                      this.state.stepIndex = 3;
                      this.setState(this.state);
                    }}
                  />
                  <RaisedButton
                    label={'安装 & 导入数据'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    style={{marginRight: 12}}
                  />
                </div>
              </StepContent>
            </Step>
          </Stepper>
          <footer
            style={styles.footer}
          >
            ThinkSNS v4 ©copyright 2008 - {(new Date).getFullYear()} www.thinksns.com All Rights Reserved
          </footer>
          <Dialog
            open={this.state.alert.open}
            modal={false}
            onRequestClose={() => {
              this.state.alert.open = false;
              this.setState(this.state);
            }}
            actions={
              <FlatButton
                label="关闭"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {
                  this.state.alert.open = false;
                  this.setState(this.state);
                }}
              />
            }
          >
            {this.state.alert.message}
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  },

  handleSubmitAdmin() {
    let username = this.state.admin.username.value;
    let email = this.state.admin.email.value;
    let password = this.state.admin.password.value;
    if (username.length < 5) {
      this.alert('创始人用户名不能小于五位');
    } else if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email)) {
      this.alert('邮箱格式不正确!');
    } else if (password.length < 6) {
      this.alert('密码不能小于6位');
    } else {
      this.state.stepIndex = 4;
      this.setState(this.state);
    }
  },

  handleSubmitDatabase() {
    this.state.database.text = '检查中...';
    this.state.database.next = false;
    this.setState(this.state);

    let host = this.refs.host.getValue();
    let port = this.refs.port.getValue();
    let username = this.refs.username.getValue();
    let password = this.refs.password.getValue();
    let database = this.refs.database.getValue();
    let prefix = this.refs.prefix.getValue();
    
    request
      .post('api/submitDatabase.php')
      .field('host', host)
      .field('port', port)
      .field('username', username)
      .field('password', password)
      .field('database', database)
      .field('prefix', prefix)
      .end((error, ret) => {
        this.state.database.text = '下一步';
        this.state.database.next = true;
        if (error) {
          this.alert(error);
        } else if (ret.body.status == false) {
          this.alert(ret.body.message);
        } else {
          this.state.stepIndex = 3;
          this.setState(this.state);
        }
      })
    ;
  },

  handleCheckSystemp() {
    this.state.checkSystemp.checkBottomText = '检查中...';
    this.state.checkSystemp.checkBottomDisabled = true;
    this.setState(this.state);
    request
      .get('api/checkSystemp.php')
      .end((error, ret) => {
        if (error) {
          this.state.checkSystemp.checkBottomText = '重新检查';
          this.state.checkSystemp.checkBottomDisabled = false;
          this.alert(error);
        } else {
          this.state.checkSystemp.checkBottomText = '检查成功';
          this.state.checkSystemp.next = ret.body.next;
          this.state.checkSystemp.items = ret.body.items;
          this.setState(this.state);
        }
      })
    ;
  },

  alert(message) {
    this.state.alert.open = true;
    this.state.alert.message = message;
    this.setState(this.state);
  },

});

const styles = {
  root: {
    width: 760,
    height: 'auto',
    margin: '25px auto',
    border: '1px solid #eee',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #8e8e8e',
    backgroundColor: '#fff',
  },
  headerTitle: {
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    boxSizing: 'border-box',
    width: '100%',
    padding: 20,
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: '#999',
  },
  bottomCommonStyle: {
    width: '100%',
    margin: '12px 0',
    textAlign: 'center',
  }
};

export default App;