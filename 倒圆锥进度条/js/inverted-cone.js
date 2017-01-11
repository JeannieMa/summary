$(function (){
  // 圆锥
  var x,    //底面圆心xxx
      y,    //底面圆心y
      R,    //椭圆R
      r,    //椭圆r
      a=0,
      h;    // a 百分比  h 圆椎高+圆心道y＝0的距离
      h=2*R-y;  // 所填变量只要满足h1=2R
  var canvas = $("#myCanvas"),
      ctx = canvas.get(0).getContext('2d');
      moving(ctx,200,150,180,20,a,210);
      drawcone(ctx,200,150,180,20);

      // 正三角形
  var canvas = $("#theCanvas"),
      content = canvas.get(0).getContext('2d'),
      height =200*Math.sin(Math.PI/3),   // //计算边为l的正三角形的高
      y = '';
      //drawRect(content,height);
      growing(content,height,y);
});
function drawcone(ctx,x,y,R,r){
  $(document).ready(function(){
  //   if (CanvasRenderingContext2D.prototype.ellipse == undefined) {
  //   CanvasRenderingContext2D.prototype.ellipse = function(x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
  //     this.save();
  //     this.translate(x, y);
  //     this.rotate(rotation);
  //     this.scale(radiusX, radiusY);
  //     this.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
  //     this.restore();
  //   }
  // }
      // 圆椎外形
      ctx.beginPath();
      ctx.ellipse(x, y, R, r, 0, 0, 2*Math.PI, true);
      ctx.closePath();
      ctx.stroke();
      ctx.moveTo(r,y);
      ctx.lineTo(x,2*R);
      ctx.moveTo(r+2*R,y);
      ctx.lineTo(x,2*R);
      ctx.stroke();

  });
}

function moving(ctx,x,y,R,r,a,h){
  $('input[name="persentage"]').on('change',function(){
      a=$(this).val();
      ctx.clearRect(r,y-r,2*R,2*R);  // 清除之前的圆锥
      drawcone(ctx,x,y,R,r);    // 重画外形
      for(var i=0;i<=a*1000;i++){
          ctx.fillStyle="rgb(255,192,75)";
          ctx.beginPath();
          ctx.ellipse(x, 2*R-(i/1000)*h, (i/1000)*(R-1), (i/1000)*(r-1), 0, 0, 2*Math.PI, true);     // a％的椭圆
          ctx.closePath();
          ctx.fill();
      }

        ctx.strokeType="rgb(100,100,100)";
        ctx.fillStyle="rgb(245,155,37)";
        ctx.beginPath();
        ctx.ellipse(x, 2*R-a*h, a*R, a*r, 0, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        if(a>0.82){
          ctx.strokeType="rgb(0,0,0)";
          ctx.beginPath();
          ctx.ellipse(x, y, R, r, 0, 0, 2*Math.PI, true); // 圆锥地面仍显示外面框
          ctx.closePath();
          ctx.stroke();
        }
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
    // var grd = content.createLinearGradient(0,0,200,0);//使用渐变颜色填充,从(0,0)到(200,0) （左到右）
    // grd.addColorStop(0,"#4CE8B2"); //起始颜色
    // grd.addColorStop(1,"#EFD458"); //终点颜色
    // content.fillStyle=grd; //以上面定义的渐变填充
    content.closePath();
    content.fill(); //闭合形状并且以填充方式绘制出来
  });
}

function growing(content,height,y){
  $('input[name="persentageRect"]').on('change',function(){
    var b = $(this).val();
    y = height - b*height;
    content.clearRect(0,0,200,200);
    drawRect(content,height,y);
  });
}
