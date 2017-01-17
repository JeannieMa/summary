
$(function (){
  // 圆锥：以累计椭圆轨迹堆积成圆锥
  var x,    //底面圆心xxx
      y,    //底面圆心y
      R,    //椭圆R
      r,    //椭圆r
      a=0,
      h;    // a 百分比  h 圆椎高+圆心道y＝0的距离
      h=2*R-y;  // 所填变量只要满足h1=2R
  var canvas = $("#myCanvas"),
      ctx = canvas.get(0).getContext('2d');
      moving(ctx,200,50,180,20,a,500);
      drawcone(ctx,200,50,180,20,500);

      // 正三角形
  var canvas = $("#theCanvas"),
      content = canvas.get(0).getContext('2d'),
      height =200*Math.sin(Math.PI/3),   // //计算边为l的正三角形的高
      y = '';
      growing(content,height,y);
});
function drawcone(ctx,x,y,R,r,h){
  $(document).ready(function(){
    // ie浏览器判断
    if (CanvasRenderingContext2D.prototype.ellipse == undefined) {
    CanvasRenderingContext2D.prototype.ellipse = function(x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
      this.save();
      this.translate(x, y);
      this.rotate(rotation);
      this.scale(radiusX, radiusY);
      this.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
      this.restore();
    }
  }
      // 圆椎外形
      ctx.beginPath();
      ctx.ellipse(x, y, R, r, 0, 0, 2*Math.PI, true);
      ctx.closePath();
      ctx.stroke();
      ctx.moveTo(x-R,y);
      ctx.lineTo(x,h+y);
      ctx.moveTo(x+R,y);
      ctx.lineTo(x,h+y);
      ctx.stroke();

  });
}

function moving(ctx,x,y,R,r,a,h){
  $('input[name="persentage"]').on('change',function(){
      a=$(this).val();
      var b=parseInt(a*1000);
      ctx.clearRect(0,0,2*x,h+R);  // 清除之前的圆锥
      //drawcone(ctx,x,y,R,r);    // 重画外形
      var i=0;
      if(i<=b){
      var t = setInterval(function (){
          ctx.fillStyle="rgb(245,192,75)";    // bodyColor
          ctx.beginPath();
          ctx.ellipse(x, h+r-(i/1000)*h, (i/1000)*R, (i/1000)*r, 0, 0, 2*Math.PI, true);     // a％的椭圆
          ctx.closePath();
          ctx.fill();
          if(i==b){
            ctx.fillStyle="rgb(245,155,37)";
            ctx.beginPath();
            ctx.ellipse(x, h+r-a*h, a*R, a*r, 0, 0, 2*Math.PI, true);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
          }
          ++i;

          if(i>b){
            clearInterval(t);
          }
        },5);
      }

        // if(a>0.82){
        //   ctx.beginPath();
        //   ctx.ellipse(x, y, R, r, 0, 0, 2*Math.PI, true); // 圆锥地面仍显示外面框
        //   ctx.closePath();
        //   ctx.stroke();
        // }
    });

}

function drawRect(content,height,y){
  $(document).ready(function (){
    content.fillStyle='#00ff00';//以纯色绿色填充
    content.beginPath();
    content.moveTo(0,height);
    content.lineTo(100,y);
    content.lineTo(100,height);
    content.closePath();
    content.fill();
    content.fillStyle='#ff0000';
    content.beginPath();
    content.moveTo(200,height);
    content.lineTo(100,y);
    content.lineTo(100,height);
    content.closePath();
    content.fill(); //闭合形状并且以填充方式绘制出来
  });
}

function growing(content,height,y){
  $('input[name="persentageRect"]').on('change',function(){
    var b = $(this).val();
    var i=0;
    if(i<=b*100){
      var t = setInterval(function (){
        y = height - (i/100)*height;
        console.log(height);
        console.log(y);
        content.clearRect(0,0,200,200);
        drawRect(content,height,y);
        ++i;
        if(i>b*100){
          clearInterval(t);
        }
      },80);
    }
  });
}
