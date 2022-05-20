class Snake{
    //蛇头
    head: HTMLElement
    //蛇身
    bodies: HTMLCollectionOf<HTMLElement>

    element:HTMLElement
    constructor(){
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div')! as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    get X(){
        return this.head.offsetLeft
    }

    get Y(){
        return this.head.offsetTop
    }

    set X(value:number){
        if(this.X === value){
            return
        }
        //不允许掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft ===value){
            if(value > this.X){
                value = this.X -10
                console.log(value)
            }else{
                value = this.X + 10
            }
        }
        //判断蛇是否到画布边缘
        if(value > 290 || value < 0){
            throw new Error('蛇撞墙了')
        }
        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHeadBody()
    }

    set Y(value:number){
        if(this.Y === value){
            return
        }
        //不允许掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop ===value){
            if(value > this.Y){
                value = this.Y -10
                console.log(value)
            }else{
                value = this.Y + 10
            }
        }
        //判断蛇是否到画布边缘
        if(value > 290 || value < 0){
            throw new Error('蛇撞墙了')
        }
        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }
    //添加身体
    addBody(){
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
        this.moveBody()
    }
    //移动身体
    moveBody(){
        //将后段身体设置为前一段的身体
        for(let i = this.bodies.length - 1; i > 0; i--){
            let X =(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y =(this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    checkHeadBody(){
        for(let i = 1; i<this.bodies.length; i++){
            let bd = this.bodies[i]
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop ){
                //说明蛇头撞到身体
                throw new Error('撞到自己了')
            }
        }
    }
}
export default Snake