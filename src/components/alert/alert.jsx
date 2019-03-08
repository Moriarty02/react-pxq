import React, { Component } from 'react';
import ReactDom from "react-dom";
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './alert.less';

export default class Alert extends Component{
  static propTypes = {
    closeAlert: PropTypes.func.isRequired,
    alertTip: PropTypes.string.isRequired,
    alertStatus: PropTypes.bool.isRequired,
  }
  // css动画组件设置为目标组件
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }
  // 关闭弹框
  confirm = () => {
    this.props.closeAlert();
  }
  
  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
  
  componentDidMount(){//新建一个div标签并塞进body
      this.popup = document.createElement("div");
      document.body.appendChild(this.popup);
      this._renderLayer();
   }
  componentDidUpdate(){
   
    this._renderLayer();
    
  }

   componentWillUnmount(){//在组件卸载的时候，保证弹层也被卸载掉
     ReactDom.unmountComponentAtNode(this.popup);
     document.body.removeChild(this.popup);
   }
   _renderLayer(){//将弹层渲染到body下的div标签
    ReactDom.render(<ReactCSSTransitionGroup
      component={this.FirstChild}
      transitionName="alert"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>
      {
        this.props.alertStatus&&<div className="alert-con">
          <div className="alert-context">
            <div className="alert-content-detail">{this.props.alertTip}</div>
            <TouchableOpacity className="confirm-btn" clickCallBack={this.confirm}/>
          </div>
        </div>
      }
    </ReactCSSTransitionGroup>, this.popup);
   
   }
   render(){
    return null;
   }
  
}