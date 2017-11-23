var forbiddenDocumentScroll = function (e) {
    e.preventDefault(); //防止微信端公众号网页下拉界面随着一起滚动
}

function getDom(id) {
    return document.getElementById(id);
}

function getMinHeight(flag) {
    let [top1, top2] = [0, 0];　　
    if (document.body) {
        top1 = document.body[flag];　　
    }　　
    if (document.documentElement) {
        top2 = document.documentElement[flag];　　
    }　　
    return Math.min(top1, top2);
}

function getMaxHeight(flag) {
    let [top1, top2] = [0, 0];　　
    if (document.body) {
        top1 = document.body[flag];　　
    }　　
    if (document.documentElement) {
        top2 = document.documentElement[flag];　　
    }　　
    return Math.max(top1, top2);
}
//下拉刷新
let domUp = {
    domRefresh: '<div class="dropload_refresh">↓下拉刷新</div>',
    domUpdate: '<div class="dropload_update">↑释放更新</div>',
    domLoad: '<div class="dropload_load"><span class="loading"></span>刷新中...</div>'

}
//上拉加载
let domDown = {
    domRefresh: '<div class="dropload_refresh">↑上拉加载更多</div>',
    domUpdate: '<div class="dropload_update">↓释放加载</div>',
    domLoad: '<div class="dropload_load"><i class="loading"></i>加载中...</div>',
    noMore: '<div class="dropload_no">没有更多了...</div>'
}

