class Amplify{
    constructor(ele , imgArray){
        // 接收存储参数
        this.ele = ele;
        this.imgArray = imgArray;

        // 通过参数1,也就是整个放大镜区域,来获取标签对象
        // 图片区域
        this.show = ele.querySelector('.show');
        // 图片区域中的遮盖层
        this.mask = ele.querySelector('.mask');
        // 下方小图片列表中的li标签
        this.list = ele.querySelectorAll('.list li');
        // 放大镜区域
        this.glass = ele.querySelector('.glass');
        // 获取show当中的图片标签
        this.img = this.show.querySelector('img');
    }

    // 定义一个方法,来调用之后定义的所有的方法
    // 入口函数 
    init(){
        this.overOut();
        this.move();
        this.toggle();
    }

    // 鼠标的移入移出
    overOut(){
        // 鼠标移入,图片区域show,让遮盖层和放大镜显示
        this.show.addEventListener('mouseover' , ()=>{
            this.mask.style.display = 'block';
            this.glass.style.display = 'block';
        })
        // 鼠标移出,图片区域show,让遮盖层和放大镜隐藏
        this.show.addEventListener('mouseout' , ()=>{
            this.mask.style.display = 'none';
            this.glass.style.display = 'none';
        })
    }

    // 鼠标移动效果
    // 鼠标在 图片区域移动 时
    // 1,让遮盖层,跟随鼠标移动 --- 类似之前鼠标拖拽的效果

    move(){
        // 鼠标在show区域移动
        // 不是拖拽,没有点击事件
        // 移动出图片区域,遮盖层不显示,也不用写取消效果
        this.show.addEventListener('mousemove' , (e)=>{
            // 1,定位 遮盖层
            // 通过 鼠标的定位位置,来计算 遮盖层 左上角 定位的坐标位置

            // 相对于视窗窗口 - div的外边距 - div的边框线 - 遮盖层宽高的一半
            // 1,如果没有页面滚动,使用相对视窗窗口 clientX 和 相对页面 PageX 是都可以的
            //   如果有页面滚动,要看放大镜部分,是否跟随页面一起运动
            //   如果一起运动,就使用 pageX
            //   如果没有一起运动,就使用 clientX
            // 2,offsetLeft , div与定位父级的间距,当前也就是与body的间距
            // 3,clientLeft , div的边框线
            // 4,遮盖层宽高的一半 , 定位之后 , 鼠标位置与遮盖层中心重合
            
            // 我们之前使用的获取占位,有问题,如果标签是隐藏的,无法获取占位
            // 只能使用获取宽度高度的方法
            // clientWidth  offsetHeight  获取的是占位,如果是 display:none 占位是 0
            // 只能通过获取标签css属性属性值来获取
            
            let x = e.clientX - this.ele.offsetLeft - this.ele.clientLeft - this.mask.clientWidth/2 ;
            let y = e.clientY - this.ele.offsetTop - this.ele.clientTop - this.mask.clientHeight/2 ;

            // 2,设定边界值
            // 最小是 0  最大值 父级div宽高 - 遮盖层宽高
            if(x < 0){
                x = 0;
            }

            if(y < 0 ){
                y = 0;
            }

            if(x > this.show.clientWidth - this.mask.clientWidth){
                x = this.show.clientWidth - this.mask.clientWidth;
            }

            if(y > this.show.clientHeight - this.mask.clientHeight){
                y = this.show.clientHeight - this.mask.clientHeight;
            }

            // 3,将数值定位给遮盖层
            this.mask.style.left = x + 'px';
            this.mask.style.top = y + 'px';

            // 4,需要让右侧放大镜的背景图片也一起移动
            // 给背景图片添加定位
            // 左侧是 图片不动,遮盖层动      遮盖层动  100  100
            // 右侧是 放大镜不动,背景图片动  背景图动 -100 -100
            // 移动时,定位必须是按照比例来设定 

            // 背景图片定位 = 背景图片大小 * 遮盖层定位 / 图片大小 
            // 通过遮盖层移动的比例,来计算,背景图片定位的数值             
            let bx = 1600*x/400 ;
            let by = 1600*y/400 ;

            // 给背景图片定位
            // 给背景图片进行定位赋值操作
            // 背景图片定位:应该是 background-position : x轴定位 y轴定位
            // 使用JavaScript语法,定义 标签.style.backgroundPosition = 数值拼接px单位 数值拼接px单位
            // 使用模板字符串来解析变量
            // 也可以使用字符串拼接方式  bx + 'px' + ' ' + by + 'px'
            this.glass.style.backgroundPosition = ` -${bx}px  -${by}px `;

            // 要完美实现放大镜效果
            // 必须注意2个比例
            // 1,CSS样式的比例 :   图片区域大小 : 遮盖层大小 = 背景图片大小 : 放大镜区域大小
            // 2,定位的比例 :   遮盖层定位 : 图片区域大小 = 背景图片定位 : 背景图片大小
        })
    }

    // 切换效果
    // 1,给当前 点击click / 鼠标经过mouseover 的标签,添加样式
    //   给所有的标签去除样式,给当前点击/经过标签,添加样式

    toggle(){
        this.list.forEach((item,key)=>{
            item.addEventListener('click' , ()=>{
                // 1,给所有的li标签清除样式
                this.list.forEach((i,k)=>{
                    i.className = '';
                })

                // 2,给当前的标签添加样式
                item.className = 'active';

                // 3,设定图片
                // 当前标签的索引下标 key 就是对应 图片数组中,需要显示的图片的索引下标
                // 图片的实参,存储在 this.imgArray 中 通过索引下标,可以获取到对应的图片信息
                // this.imgArray[key]
                // console.log(this.imgArray[key]);
                // 将每一个图片的具体信息,设定给图片标签和放大镜的背景图片
                
                // 1,给图片标签,设定路径
                // 通过数组,索引,图片属性,获取对应的图片名称
                // 标签.src = 赋值   或者  标签.setAttribute('src' , 属性值) 都可以
                // this.img.src = `./images/${this.imgArray[key]['normal']}`;
                this.img.setAttribute('src' , `../images/${this.imgArray[key]['normal']}`);

                // 2,给放大镜区域,背景图片设定路径
                // 必须把关于背景图片的所有设定都重新写一遍
                this.glass.style.background = `url('../images/${this.imgArray[key]['big']}') no-repeat 0 0`;
                this.glass.style.backgroundSize = '1600px';
            })
        })
    }
}