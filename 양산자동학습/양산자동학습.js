const scriptName = "양산자동학습";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const preChat = {};
var file = new java.io.File(sdcard + "/자동학습/");
file.mkdirs();

var filter = ["이모티콘을 보냈습니다", "사진을 보냈습니다", "동영상을 보냈습니다"];

var preSender;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    //도배 방지
    if (preChat[room] == msg) return;
    const ablfile = FileStream.read(sdcard + "/욕설/욕리스트.txt");
    const ablList = ablfile.trim().split(' ');

    let filtermsg = ablList.filter((data) => msg.includes(data));
    if (filtermsg.length > 0 && !msg.startsWith('/')) {
        FileStream.append(sdcard + "/욕설/" + sender + ".txt", "\n" + msg);
        for (let i = 0; i < filtermsg.length; i++) {
            let abusive = "*" + filtermsg[i].substr(1);
            msg = msg.split(filtermsg[i]);
            msg = msg.join(abusive);
        }
        replier.reply(sender + "님이 " + msg + "라고 함");
    }

    if (msg == "/내 비속어") {
        try {
            var file = FileStream.read(sdcard + "/욕설/" + sender + ".txt");
            var text = file.trim().split("\n");

            replier.reply(sender + "님의 욕!" + file + "\n" + "총 " + text.length + "개의 욕을 했습니다.");
        } catch (e) {
            replier.reply("비속어를 사용하지 않았습니다.");
        }
    }

    //배운 채팅 수 확인
    if (msg == "/학습수") {
        var file = new java.io.File(sdcard + "/자동학습/");
        replier.reply("[자동학습] " + file.list().length + "개의 채팅을 배웠습니다.");
    }

    if (msg == "/자동학습목록") {
        var file = new java.io.File(sdcard + "/자동학습/");
        var allsee = "\u200b".repeat(500);
        replier.reply("[자동학습목록!]" + allsee + file.list().join("\n").replace(/.txt/g, ""));
    }

    //말하는 부분
    if (Math.floor(Math.random() * 3) == 0) {
        var chat = FileStream.read(sdcard + "/자동학습/" + msg + ".txt");
        if (chat != null) replier.reply("[모찌봇] " + chat);
    }

    //배우는 부분
    if (preChat[room] && msg && !msg.startsWith("@@") && filter.indexOf(msg) == -1 && filter.indexOf(preChat[room]) == -1 && !msg.startsWith("/")
        && !preChat[room].startsWith("/") && !preChat[room].startsWith("@@") && preSender != sender && !msg.startsWith("#") && !preChat[room].startsWith("#")
        && !preChat[room].startsWith("http") && msg.startsWith("http")
    ) {
        Log.d("preSender : " + preSender + "sender : " + sender);
        try {
            FileStream.write(sdcard + "/자동학습/" + preChat[room] + ".txt", msg);
        } catch (e) {
            Log.d(preChat[room] + " msg : " + msg + "\n" + e);
        }
    }

    //직전 채팅 저장 방지
    if (!msg.startsWith("*")) {
        preChat[room] = msg;
        preSender = sender;
    }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
    var textView = new android.widget.TextView(activity);
    textView.setText("Hello, World!");
    textView.setTextColor(android.graphics.Color.DKGRAY);
    activity.setContentView(textView);
}

function onStart(activity) {
}

function onResume(activity) {
}

function onPause(activity) {
}

function onStop(activity) {
}
