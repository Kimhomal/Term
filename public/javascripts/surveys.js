$(document).ready(function() {
  //옵션 추가
  $(".panel-body").on("click","div[id^=optionline] > button.add-option",function(e) {
    var quesNum = $(e.currentTarget).parent().attr('id').substring(10);
    var $scripts = $("#optionline"+quesNum).children(".col-lg-12").eq(0).clone(); // 옵션 라인 부분을 복사
    var optionNum = $("#optionline"+quesNum).children(".col-lg-12").length; // 현재 옵션의 개수
    $scripts.find("input[type='text']").attr('id','option'+(parseInt(optionNum)+1)); //속성값 변경
    $scripts.find("input[type='text']").attr('placeholder','옵션'+(parseInt(optionNum)+1)); // 속성값 변경
    $("#optionline"+quesNum).append("<div class='col-lg-12'>"+$scripts.html()+"</div>"); // #optionline 밑에 옵션 추가
  });

  //옵션 삭제
  $(".panel-body").on("click","span.remove",function(e) {
    var quesNum = $(e.currentTarget).parent().parent().parent().attr('id').substring(10);
    var optionNum = $("#optionline"+quesNum).children(".col-lg-12").length; // 현재 옵션의 개수
    if(optionNum == 1){
      alert("1개 이하는 지울 수 없습니다!"); //옵션이 1개만 남았을 시 경고
      return;
    }
    var $option = $(e.currentTarget).parent().parent().parent(); //#optionline 선택
    $(e.currentTarget).parent().parent().remove(); // target 삭제
    var $children = $option.children(".col-lg-12"); // option들 전부 선택
    $children.each(function(idx, el) {
      $(el).find("input[type='text']").attr('id','option'+(parseInt(idx)+1)); // 속성값 재설정
      $(el).find("input[type='text']").attr('placeholder','옵션'+(parseInt(idx)+1)); // 속성값 재설정
    });
  });

  // 질문 추가
  $("section.options").on("click","a.quesAdd",function() {
    var $scripts = $("#optionline1").children(".col-lg-12").eq(0).clone();
    var quesNum = $(".panel-body").children("div[id^=optionline]").length; //질문의 개수
    var inputTag = "<input type='text' class='form-control' placeholder='질문을 입력하세요.' id='question-title"+(parseInt(quesNum)+1)+"'>";
    $(".panel-body").append("<hr/>");
    $(".panel-body").append(inputTag+"<div class='row' id='optionline"+(parseInt(quesNum)+1)
    +"'><div class='col-lg-12'>"+$scripts.html()+"</div></div>");
    $("#optionline"+(parseInt(quesNum)+1)).prepend("<button type='button' class='add-option btn btn-default'>옵션추가</button>");
  });
});
