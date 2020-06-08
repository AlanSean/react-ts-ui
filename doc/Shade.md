# Shade


## shadowClass?: string
传class 来修改遮罩的样式

## animation?: string  

选择弹窗的动画过渡效果 |left|up|scales

right  从右到左，content容器会贴到最右边并且高度是一屏
left  从左到右，content容器会贴到最左边并且高度是一屏
up  从下半到中间
bottom 从底部到贴低
scale  从小到大

isShow: boolean // true显示 false隐藏

hide?: () => void;
