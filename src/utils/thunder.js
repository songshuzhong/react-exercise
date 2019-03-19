/**
 * @file thunderHK.js
 * @author songshuzhong(songshuzhong@baidu.com)
 * @desc thunder log lib
 * @version 0.1.0
 */
(function(global){
  var thunderInstance = null;
  var defaultOptions = {
    tid: '10362',  // 日志唯一标志号（申请生成）
    ct: '8',  // 产品线标志：1-百度wise首页2-百度pc首页3-手百4-百家号产品线5地图产品线6-浏览器产品线7-爱奇艺头条8-好看
    cst: '2',  // 日志行为类型：1-展现日志2-点击日志3-普通状态5-下发状态7-阅读进度8-停留时长9-请求失败
    logFrom: 'activity',  // 页面级/区块级别标志，不可重复
    logInfo: '',
    ssid: '', // 小流量号
    imei: '',  // 设备imei
    logid: '', // 每次访问的唯一标识用户串联各种行为
    logExtra: {
      flow: '',
      st: '',  //日志类型：mv-小视频
      t: '',  // 前端日志生成时间戳(毫秒)
      k: '',  // 行为类型：display-展现 click-点击
      v: '',  // 按钮说明：week_n-第n周author_head-作者头像content_name-作品名称
      tab: '',  // 页面名称
      tag: '',  // 页面模块: main-整体页面
      inbox: 'hk_1',  // 区分页面位置： hk_1好看端内qm_1baiduapp_1手百端内wise从wise页打开的端外页hk_0从好看端内跳到端外qm_0从全民端内跳到端外baiduapp_0从手百端内跳到端外
      source: '0', // 是否百家号来源：0-无1-百家号
      rid: '',  // 资源标志号
      pos: '', // 本项item在瀑布流中的位置
      extra: '', // 透传字段
    }, // 日志额外信息
    net_type: navigator.connection.effectiveType,
    ua: document.documentElement.clientWidth + '_' + document.documentElement.clientHeight,
  };  //好看常用打点参数

  function ThunderHK(option = {}) {
    var self = this;

    self.baseURL = option.baseURL || '//hpd.baidu.com/v.gif';
    self.isIOS = /iphone/i.test(navigator.userAgent);
    self.uaInfo = (navigator.userAgent.match(/haokan(.*)/i) && navigator.userAgent.match(/haokan(.*)/i)[0])
      ? navigator.userAgent.match(/haokan(.*)/i)[0].split('/') : [];

    self.init(option);
  }

  ThunderHK.prototype = {

    /**
     * 首次合并打点参数
     *
     * @param {object} option 参数对象
     */
    init: function(option) {
      var self = this;
      var { logExtra, ...other } = option;
      var { uaInfo, isIOS, defaultOption } = self;

      Object.assign(defaultOption, {
        tn: uaInfo[3] || '',
        ctn: uaInfo[3] || '',
        appv: uaInfo[5] || '',
        os: getOSType(),
        ut: getOSVersion(),
        cuid: (uaInfo[4] && decodeURIComponent(uaInfo[4])) || '',
        version: isIOS ? (uaInfo[1] && uaInfo[1].match(/(.*)\(/)[1]) || '' : uaInfo[6] || ''
      });
      Object.assign(defaultOption, other);
      Object.assign(defaultOption.logExtra, logExtra);
    },

    /**
     * 发送日志
     *
     * @param {object} newOption 参数对象
     * @param {string} url 日志地址
     * @return {Thunder} this
     */
    sendLog: function(newOption, url) {
      var self = this;
      var id = 'l' + Date.now();
      var req = window[id] = new Image();
      var timer = null;

      url = getParamByName('testlog') ? 'http://thunderlog.baidu.com/logaccess/api/logcheck' : (url || self.baseURL);

      req.onload = req.onerror = req.onabort = function() {
        window[id] = null;
        if (timer) {
          clearTimeout(timer);
          timer = null;
          callback && callback();
        }
      };
      req.src = this.assembleUrl(url, self.defaultOption, newOption);

      return self;
    },

    /**
     * 拼接参数
     * @param {string} url 日志地址
     * @param {object} baseOption 默认参数对象
     * @param {object} newOption 参数对象
     * @returns {string}
     */
    assembleUrl: function(url, defaultOption, newOption) {
      var params = '';
      var { logExtra, ...other } = newOption;

      Object.assign(defaultOption, other);
      Object.assign(defaultOption.logExtra, logExtra);
      defaultOption.r = 'l' + Date.now();

      for (var i in defaultOption) {
        if (defaultOption.hasOwnProperty(i)) {
          if (defaultOption[i] !== undefined) {
            if (typeof defaultOption[i] === 'object') {
              params += '&' + i + '=' + encodeURIComponent(JSON.stringify(defaultOption[i]));
            } else {
              params += '&' + i + '=' + encodeURIComponent(defaultOption[i]);
            }
          }
        }
      }
      return url + '?' + params.slice(1);
    }
  };

  function getParamByName(name) {
    var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  function getOSType() {
    if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      return 'ios';
    } else if (/android/i.test(navigator.userAgent)) {
      return 'android';
    } else {
      return '';
    }
  }

  function getOSVersion() {
    let version = "";
    let ua = navigator.userAgent.toLowerCase();

    if (ua.indexOf("like mac os x") > 0) {
      version = ua.match(/os [\d._]+/gi);
      version = (version + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
    } else if (ua.indexOf("android") > 0) {
      version = ua.match(/android [\d._]+/gi);
      version = (version + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
    }

    return version;
  }

  var exportThunder = {
    create: function(type, key, option) {
      return new ThunderHK(option);
    },
    get: function(option) {
      return thunderInstance || (thunderInstance = this.create(option));
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportThunder;
  } else if (typeof define === 'function' && define.amd) {
    define(function(){ return exportThunder; });
  } else {
    global.Thunder = exportThunder;
    global.thunderLog = exportThunder;
  }

})(this);
