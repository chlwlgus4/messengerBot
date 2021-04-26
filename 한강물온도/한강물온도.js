const scriptName = "한강물온도";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function response(room, msg, sender, isGroupChat, replier, ImageDB) { 
  if (msg.replace(/ /g, '').indexOf("한강물") > -1){ 
    let temp = JSON.parse(Utils.getWebText("https://api.qwer.pw/request/hangang_temp?apikey=guest").replace(/<[^>]+>/g, "").trim())[1]; 
    
    try {
      temp = temp.respond;
      var time = temp.year + '년' + temp.month + '월' + temp.day + '일' + temp.time + '시';;
      replier.reply("현재 한강 수온은 " + temp.temp + "℃입니다." + "\n" + temp.location +'에서 ' + time + '에 측정된 자료입니다.' ); 
    } catch(e) { 
      replier.reply("현재 한강 수온을 가져오지 못했습니다. 잠시 후 다시 시도해주세요."); 
    } 
  } 
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}