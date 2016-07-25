import React from 'react';
const License = () => (
  <textarea
    style={styles.textarea}
    readOnly
    defaultValue={`版权所有 (C) 2008-${(new Date).getFullYear()}，ThinkSNS.com 保留所有权利。

ThinkSNS是由ThinkSNS项目组独立开发的SNS程序，基于PHP脚本和MySQL数据库。本程序源码开放的，任何人都可以从互联网上免费下载，并可以在不违反本协议规定的前提下进行使用而无需缴纳程序使用费。

官方网址： www.thinksns.com 交流社区： demo.thinksns.com

为了使你正确并合法的使用本软件，请你在使用前务必阅读清楚下面的协议条款：

    智士软件（北京）有限公司为ThinkSNS产品的开发商，依法独立拥有ThinkSNS产品著作权（中华人民共和国国家版权局著作权登记号 2011SR069454）。智士软件（北京）有限公司网址为 http://www.zhishisoft.com，ThinkSNS官方网站网址为 http://www.thinksns.com。
    ThinkSNS著作权已在中华人民共和国国家版权局注册，著作权受到法律和国际公约保护。使用者：无论个人或组织、盈利与否、用途如何（包括以学习和研究为目的），均需仔细阅读本协议，在理解、同意、并遵守本协议的全部条款后，方可开始使用 ThinkSNS软件。
智士软件（北京）有限公司拥有对本授权协议的最终解释权。
1.0   协议许可的权利
1)    您可以在完全遵守本最终用户授权协议的基础上，将本软件应用于非商业用途，而不必支付软件版权授权费用；
2)    您可以在协议规定的约束和限制范围内修改 ThinkSNS 源代码或界面风格以适应您的网站要求；
3)    您拥有使用本软件构建的社区中全部会员资料、文章及相关信息的所有权，并独立承担与文章内容的相关法律义务；
4)    获得商业授权之后，您可以将本软件应用于商业用途，同时依据所购买的授权类型中确定的技术支持期限、技术支持方式和技术支持内容，自购买时刻起， 在技术支持期限内拥有通过指定的方式获得指定范围内的技术支持服务。商业授权用户享有反映和提出意见的权力，相关意见将被作为首要考虑，但没有一定被采纳的承诺或保证。
2.0   协议规定的约束和限制
1)    未获商业授权之前，不得将本软件用于商业用途（包括但不限于企业网站、经营性网站、以营利为目或实现盈利的网站）。购买商业授权请登录http://www.thinksns.com 参考相关说明，也可以致电8610- 82431402了解详情；
2)    不得对本软件或与之关联的商业授权进行出租、出售、抵押或发放子许可证；
3)    无论如何，即无论用途如何、是否经过修改或美化、修改程度如何，只要使用ThinkSNS的整体或任何部分，未经书面许可，页面页脚处的 Powered by ThinkSNS名称和官网网站的链接（http://www.thinksns.com ）都必须保留，而不能清除或修改；
4)    禁止ThinkSNS的整体或任何部分基础上以发展任何派生版本、修改版本或第三方版本用于重新分发；
5)    如果您未能遵守本协议的条款，您的授权将被终止，所被许可的权利将被收回，并承担相应法律责任。
3.0     有限担保和免责声明

1)    本软件及所附带的文件是作为不提供任何明确的或隐含的赔偿或担保的形式提供的；
2)    用户出于自愿而使用本软件，您必须了解使用本软件的风险，在尚未购买产品技术服务之前，我们不承诺提供任何形式的技术支持、使用担保，也不承担任何因使用本软件而产生问题的相关责任；
3)    智士软件（北京）有限公司不对使用本软件构建的社区中的文章或信息承担责任。
有关ThinkSNS最终用户授权协议、商业授权与技术服务的详细内容，均由ThinkSNS官方网站独家提供。智士软件（北京）有限公司拥有在不事先通知的情况下，修改授权协议和服务价目表的权力，修改后的协议或价目表对自改变之日起的新授权用户生效。
电子文本形式的授权协议如同双方书面签署的协议一样，具有完全的和等同的法律效力。您一旦开始安装 ThinkSNS，即被视为完全理解并接受本协议的各项条款，在享有上述条款授予的权力的同时，受到相关的约束和限制。协议许可范围以外的行为，将直接违反本授权协议并构成侵权，我们有权随时终止授权，责令停止损害，并保留追究相关责任的权力。`}
  />
);

const styles = {
  textarea: {
    boxSizing: 'border-box',
    outline: 'none',
    resize: 'none',
    width: '100%',
    height: 280,
    padding: 10,
    border: 'none',
    color: '#666',
    fontSize: 12,
    overflowY: 'scroll',
  }
};

export default License;