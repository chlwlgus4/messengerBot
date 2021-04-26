const scriptName = "모찌봇";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

var ch = 0;
var premsg;
var msgroom;
var sen;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
        
    //var img = java.lang.String(ImageDB.getProfileImage()).hashCode();
    var pro = Math.floor(Math.random() * 1);
    var pro2 = Math.floor(Math.random() * 2);

    var getdbroomlist = DataBase.getDataBase("autoreply/getdbroom");
    var outdbroomlist = DataBase.getDataBase("autoreply/outdbroom");

    var testString = /\W/;

    var d = new Date();
    var time = d.getTime();
   
    var dbtime = DataBase.getDataBase("autoreply/time");
    var blacklist = ["이모티콘을 보냈습니다", "사진을 보냈습니다", "동영상을 보냈습니다", "은빛아"];



    if(sender == '청산당해따' || sender == '나') {
    
    if (msg == "/셋") {
        Log.d('setdbroom : ' + room);
        DataBase.setDataBase("autoreply/getdbroom", "roomlist");
        DataBase.setDataBase("autoreply/outdbroom", "roomlist");
        replier.reply("setdbroom");
    }
    
    if (msg == "/겟") {
        if (getdbroomlist == null) {
          Log.d('getdbroom : ' + room);
            DataBase.setDataBase("autoreply/getdbroom", room);
        } else {
                    Log.d('getdbroom : ' + room);
            DataBase.setDataBase("autoreply/getdbroom", getdbroomlist + room);
        }
        replier.reply("append " + room);
    }

    if (msg == "/removegetdbroom") {
        Log.d('removegetdbroom : ' + room);
        DataBase.setDataBase("autoreply/getdbroom", getdbroomlist.replace(room, ""));
        replier.reply("remove " + room);
    }

    if (msg == "/셋트") {
                Log.d('setdbtestroom : ' + room);
        DataBase.appendDataBase("autoreply/outdbroom", room);
        replier.reply("Out-of-office reply function is active.");
    }
    }

    if (msg && ch == 0 && msg.length < 30 && pro == 0 && getdbroomlist.indexOf(room) != -1 && blacklist.indexOf(msg) == -1) {
        if (msg.indexOf("/") == -1 && msg.indexOf(".") == -1) {
            premsg = msg;
            ch = 1;
            msgroom = room;
        }
        sen = sender;
        DataBase.setDataBase("autoreply/time", time);
    }

    if (msg != premsg && ch == 1 && msg.length < 20 && pro == 0 && getdbroomlist.indexOf(room) != -1 && sen == sender && blacklist.indexOf(msg) == -1 && msg.indexOf('@@') > -1) {
        msg = msg.trim();
        if (msg.indexOf("/") == -1 && msg.indexOf(".") == -1) {
            premsg = msg;
            msgroom = room;
            DataBase.setDataBase("autoreply/time", time);
        }
        sen = sender;
    }

    if (msg && ch == 1 && time - dbtime > 100000 && time != 0) {
        ch = 0;
        premsg = "";
        msgroom = "";
        DataBase.setDataBase("autoreply/time", 0);
    }

    if (msg.indexOf("/") == -1 && msg.indexOf(".") == -1 && msg.indexOf(":") == -1 && msg.indexOf("#") == -1 && msg.indexOf("%") == -1) {
        if (msg != premsg && sen != sender && ch == 1 && msg.length < 20 && msgroom == room && msg.indexOf("/") == -1 && msg.indexOf(".") == -1 && blacklist.indexOf(msg) == -1 && msg.indexOf('@@') > -1) {
            var getdb = DataBase.getDataBase("autoreply/Dblist/" + premsg);
            
            if (getdb == null) {
              Log.d('premsg : ' + premsg + 'msg : ' + msg)
                DataBase.setDataBase("autoreply/Dblist/" + premsg, msg);
            } else {
                DataBase.setDataBase("autoreply/Dblist/" + premsg, getdb + "\n" + msg);
            }
            ch = 0;
            premsg = "";
            msgroom = "";
        }
    }

    if (msg.indexOf("[") == -1 && msg.indexOf("/") == -1 && msg.indexOf(".") == -1 && msg.indexOf(":") == -1 && msg.indexOf("#") == -1 && msg.indexOf("%") == -1) {
      
        var getdb = DataBase.getDataBase("autoreply/Dblist/" + msg);
        if(getdb) {
            Log.d('getdb2 : ' + getdb + ' pro2 :' + pro2);          
        }

        if (getdb != null && pro2 == 0 && outdbroomlist.indexOf(room) != -1) {
            if (getdb.indexOf("\n") == -1) {
                replier.reply(getdb);
            } else {
                var num = getdb.match(/\n/g).length;
                var pro3 = Math.floor(Math.random() * num);
                replier.reply(getdb.split("\n")[pro3]);
            }
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