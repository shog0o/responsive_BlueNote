$(document).ready(function() {


  var key, value;
  
  function getParams() {
    var url = decodeURIComponent(location.href);
    // 인코딩된 URL 디코딩함
    url = decodeURIComponent(url);  //  'ex1.html?num=1'

    var params='';
    params = url.substring( url.indexOf('?')+1, url.length );   
    key = params.split("=")[0];  //'num'
    value = params.split("=")[1];  // '1'
    value = Number(value); //숫자로 변환  1
  }  
  getParams();  //함수 호출함

  var screenSize, screenHeight; 

  function screen_size(){
      screenSize = $(window).width(); //화면 너비 확인함
      screenHeight = $(window).height();  //화면 높이 확인함

      $("#content").css('margin-top',screenHeight);
      
      if( screenSize > 768){ //일반 태블릿 이상 해상도 
          $("#imgBg").attr('src','./images/sub'+value+'_big.jpg');
      }else{ //소형태블릿 이하 해상도
          $("#imgBg").attr('src','./images/sub'+value+'_small.jpg');
      }
  }

  screen_size();  //최초 로딩 시 호출함
  
 $(window).resize(function(){ 
      screenSize = $(window).width(); //변경된 화면 너비 확인함 
      screen_size();
  }); 
  
  $('.down').click(function(e){
    e.preventDefault();
      screenHeight = $(window).height();
      $('html,body').animate({'scrollTop':screenHeight}, 1000);
  });
  
  
});