let dragConfig = {
    scrollPosition: 'body', //或者容器container
    isDone: true, //判断上次操作是否完成
    pageY: 0,
    initH: 0, //下拉刷新dom初始化高度
    moveDistance: 0, //移动距离

    moveDomRefresh: false, //move的时候判断dom是否已经被更新，防止重复更新

    refresh: true, //是否允许刷新
    load: true, //是否允许加载

    vhUp: 500, //允许拉下来的最大高度
    vhDown: 500, //允许拉上去的最大高度

    loadingUp: 4, //刷新中动画的位置（是initH高度的多少倍）
    loadingDown: 2, //加载动画的位置

    // imgScale: 5, //图片放大系数
}
let dragChange = class {
    constructor(info) {
        this.cbkrefresh = info.cbkrefresh || undefined; //下拉刷新回调
        this.cbkload = info.cbkload || undefined; //上拉加载回调
        this.dom = getDom(info.id);
        this.childDom = false; //是否已经创建了子节点
        this.config = Object.assign({}, dragConfig, info.option);
        // this.dom.addEventListener('touchstart',this.start);//此时函数中的this是指这个dom
        this.dom.addEventListener('touchstart', this._start.bind(this)); //此时函数中的this是指这个实例,为了把event传进去
        this.dom.addEventListener('touchmove', this._move.bind(this));
        this.dom.addEventListener('touchend', this._end.bind(this));
    }
    _start(e) {
        if (this.config.scrollPosition == 'body') {
            this.config.scrollTop = getMaxHeight('scrollTop'); //滚动高度
            this.config.clientHeight = getMinHeight('clientHeight'); //窗口高度
            this.config.scrollHeight = getMaxHeight('scrollHeight'); //文档高度
        }
        //未测试
        if (this.config.scrollPosition == 'container') {
            this.config.scrollTop = this.dom.scrollTop; //滚动高度
            this.config.clientHeight = this.dom.clientHeight; //窗口高度
            this.config.scrollHeight = this.dom.scrollHeight; //文档高度
        }
        console.log(this.config.scrollHeight, this.config.clientHeight, this.config.scrollTop)
        this.config.pageY = e.touches[0].pageY; //初始触点鼠标Y坐标
    }
    _move(e) {
        this.config.moveDistance = e.touches[0].pageY - this.config.pageY; //拉动的纵向距离
        //下拉刷新（判断高度是否为顶部，上一次刷新是否完成，是否允许刷新，手指是否为下拉）
        if (this.config.scrollTop == 0 && this.config.isDone && this.config.refresh && this.config.moveDistance > 0) {
            document.addEventListener('touchmove', forbiddenDocumentScroll);
            if (!this.childDom) {
                this.dom.insertAdjacentHTML('afterBegin', domUp.domRefresh); //创建dom
                let child = this.dom.firstElementChild; //获取创建的dom
                this.config.initH = child.offsetHeight; //刚创建dom的高度
                this.dom.style.cssText = 'transform:translate(0,-' + this.config.initH + 'px)'; //隐藏刚创建的dom
                this.childDom = true; //标记当前dom已经存在，不需要再继续新增
            }
            let child = this.dom.firstElementChild;
            let distUp = Math.min(this.config.vhUp, (-this.config.initH + this.config.moveDistance)); //界面移动的距离
            // let img = child.firstElementChild;
            // img.style.cssText = 'transform:scale(' + Math.max((distUp / this.config.initH / this.config.imgScale), 1) + ');transform-origin:50% 100%';
            this.dom.style.cssText = 'transform:translate(0,' + distUp + 'px)'; //拉动
            if (Math.abs(this.config.moveDistance) > this.config.initH * this.config.loadingUp && !this.config.moveDomRefresh) {
                child.remove();
                this.dom.insertAdjacentHTML('afterBegin', domUp.domUpdate); //更新dom（释放刷新）
                this.config.moveDomRefresh = true; //避免重新创建‘释放刷新’
            }
        }
        //上拉加载（判断是否有滚动条，滚动条是否在底部，上一次加载是否完成，是否允许加载，手指是否为上拉）
        if ((this.config.scrollHeight > this.config.clientHeight) && (this.config.scrollHeight <= (this.config.clientHeight + this.config.scrollTop + 5)) && this.config.isDone && this.config.load && (this.config.moveDistance < 0)) {
            document.addEventListener('touchmove', forbiddenDocumentScroll);
            if (!this.childDom) {
                this.dom.insertAdjacentHTML('beforeEnd', domDown.domRefresh);
                let child = this.dom.lastElementChild; //获取创建的dom
                this.config.initH = child.offsetHeight; //新增dom结构的高度
                this.childDom = true;
            }
            let child = this.dom.lastElementChild;
            let distDown = Math.min(this.config.vhDown, this.config.moveDistance);
            this.dom.style.cssText = 'transform:translate(0,' + distDown + 'px)';
            if (Math.abs(this.config.moveDistance) > this.config.initH * this.config.loadingDown && !this.config.moveDomRefresh) {
                child.remove();
                this.dom.insertAdjacentHTML('beforeEnd', domDown.domUpdate);
                this.config.moveDomRefresh = true;
            }
        }

    }
    _end(e) {
        //刷新
        if (this.config.scrollTop == 0 && this.config.isDone && this.config.refresh && this.childDom && this.config.moveDistance > 0) {
            document.removeEventListener('touchmove', forbiddenDocumentScroll);
            let child = this.dom.firstElementChild;
            child.remove(); //移除节点
            if (Math.abs(this.config.moveDistance) > this.config.initH) { //未达到最小高度什么都不做
                this.dom.insertAdjacentHTML('afterBegin', domUp.domLoad); //刷新中...
                this.dom.style.cssText = 'transform:translate(0,' + this.config.initH * this.config.loadingUp + 'px)'; //刷新中动画的位置
                this.config.isDone = false;
                this.cbkrefresh();
            } else {
                this.dom.style.cssText = 'transform:translate(0,0)';
            }
        }
        console.log('2base.scrollHeight=' + this.config.scrollHeight);
        console.log('2base.clientHeight=' + this.config.clientHeight);
        console.log('2base.scrollTop=' + this.config.scrollTop);
        //滑到底部的时候，处理一下让他禁止滚动TODO
        if ((this.config.scrollHeight > this.config.clientHeight) && (this.config.scrollHeight <= (this.config.clientHeight + this.config.scrollTop + 5)) && this.config.isDone && this.config.load && (this.config.moveDistance < 0)) {
            document.removeEventListener('touchmove', forbiddenDocumentScroll);
            let child = this.dom.lastElementChild;
            child.remove(); //移除节点
            if (Math.abs(this.config.moveDistance) > this.config.initH) { //未达到最小高度什么都不做
                this.dom.insertAdjacentHTML('beforeEnd', domDown.domLoad);
                this.dom.style.cssText = 'transform:translate(0,-' + this.config.initH * this.config.loadingDown + 'px)';
                this.config.isDone = false;
                this.cbkload();
            } else {
                this.dom.style.cssText = 'transform:translate(0,0)';
            }
        }
        this.childDom = false;
        this.config.moveDomRefresh = false; //未更新
    }
    //更新完成
    refreshOk(flag) { //刷新后flag用于判断是否可以加载
        let child = this.dom.firstElementChild;
        if (child) {
            child.remove();
        }
        this.config.moveDistance = 0;
        this.config.isDone = true; //刷新完成
        if (flag) {
            if (!this.config.load) { //如果已经加载完成了,删除没有更多节点,并且允许加载
                let child = this.dom.lastElementChild;
                child.remove();
                this.config.load = flag; //允许加载
            }
        }
        this.dom.style.cssText = 'transform:translate(0,0)';
    }
    //加载完成
    reloadOk(flag) { //加载后flag用于判断是否加载完成
        let child = this.dom.lastElementChild;
        if (child) {
            child.remove();
        }
        this.config.moveDistance = 0;
        this.config.isDone = true;
        this.dom.style.cssText = 'transform:translate(0,0)';
        if (flag) {
            this.config.load = false;
            vm.$nextTick(() => {
                this.dom.insertAdjacentHTML('beforeEnd', domDown.noMore);
            })
        }
    }
}
export default dragChange;
