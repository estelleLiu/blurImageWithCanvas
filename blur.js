var canvasWidth = 800;
var canvasHeight = 600;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

//剪辑区域
//圆形
//var clippingRegion = {x:400,y:200,r:50};
//五角星形
var clippingRegion = {x:400,y:200,R:80,r:40,rot:0};
var image = new Image();
image.src = "image.jpg";
image.onload = function(e){
	initCanvas();
}

//初始化
function initCanvas(){
	clippingRegion = { x:Math.random()*640 + 80, y:Math.random()*440 + 80, R:0, r:0, rot:Math.random()*360 };
	//重置小图形展示动画
	var setAnimate = setInterval(function(){
		clippingRegion.R += 5;
		context.clearRect( 0, 0, canvas.width, canvas.height);
		draw( image );
		if( clippingRegion.R > 80){
			clearInterval(setAnimate);
		}
	}, 50)	

}

function setClippingRegion(){
	//圆形
	//context.arc( clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, false);
	//画五角星
	drawStar(context);
	context.clip();
}

function drawStar(context){
	var R = clippingRegion.R;
	var r = clippingRegion.R/2;
	var x = clippingRegion.x;
	var y = clippingRegion.y;
	var rot = clippingRegion.rot;
	context.beginPath();
	//绘制五角星
	for( var i=0; i<5; i++){
		context.lineTo( Math.cos(( 18 + 72 * i + rot )/180 * Math.PI )* R + x,  Math.sin(( 18 + 72 * i + rot )/180 * Math.PI )* R + y );
		context.lineTo( Math.cos(( 54 + 72 * i + rot )/180 * Math.PI )* r + x,  Math.sin(( 54 + 72 * i + rot )/180 * Math.PI )* r + y );
	}
	context.closePath();
}

function draw(image){
	context.save();
	//剪辑区域
	setClippingRegion();
	context.drawImage( image, 0, 0);
	context.restore();
}

function show(){
	// var theAnimation = setInterval(function(){
	// 	clippingRegion.r += 20;
	// 	draw(image, clippingRegion);
	// 	if(clippingRegion.r > 2*Math.max(canvas.width, canvas.height)){
	// 		clearInterval( theAnimation );
	// 	}
	// },30);

	var theAnimation = setInterval(function(){
		clippingRegion.R += 20;
		context.clearRect( 0, 0, canvas.width, canvas.height);
		draw(image);
		if(clippingRegion.R > 2*Math.max(canvas.width, canvas.height)){
			clearInterval( theAnimation );
		}
	},30);

}
//重置按钮
function reset(){
	canvas.removeEventListener('mousemove', gua);
	initCanvas();
}
//实现刮刮卡效果
function scratchCards(){
	canvas.addEventListener('mousemove', gua,false);		
}

function gua(e){
	//获取canvas相对document的坐标
	var bbox = canvas.getBoundingClientRect();
	console.log("x:"+e.pageX+"=====y:"+e.pageY+"     newX:"+ (e.pageX-bbox.left) +"=======newY:"+ (e.pageY-bbox.top));
	clippingRegion = { x : e.pageX-bbox.left, y : e.pageY-bbox.top, R:80, r:40, rot : Math.random()*360 };
	draw( image );
}

