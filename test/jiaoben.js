/**
 * Created by 马柳菁 on 17/6/27.
 * named as 收款日历
 * 版权所有人：马柳菁；引用请著名出处
 */

$(function(){
	datePickerExtra();
}());
	/*页面加载时收款日历*/
	function datePickerExtra(){
			var mydate = new Date();
			$(".f-year").html( mydate.getFullYear() );
			$(".f-month").html( mydate.getMonth()+1 );
			showDate(mydate.getFullYear(),mydate.getMonth()+1);

//日历上一月
			$(".f-btn-jian ").click(function(){
					var mm = parseInt($(".f-month").html());
					var yy = parseInt($(".f-year").html());
					if( mm == 1){//返回12月
							$(".f-year").html(yy-1);
							$(".f-month").html(12);
							showDate(yy-1,12);
					}else{//上一月
							$(".f-month").html(mm-1);
							showDate(yy,mm-1);
					}
			})
//日历下一月
			$(".f-btn-jia").click(function(){
					var mm = parseInt($(".f-month").html());
					var yy = parseInt($(".f-year").html());

					if( mm == 12){//返回12月
							$(".f-year").html(yy+1);
							$(".f-month").html(1);
							showDate(yy+1,1);
					}else{//上一月
							$(".f-month").html(mm+1);
							showDate(yy,mm+1);
					}
			})
//返回本月
			$(".f-btn-fhby").click(function(){
					$(".f-year").html( mydate.getFullYear() );
					$(".f-month").html( mydate.getMonth()+1 );
					showDate(mydate.getFullYear(),mydate.getMonth()+1);
			})

//读取年月写入日历  重点算法!!!!!!!!!!!
			function showDate(yyyy,mm){
					var dd = new Date(parseInt(yyyy),parseInt(mm), 0);   //Wed Mar 31 00:00:00 UTC+0800 2010
					var daysCount = dd.getDate();            //本月天数
					var mystr ="";//写入代码
					var icon = "";//图标代码
					var week = new Date(parseInt(yyyy)+"/"+parseInt(mm)+"/"+1).getDay(); //今天周几
					var lastMonth; //上一月天数
					var nextMounth//下一月天数
					if(  parseInt(mm) ==1 ){
							lastMonth = new Date(parseInt(yyyy)-1,parseInt(12), 0).getDate();
					}else{
							lastMonth = new Date(parseInt(yyyy),parseInt(mm)-1, 0).getDate();
					}
					if( parseInt(mm) ==12 ){
							nextMounth = new Date(parseInt(yyyy)+1,parseInt(1), 0).getDate();
					}else{
							nextMounth = new Date(parseInt(yyyy),parseInt(mm)+1, 0).getDate();
					}
					for(i=0;i<daysCount;i++){
							//计算上月空格数
							if( i%7 == 0){
									if(i<7){//只执行一次
											for(j=0;j<week;j++){
													mystr += "<div class='f-td f-null' style='color:#ccc;'>"+(lastMonth+j-week+1)+"</div>";
											}
									}
							}
							//这里为一个单元格，添加内容在此
							mystr += "<div class='f-td f-number'><span class='f-day'>"+(i+1)+"</span></div>";

					}

					//表格不等高，只补充末行不足单元格
					if(7-(daysCount+week)%7 <7){
							for(k=0; k<7-(daysCount+week)%7;k++ ){ // week为今天周几 daysCount为本月天数  7-week为本行空格数 7-(daysCount+6-week)%7为最后一行有几个空格
									mystr += "<div class='f-td f-null' style='color:#ccc;'>"+(k+1)+"</div>";
							}
					}

					//写入日历
					$(".f-rili-table .f-tbody").html(mystr);
					//给今日加class
					if( mydate.getFullYear() == yyyy){
							if( (mydate.getMonth()+1 ) == mm){
									var today = mydate.getDate();
									$(".f-rili-table .f-td").eq(today-1+week).addClass("f-today").html("<span class='f-day'>今</span>");

							}
					}

					// 插入收款信息
					datePickerAjax(week);

					//绑定选择方法
					clickDate();

					//绑定查看方法
					tipsDate();


			}
			/*悬浮层*/
			function tipsDate(){
					var $obj = $(".f-rili-table .f-td");
					$obj.off("mouseover");
					$obj.on("mouseover",function(){
							if($(this).hasClass('f-hover')) {
									$(this).find(".f-table-msg").show();
									$(this).find(".f-yuan").show();
							}
					});
					$obj.off("mouseleave");
					$obj.on("mouseleave",function(){
							if($(this).hasClass('f-hover')) {
									$(this).parent().find(".f-table-msg").hide();
									$(this).parent().find(".f-yuan").hide();
							}
					});
			}
			/*所选日期待收数据*/
			function clickDate(){
					$(".f-rili-table .f-number").off("click");
					$(".f-rili-table .f-number").on("click",function(){
						if(!$(this).hasClass('f-on')){
							$(".f-rili-table .f-number").removeClass('f-on');6
							$(this).addClass('f-on');
						}
					});
			}
			/*日历中收款数据*/
			function datePickerAjax(week){
					var arrDateMore = [],
							arrDateSingle = [],
							htmlFront = '',
							html = '',
							red = '',
							grey = '',
							$obj = '',
							now = new Date(),
							getYear = $('.f-year').text(),
							getMonth = $('.f-month').text(),
							getDate = now.getDate(),
							planDate = '';
					var res = {
					  "status":1,
					  "msg":"\u64cd\u4f5c\u6210\u529f",
					  "data":[
					    {
					      "number":"1",
					      "sum":"9.44",
					      "status":"0",
					      "pay_plan_date":"2017-6-9"
					    },
					    {
					      "number":"1",
					      "sum":"19.44",
					      "status":"1",
					      "pay_plan_date":"2017-6-9"
					    },
					    {
					      "number":"1",
					      "sum":"23.44",
					      "status":"0",
					      "pay_plan_date":"2017-6-23"
					    }
					  ]
					};
						$.each(res.data,function(i,j){
								planDate = j.pay_plan_date.split('-');  // 日期['2017-6-1']转成['2017','6','1']
								if(planDate[1] == $('.f-month').text()){
									$obj = $(".f-rili-table .f-td").eq(planDate[2]-1+week);
									htmlFront = "<span class='f-day'>"+planDate[2]+"</span>";
									if(j.status == 1){
										html = "<div class='f-yuan'></div><div class='f-table-msg'>已收金额：<span class='major'> ¥ "+j.sum+"</span>已收笔数：<span>"+j.number+"</span></div>";
										$obj.addClass('f-hover').css('background','#e3e3e3').html(htmlFront + html);  // 有已收
									}else{
										html = "<div class='f-yuan'></div><div class='f-table-msg'>待收金额：<span class='major'> ¥ "+j.sum+"</span>待收笔数：<span>"+j.number+"</span></div>";
										$obj.addClass('f-hover').css('background','#f44c48').html(htmlFront + html);
									}
									if($.inArray(j.pay_plan_date,arrDateSingle)<0){
											arrDateSingle.push(j.pay_plan_date);
									}else{
										  arrDateMore.push(j.pay_plan_date);  //同一日期有多组数据
									}
								}else{
									return;
								}
							});

						$.each(arrDateMore,function(k,v){
								$.each(res.data,function(i,j){
										if(v==j.pay_plan_date){planDate = j.pay_plan_date.split('-');  // 日期['2017-6-1']转成['2017','6','1']
										$obj = $(".f-rili-table .f-td").eq(planDate[2]-1+week);
										htmlFront = "<span class='f-day'>"+planDate[2]+"</span>";
												if(j.status == 1){
													grey +=	"<p>已收金额：<span class='major'> ¥ "+j.sum+"</span>已收笔数：<span>"+j.number+"</span></p>"
												}else{
													red +=	"<p>待收金额：<span class='major'> ¥ "+j.sum+"</span>待收笔数：<span>"+j.number+"</span></p>"
												}
											}
									});
									html =	"<div class='f-yuan'></div><div class='f-table-msg'>"+red + grey +"</div>"
									if(red != ''){
										$obj.addClass('f-hover').css('background','#f44c48').html(htmlFront + html);
									}else{
										$obj.addClass('f-hover').css('background','#e3e3e3').html(htmlFront + html);
									}
						});
			}
	}
