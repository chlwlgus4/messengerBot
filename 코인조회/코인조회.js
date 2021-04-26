const scriptName = "코인조회";
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

    if(msg.startsWith('@@')) {
    
    var searchCoinName = msg.substr(msg.indexOf("@@") + 2);
    
    try {
    var coinList = Utils.getWebText('https://api.upbit.com/v1/market/all?isDetails=false');

    coinList = JSON.parse(coinList.replace(/(<([^>]+)>)/ig, "").trim());

    var coinName = "";

    for (var i = 0; i < coinList.length; i++) {
      if (
        coinList[i].market.indexOf("KRW") > -1 &&
        coinList[i].korean_name == searchCoinName
      ) {
        coinName = coinList[i];
      }
    }

    var enName = coinName.market;
    var coinCurrentPrice = Utils.getWebText("https://api.upbit.com/v1/ticker?markets=" + enName);
    coinCurrentPrice = JSON.parse(coinCurrentPrice.replace(/(<([^>]+)>)/ig, "").trim());
    
    var price = "";
    
    if (coinCurrentPrice != null) {
      for (var i = 0; i < coinCurrentPrice.length; i++) {
        price = String(coinCurrentPrice[i].trade_price).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
      }
      replier.reply(searchCoinName + "의 현재 가격은 " + price + "원 입니다");
    }
    
  } catch(e) {
     replier.reply(searchCoinName + "같은건 없어")
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