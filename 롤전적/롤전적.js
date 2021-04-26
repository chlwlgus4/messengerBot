const scriptName = "롤전적";
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
  try {//예외처리
        if(msg.indexOf("/롤전적") > -1)  {//메세지가 롤전적일때
          var u = Utils.getWebText("http://www.op.gg/summoner/userName="+msg.substr(4));//변수 u는 이링크를 HTML파싱한 값이다
          const t = u.split("<div class=\"Tier\">")[1].split('<')[0].trim()
          let w = u.split("<span class=\"Wins\">")[1].split('<')[0].trim()
          w = w.substr(0, w.length-1)+'승';
          let l = u.split("<span class=\"Losses\">")[1].split('<')[0].trim()
          l = l.substr(0, l.length-1)+'패';
          const wr = u.split("<span class=\"Ratio\">")[1].split('<')[0].trim();
          
          
          replier.reply(msg.substr(4).trim() 
                                      + '님의 롤 전적 검색결과' 
                                      + '\n티어 : ' + t
                                      + '\n승리 : ' + w
                                      + '\n패배 : ' + l
                                      + '\n승률 : ' + wr );
       }
  } catch(e) {
      replier.reply('롤전적 정보가 없습니다.');
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