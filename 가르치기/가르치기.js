const scriptName = "가르치기";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
 
 
var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var folder = new java.io.File(sdcard + "/학습/");
folder.mkdirs();
//sd카드에 학습 폴더를 생성합니다
function save(folderName, fileName, str) {
  var c = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
  var d = new java.io.FileOutputStream(c);
  var e = new java.lang.String(str);
  d.write(e.getBytes());
  d.close();
}
function read(folderName, fileName) {
  //파일 읽기 함수 제작
  var b = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
  if (!b.exists()) return null; //만약 읽을 파일이 없다면 null 변환
  var c = new java.io.FileInputStream(b);
  var d = new java.io.InputStreamReader(c);
  var e = new java.io.BufferedReader(d);
  var f = e.readLine();
  var g = "";
  while ((g = e.readLine()) != null) {
    f += "\n" + g; //\ = 역슬래쉬 → 줄바꿈 표시
  }
  c.close();
  d.close();
  e.close();
  return f.toString(); //읽은 파일 내용을 반환
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (msg.indexOf("/가르치기") == 0) {
   //메세지가 /가르치기 라면
    var study0 = msg.substring(6, msg.length);
    //변수 study0은 /가르치기 다음으로 오는 메세지에 길이만큼 자릅니다
    var study1 = study0.split("=");
    //study1은 위에 study0을 "="기준으로 자릅니다
    var suy1 = study1[0];
    //suy1은 만약 "버구=짱짱" 에서 "="기준으로 0번째 버구로 지정합니다
    var suy2 = study1[1];
    //suy2은 만약 "버구=짱짱" 에서 "="기준으로 1번째 짱짱으로 지정합니다
    replier.reply(suy1 + "을(를) " + suy2 + "(으)로 배웠습니다.");
    //버구을 짱짱으로 배웠습니다 라고  뜹니다
    var folder = new java.io.File(sdcard + "/학습/");
    folder.mkdirs();
    //sd카드에 학습폴더를 생성해줍니다
    save("학습", suy1.trim() + ".txt", suy2);
    //학습폴더에 suy1변수에 공백을 제거에 txt로 저장하고 그내용은 suy2로 넣습니다
    //위에 설정한대로 봐주시면 버구가 txt파일이고 txt안에 내용은 짱짱이 됩니다
  }

  var talk = read("학습", msg + ".txt");
  //talk은 학습폴더에 메세지에 txt를 읽습니다
  if (talk !== null) {
    //만약 talk이 아무것도 동일하지 않은 유형이 아니라면
    replier.reply(talk);
    //메세지에 txt안에있는 내용을 보내줍니다
  }
  if (msg.indexOf("/학습목록") == 0) {
    const list = new java.io.File("sdcard/학습/").listFiles().join('\n');
    replier.reply('------- 학습중인 명령어 -------' + '\u200b'.repeat(500) + '\n' + list.replace(/sdcard\/학습\//g,'').replace(/\.txt/g,''));      
  }
  
  if (msg.indexOf("/학습제거") == 0) {
    
    if (msg.substr(6) === "all") {
      var deletelist = new java.io.File("sdcard/학습/").listFiles().join(',');
      Log.d(deletelist);
      deletelist = deletelist.split(',')
      for(let i = 0; i < deletelist.length; i++) {
       new java.io.File(deletelist[i]).delete();  
      }
      
      replier.reply("모든 학습내용을 제거했습니다!");
      
    } else {
      //메세지가 학습제거 라면
      replier.reply(msg.substr(6) + "의 학습내용 : " + read("학습", msg.substr(6) + ".txt"));
      
      // "/학습제거 버구"라면 학습폴더에 버구.txt에 내용을 읽습니다 만약 내용이 없다면 null로 반환됩니다
      new java.io.File("sdcard/학습/" + msg.substr(6) + ".txt").delete();
      
      // 학습폴더에 버구 .txt를 삭제합니다
      replier.reply(msg.substr(6) + " 학습내용을 제거했습니다!");
      //제거했다고 뜹니다
    }
  }
  
  if(msg == '/코인추천') {
    var coinList = Utils.getWebText('https://api.upbit.com/v1/market/all?isDetails=false');
    coinList = JSON.parse(coinList.replace(/(<([^>]+)>)/ig, "").trim());    
    var coinNum = Math.floor(Math.random() * coinList.length);
    
    replier.reply('빨리 사라 ' + coinList[coinNum].korean_name + ' 곧 떡상함!!');
          
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