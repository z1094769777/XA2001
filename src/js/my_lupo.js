class Banner {
    constructor(ele) {
        this.ele = ele;
        this.oUl = ele.querySelector('ul');
        this.oOl = ele.querySelector('ol');
        this.oLeftRight = ele.querySelector('div');
        this.oUllis = ele.querySelectorAll('ul li');

        this.index = 0;

        this.loopTime = 0;
    }
    init() {
        this.setLi();
        this.setClick();
        this.autoLoop();
        this.overOut();
        
    }

    setLi() {
        this.oUllis.forEach((item, key) => {
            const li = document.createElement('li');

            li.setAttribute('name', 'olli');

            li.setAttribute('index', key);

            if (key == 0) {
                li.className = 'active';
            }
            this.oOl.appendChild(li);
        })
    }

    change(param) {
        this.oUllis[this.index].style.opacity = 0;
        if (param == 'right') {
            this.index++;
        }
        if (param == 'left') {
            this.index--;
        }

        if (this.index == -1) {
            this.index = this.oUllis.length - 1;
        }
        if (this.index == this.oUllis.length) {
            this.index = 0;
        }

        this.oUllis[this.index].style.opacity = 1;
        this.setActive()
    }

    autoLoop(){
        this.loopTime = setInterval(()=>{
            this.change('right');
        } , 1000)
    }

    overOut(){
        this.ele.addEventListener('mouseover' , ()=>{
            clearInterval(this.loopTime);
        })
        this.ele.addEventListener('mouseout' , ()=>{
            this.autoLoop();
        })
    }
    
    setClick() {
        this.ele.addEventListener('click', (e) => {
            if(e.target.getAttribute('name') == 'left'){
                this.change('left');
            }
            if(e.target.getAttribute('name') == 'right'){
                this.change('right');
            }

            if (e.target.getAttribute('name') == 'olli') {
                let ind = e.target.getAttribute('index');
                this.oUllis[this.index].style.opacity = 0;
                this.index = ind;
                this.oUllis[this.index].style.opacity = 1;
                this.setActive();
            }
        })
    }

    setActive() {
        const oOllis = this.ele.querySelectorAll('ol li');
        oOllis.forEach((item, key) => {
            item.className = '';
            if (key == this.index) {
                item.className = 'active';
            }
        })
    }
}