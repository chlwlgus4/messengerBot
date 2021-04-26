const scriptName = "욕관리";
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


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    const ablfile = FileStream.read(sdcard + "/욕설/욕리스트.txt");
    let list = ablfile.trim().split(' ');
    if (msg.startsWith('/비속어 등록')) {
        const text = msg.substr(8).replace(/ /g, '');
        if (list.indexOf(text) > -1) {
            replier.reply('존재하는 비속어입니다.');
        } else {
            FileStream.append(sdcard + "/욕설/욕리스트.txt", ' ' + text);
            replier.reply(msg.substr(7) + '가 비속어로 등록 되었습니다.');
        }
    }

    if (msg.startsWith('/비속어 제거')) {
        const delText = msg.substr(8).replace(/ /g, '');
        const delList = list.filter(data => data != delText)
        try {
            FileStream.write(sdcard + "/욕설/욕리스트.txt", ' ' + delList.join(' '));
            replier.reply(msg.substr(8) + ' 제거 되었습니다.');
        } catch (e) {

        }
    }

    if (msg == '/비속어 리스트') {
        replier.reply('비속어 리스트\n' + list.join('\n').trim());
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