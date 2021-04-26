const scriptName = "관리";

/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

    if (sender == '나' && msg == '모찌 재부팅') {

        try {
            Api.off('모찌.js');
            Api.reload('모찌.js');
            Api.on('모찌.js');
            replier.reply('껐다 켰음');
        } catch (e) {
            replier.reply(e)
        }

    }

    if (msg == '모찌 사용법' || msg.replace(/ /g, '') == '모찌사용법') {
      var allsee = '\u200b'.repeat(500);
        replier.reply('++ 모찌 사용법 ++' + allsee +
              '@@코인이름' + '\n'
            + '/주식 [회사명]' + '\n'
            + '/메이플 [캐릭명]' + '\n'
            + '/롤전적 [닉네임]' + '\n'
            + '/학습수' + '\n'
            + '/자동학습목록' + '\n'
            + '/학습목록' + '\n'
            + '/가르치기 가르칠말=답' + '\n'
            + '/학습제거 [가르친말]' + '\n'
            + '/내 비속어' + '\n'
            + '/비속어 등록 [비속어]' + '\n'
            + '/비속어 제거 [비속어]' + '\n'
            + '/비속어 리스트'
        )
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