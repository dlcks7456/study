$(function(){
    $(".phone-number-check").on('keydown', function(e){
       // 숫자만 입력받기
        var trans_num = $(this).val().replace(/-/gi,'');
      	var k = e.keyCode;

      	if(trans_num.length >= 11 && ((k >= 48 && k <=126) || (k >= 12592 && k <= 12687 || k==32 || k==229 || (k>=45032 && k<=55203)) ))
      	{
        	    e.preventDefault();
      	}
          }).on('blur', function(){ // 포커스를 잃었을때 실행합니다.
              if($(this).val() == '') return;

              // 기존 번호에서 - 를 삭제합니다.
              var trans_num = $(this).val().replace(/-/gi,'');

              // 입력값이 있을때만 실행합니다.
              if(trans_num != null && trans_num != '')
              {
                  // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.
                  if(trans_num.length==11 || trans_num.length==10)
                  {
                      // 유효성 체크
                      var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
                      if(regExp_ctn.test(trans_num))
                      {
                          // 유효성 체크에 성공하면 하이픈을 넣고 값을 바꿔줍니다.
                          trans_num = trans_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1$2$3");
                          $(this).val(trans_num);
                      }
                      else
                      {
                          alert("유효하지 않은 전화번호 입니다.");
                          $(this).val("");
                          $(this).focus();
                      }
                  }
                  else
                  {
                      alert("유효하지 않은 전화번호 입니다.");
                      $(this).val("");
                      $(this).focus();
                  }
            }
        });
});


function Request(){
    var requestParam ="";

	//getParameter Æa¼C
	this.getParameter = function(param){
        var url = unescape(location.href);
        var paramArr = (url.substring(url.indexOf("?")+1,url.length)).split("&");

        for(var i = 0 ; i < paramArr.length ; i++){
           var temp = paramArr[i].split("="); //ÆA¶o¹IAI º?¼o¸iA≫ ´aA½

           if(temp[0].toUpperCase() == param.toUpperCase()){
             requestParam = paramArr[i].split("=")[1];
             break;
           }
        }
        return requestParam;
    }
}

function getpid(){
	var url = unescape(location.href);
	var pid = url.split("/").reverse();
	return pid[1];
}


function LoginOK(f){
	if(f.UID.value==""){
	  //ID Check error msg
		alert("ID를 입력해주세요");
		f.UID.focus;
	}else{ //추가적인 validate는 else if 로 추가
 		var request = new Request();
    //list = 1 디폴트
		f.list.value = request.getParameter("list")=='' ? 1 : request.getParameter("list") ;


    //리다이렉트할 링크 (별도 수정 안해도됨)
		f.action = "https://pacific.surveys.nielseniq.com/survey/selfserve/548/"+getpid();
		f.submit();
	}
}

function rangechk(value,errclass){
  if( !(value>=0 && value<=99) ){
    $(errclass).show();
  }else{
    $(errclass).hide();
  }
}
