$(function (){
  $(document).ready(function(){showImg();});
  var ew='',    // 宽
      ow='',
      edis='',   // 第n+1张偶数图的垂直距离
      odis='',    // 奇数图的垂直距离
      bw='';    // 重叠部分宽
  evenImg(100,64,14);
  oddImg(51,123,15);
});

function showImg(){
  var t='',
      s=0;
  $('.main div').each(function(){
    var num = $(this).index();
    num%2==1?t=50:t=150;
    setTimeout(function(){
      $('.img'+num).fadeIn();
    },s+=t);
    console.log(s)
  });
}

function evenImg(ew,edis,bw){
  var n='',
      left='',
      arr=[],
      isInArray='';
  $('.main div:even').each(function(){    // 第偶数个
    $(this).width(ew);
    n = $(this).index();
    isInArray = $.inArray($(this),arr);
    if(isInArray<0){
      arr.push($(this));
    }
    $.each(arr,function(k,v){
      if(k%2==1){
        arr[k].css('top',edis);
      }
    });
    if(n>0){
      n=parseInt(n)/2;
    }
    left = ew*1.5*n-2*n*bw;    // 第偶数个图片 到 第0个图片的左边框 的 左边距 （- 初始n个重叠）：如果需要减去
    $(this).css('left',left);

  });
}

function oddImg(ow,odis,bw){
  var n='',
      l='',
      ew='',
      arr=[],
      isInArray='',
      left='',
      top='';
  $('.main div:odd').each(function(){    // 第奇数个
    ew = $('.main div:even').width();
    $(this).width(ow);
    n = $(this).index();
    isInArray = $.inArray($(this),arr);
    if(isInArray<0){
      arr.push($(this));    // 奇数个图片组成的数组
    }
    $.each(arr,function(k,v){    // k:arr中奇数图的索引
      l = Number(arr.length);    // 奇数图的个数
      left = ew*l+ow*k-n*bw;    // 第奇数个图片离第0个图片左边框的距离 ＝ l个偶数图宽 ＋ k个奇数图宽 （- n个重叠宽）
    });
    $(this).css('left',left);
    $(this).css('top',odis);
  });
}
