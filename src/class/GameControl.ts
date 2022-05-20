
import Food from './food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'
class GameControl{
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    title:HTMLElement
    restart:HTMLElement
    start:HTMLElement
    direction : string = ''

    public isLive = true

    constructor(){
        this.title = (document.getElementById('title') as HTMLElement)
        this.restart = document.querySelectorAll('button')[0]
        this.start = document.querySelectorAll('button')[1]
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
        this.checkRestart()
    }
    //初始化方法
    init(){
        document.addEventListener('keydown',this.keyDownHandler.bind(this))
        this.run()
        //默认重新开始按钮隐藏
        this.restart.hidden = true
        //默认隐藏开始按钮
        this.start.hidden = true
    }

    //键盘响应函数
    keyDownHandler(event:KeyboardEvent){
        this.direction = event.key
        this.title.innerText = '游戏开始'
    }

    //控制蛇移动方法
    run(){
         let X = this.snake.X
         let Y = this.snake.Y
         console.log('run()运行中')
         switch(this.direction){
             case "ArrowUp":
                 Y -= 10
                 break;
            case "ArrowDown":
                Y += 10
                break;
            case "ArrowLeft":
                X -= 10
                break;
            case "ArrowRight":
                X += 10
                break;
         }

        if(this.isLive){
            const timer = setTimeout(this.run.bind(this), 300 - (this.scorePanel.level -1) * 30);
            //撞墙检测
            try{
                this.snake.X = X
                this.snake.Y = Y
            }catch{
                alert("游戏结束了")
                this.title.innerText = '游戏结束了'
                clearTimeout(timer)
                this.isLive = false
                this.restart.hidden = false
                this.start.hidden = false
            }
            //吃到食物触发事件
            this.checkEat(X,Y)
        }

    }

    //判断蛇是否吃到了食物
    checkEat(X:number,Y:number){
        if(X === this.food.X && Y === this.food.Y){
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
    //判断是否需要重新开始游戏
    checkRestart(){
        this.restart.addEventListener('click',()=>{
            this.title.innerText = '点击↑↓←→任意一个后并点击开始按钮重新开始游戏'
            //恢复蛇坐标
            this.snake.X = 0
            this.snake.Y = 0
            this.isLive = true
            //恢复等级和分数
            this.scorePanel.level = 1
            this.scorePanel.levelEle.innerHTML = this.scorePanel.level + ''
            this.scorePanel.score = 0
            this.scorePanel.scoreEle.innerHTML = this.scorePanel.score + ''
            //恢复蛇长度
            for(let i = this.snake.bodies.length - 1; i > 0; i--){
                this.snake.bodies[i].remove()
            }
        })
        this.start.addEventListener('click',()=>{
            this.run()
        })
    }
}
export default GameControl