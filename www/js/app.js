// (1) APIキー
/** アプリケーションキーをかmBaaSからコピーして書き換えてください **/
var YOUR_APP_KEY = "YOUR_NCMB_APP_KEY";

/** クライアントキーをかmBaaSからコピーして書き換えてください **/
var YOUR_CLIENT_KEY = "YOUR_NCMB_CLIENT_KEY";

var ncmb;
var acce_array;
var flag;
var current;

$(function(){
    //(2) mbaaSの初期化
    /*****↓ここに記入*****/
    
    /*****↑ここに記入*****/
    
    acce_array = new Array();
    flag = new Boolean(false);

});

function start(){
    flag = true ; 
    // [1] 加速度センサーから値（x, y, z 軸方向に動く値）を取得する
    /*****↓ここに記入*****/
    
    /*****↑ここに記入*****/
    
    // [2] GPSセンサーから値（緯度経度）を取得する
    /*****↓ここに記入*****/
    
    /*****↑ここに記入*****/
}

function stop(){
    flag = false;
    save_ncmb(acce_array,current.geopoint.latitude,current.geopoint.longitude);
    document.js.x.value=null;
    document.js.y.value=null;
    document.js.z.value=null;
    document.js.lat.value=null;
    document.js.lng.value=null;
}

function save_ncmb(acce, lat, lng){
    // (3) データストアに保存用クラスを作成
    /*****↓ここに記入*****/
    
    /*****↑ここに記入*****/
    
    // (4) クラスのインスタンスを生成
    /*****↓ここに記入*****/
    
    /*****↑ここに記入*****/
    
    // (5) 位置情報オブジェクトを作成
    /*****↓ここに記入*****/
    
    /*****↑ここに記入*****/
    
    // (6) データの保存
    /*****↓ここに記入*****/
    
    /*****↑ここに記入*****/

}

// 加速度センサーから値の取得に成功した場合のコールバック
function onAcceSuccess(acceleration) {
    if(flag){
        document.js.x.value=acceleration.x;
        document.js.y.value=acceleration.y;
        document.js.z.value=acceleration.z;
        var acce = [acceleration.x,acceleration.y,acceleration.z];
        acce_array.push(acce);
    }
};

// 加速度センサーから値の取得に失敗した場合のコールバック
function onAcceError() {
    console.log('onAcceError!');
};
// 加速度センサーから値をする時に設定するオプション
var acceOptions = {
    // 取得する間隔を１秒に設定
    frequency: 1000
}; 

//位置情報取得に成功した場合のコールバック
var onGeoSuccess = function(position){
    if(flag){
    current = new CurrentPoint();
    //検索範囲の半径を保持する
    current.distance = CurrentPoint.distance;
    //位置情報(座標)を保存する
    current.geopoint = position.coords;
    document.js.lat.value=current.geopoint.latitude;
    document.js.lng.value=current.geopoint.longitude;
    }
};

// 位置情報取得に失敗した場合のコールバック
var onGeoError = function(error){
    console.log("現在位置を取得できませんでした");
};

// 位置情報取得時に設定するオプション
var geoOption = {
    // 取得する間隔を１秒に設定
    frequency: 1000,
    // 6秒以内に取得できない場合はonGeoErrorコールバックに渡すよう設定
    timeout: 6000
};

// 現在地を保持するクラスを作成
function CurrentPoint(){
    // 端末の位置情報を保持する
    geopoint=null;
    // 位置情報検索に利用するための検索距離を指定する
    distance=0;
}