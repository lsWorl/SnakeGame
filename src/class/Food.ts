import Snake from './Snake'
class Food{
    element:HTMLElement
    snake: Snake
    constructor(){
        this.snake = new Snake
        //加!表示元素不可能为空
        this.element = document.getElementById('food')!
        
    }

    //食物获取x轴坐标
    get X(){
        return this.element.offsetLeft
    }

    //食物获取y轴坐标
    get Y(){
        return this.element.offsetTop
    }

    //修改食物位置
    change(){
        this.changePlace()
        for(let i = 0; i<this.snake.bodies.length; i++){
            let bd = this.snake.bodies[i]
            if(this.X != bd.offsetLeft && this.Y != bd.offsetTop ){
                this.changePlace()
                console.log('不相同')
            }
        }
    }
    //修改食物坐标
    changePlace(){
        let x = Math.round(Math.random() * 29) * 10
        let y = Math.round(Math.random() * 29) * 10
        this.element.style.left = x + 'px'
        this.element.style.top = y + 'px'
    }
}


export default Food