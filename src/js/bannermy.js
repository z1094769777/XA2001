class MySetLoop{
    constructor(ele){
        this.ele = ele;
        this.oUl = ele.querySelector('ul');
        this.oOl = ele.querySelector('ol');
        this.oD = ele.querySelector('div');
        this.oUllis = ele.querySelectorAll('ul li');
        this.index = 1;
        this.loopTime = 0;
        this.oLiwidth = parseInt(window.getComputedStyle(this.oUllis[0]).width );
        this.bool = '原始数值';
    }
    //定义方法
    // 运动函数
    move(ele, obj, callback) {
        for (let type in obj) {
            let oldVal = parseInt(window.getComputedStyle(ele)[type]);
            let time = setInterval(function () {
                let val = (obj[type] - oldVal) / 2;
                val = val > 0 ? Math.ceil(val) : Math.floor(val);
                oldVal += val;
                ele.style[type] = oldVal + 'px';
                if (oldVal == obj[type]) {
                    clearInterval(time);
                    callback()
                }
            }, 100)
        }
    }
    //设定焦点
    setLi(){
        let str = '';
        this.oUllis.forEach((item , key)=>{
            if(key == 0){
                str += `<li index="${key + 1}" class="active"></li>`;
            }else{
                str += `<li index="${key + 1}" ></li>`;
            }
        });
        this.oOl.innerHTML = str;
    }
    //复制标签
    copyLi(){
        let liF = this.oUllis[0];
        let liL = this.oUllis[this.oUllis.length-1];
        let first = liF.cloneNode(true);
        let last = liL.cloneNode(true);
        this.oUl.appendChild(first);
        this.oUl.insertBefore(last, liF);
        this.oUl.style.width = ((this.oUllis.length + 2) * this.oLiwidth) + 'px';
        this.oUl.style.left = -this.oLiwidth + 'px';
    }
    //自动轮播
    autoLoop(){
        this.loopTime = setInterval( ()=> {
            this.index++;
            this.move(this.oUl, { left: -this.index * this.oLiwidth },  ()=>{
                this.stopLoop();
            })
        }, 2000);
    }
    //移动停止时，执行的函数
    stopLoop() {
        this.bool = '原始数值';
        if (this.index == this.oUllis.length + 1) {
            this.index = 1;
            this.oUl.style.left = (-this.index * this.oLiwidth) + 'px';
        } else if (this.index == 0) {
            this.index = this.oUllis.length;
            this.oUl.style.left = (-this.index * this.oLiwidth) + 'px';
        }
        let oOllis = this.ele.querySelectorAll('ol li');
        oOllis.forEach( (item) => {
            item.className = '';
            if (item.getAttribute('index') == this.index) {
                item.className = 'active';
            }
        })
    }
    //鼠标移入移出
    overOut () {
        this.ele.addEventListener('mouseover',  () =>{
            clearInterval(this.loopTime)
        });
        this.ele.addEventListener('mouseout',  () =>{
            this.autoLoop();
        });
    }
    //焦点切换
    focus(){
        this.oOl.addEventListener('click' , (e)=>{
            if(e.target.tagName == 'LI'){
                if(this.bool !== '原始数值'){
                    return;
                }
                this.bool = '非原始数值';
                this.index = e.target.getAttribute('index')-0;
                this.move(this.oUl, { left: -this.index * this.oLiwidth },  ()=> {
                    this.stopLoop();
                })
            }
        })
    }
    // 左右切换
    leftRight() {
        this.oD.addEventListener('click',  (e)=> {
            if (e.target.getAttribute('name') == 'left') {
                if(this.bool !== '原始数值'){
                    return;
                }
                this.bool = '非原始数值';
                this.index--;
                this.move(this.oUl, { left: -this.index * this.oLiwidth },  ()=> {
                    this.stopLoop();
                })
            }else if(e.target.getAttribute('name') == 'right'){
                if(this.bool !== '原始数值'){
                    return;
                }
                this.bool = '非原始数值';
                this.index++;
                this.move(this.oUl, { left: -this.index * this.oLiwidth },  ()=> {
                    this.stopLoop();
                })
            }
        })
    }
    //隐藏
    hidden(){
        document.addEventListener('visibilitychange' , ()=>{
            if(document.visibilityState === 'hidden'){
                clearInterval(this.loopTime);
            }else if(document.visibilityState === 'visible'){
                this.autoLoop();
            }
        })
    }
}