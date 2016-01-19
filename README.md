# 【IoT入門】スマホで加速度センサーと位置情報を取得してクラウドに保存しよう！！
![概要図](readme-img/overview.PNG)

## 概要
### マイコンとかセンサとかよく分からなくても楽しめるIoTを目指して・・・
最近ニフティクラウドmobile backendのハンズオンでIoTを扱うことが増えており、マイコン(Raspberry piやEdison)の使用したハンズオン検討していましたが難易度が高すぎ、初心者の方がついてこれなさそうで困っていました。
「マイコンやGPIOの配線などなど、電子工作と縁遠い人でもIoTを身近に感じ楽しめる内容を・・・」と考えたところ、多くの人が持っているスマホの「センサ」の値をクラウドに保存するコンテンツがよいのではないかと思いつき、今回のコンテンツを作りました。
内容をなるべく簡単にするため「HTML5」と「JavaScript」でスマホアプリの開発ができる「Monaca」を利用し「Andoridユーザー」でも「iPhoneユーザー」でも楽しめる内容としました。

## 事前準備
* [ニフティクラウドmobile backend](http://mb.cloud.nifty.com/?utm_source=community&utm_medium=referral&utm_campaign=sample_monaca_login_template)の準備
 * 利用登録
 * アプリの新規作成

* [Monaca](https://ja.monaca.io/) の準備
 * 利用登録
 * Monacaデバッガーのインストール
 * サンプルプロジェクトのインポート
　　※このページの「Download ZIP」を右クリックし、URLをコピー→Monacaで新規プロジェクトを作成時にインポートしてください。

 
 * [ニフティクラウドmobile backend](http://mb.cloud.nifty.com/?utm_source=community&utm_medium=referral&utm_campaign=sample_monaca_login_template)で新しいアプリを作成、APIキーの確認

 * 本ページ｢Download ZIP｣ボタンを右クリックしてサンプルプロジェクトURLをコピー→ [Monaca](https://ja.monaca.io/)にインポートし、プロジェクトを新規作成する。

## 作成手順
準備が整ったら、Monacaでプロジェクトを編集していきます。

### ・Cordvaプラグインを有効化する
* DeviceMotion : 加速度センサーを利用するためのプラグイン
* Geolocation : GPSセンサーを利用するためのプラグイン
* Splashscreen : スプラッシュスクリーンを利用するためのプラグイン

---------------------------------------
### ・ JavaScriptSDKの追加
 「設定」を選択→「JS/CSSコンポーネントの追加と削除…」を選択→検索欄に「NCMB」と入力して「検索」を押す→「追加」を押す

---------------------------------------
### ・js/app.js の編集
### ①加速度センサーとGPSセンサーにアクセスして値を取得する
・[1]～[2]の実装をしてください。

#### [1] 加速度センサーから値（x, y, z 軸方向に動く値）を取得する
        var watchId = navigator.accelerometer.watchAcceleration(onAcceSuccess, onAcceError, acceOptions);

#### [2] GPSセンサーから値（緯度経度）を取得する
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, geoOption);
        
---------------------------------------
### ②取得したデータをmBaaSに保存する
・ (1)～(6)の実装をしてください。

#### (1) APIキーの設定
mBaaSのコントロールパネルからアプリケーションキーとクライアントキーをコピーして貼り付けてください。

        var YOUR_APP_KEY = "ここにあなたのアプリケーションキーを入力してください";
        var YOUR_CLIENT_KEY = "ここにあなたのクライアントキーを入力してください";

#### (2) mBaaSの初期化

        ncmb = new NCMB(YOUR_APP_KEY,YOUR_CLIENT_KEY);

#### (3) データストアに保存用クラスを作成

        var Data = ncmb.DataStore("Data");

#### (4) クラスのインスタンスを生成
 
        var data = new Data();

#### (5) 位置情報オブジェクトを作成

        var geoPoint = new ncmb.GeoPoint(); // (0,0)で生成
        geoPoint.latitude = lat;
        geoPoint.longitude = lng;

#### (6) データの保存

        data.set("accelerometer", acce)  //[x, y, z]
            .set("point", geoPoint)      //[lat, lng]
            .save();

---------------------------------------
#### *コールバックとオプション メソッド* ［実装済み］

#### ・加速度センサーから値の取得に成功した場合のコールバック
        function onAcceSuccess(acceleration) {
            if(flag){
                document.js.x.value=acceleration.x;
                document.js.y.value=acceleration.y;
                document.js.z.value=acceleration.z;
                var acce = [acceleration.x,acceleration.y,acceleration.z];
                acce_array.push(acce);
            }
        };

#### ・加速度センサーから値の取得に失敗した場合のコールバック
        function onAcceError() {
            console.log('onAcceError!');
        };

#### ・加速度センサーから値をする時に設定するオプション
        var acceOptions = {
            // 取得する間隔を１秒に設定
            frequency: 1000
        }; 

#### ・位置情報取得に成功した場合のコールバック
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

#### ・位置情報取得に失敗した場合のコールバック
        var onGeoError = function(error){
            console.log("現在位置を取得できませんでした");
        };

#### ・位置情報取得時に設定するオプション
        var geoOption = {
            // 取得する間隔を１秒に設定
            frequency: 1000,
            // 6秒以内に取得できない場合はonGeoErrorコールバックに渡すよう設定
            timeout: 6000
        };

#### ・現在地を保持するクラスを作成
        function CurrentPoint(){
            // 端末の位置情報を保持する
            geopoint=null;
            // 位置情報検索に利用するための検索距離を指定する
           distance=0;
        }

---------------------------------------
### ・動作確認
* Monacaデバッガーを使って動作確してください。
* Startボタンを押すと加速度センサー、GPSセンサーから値を取得し画面に表示します。
* Stopボタンを押すとセンサー値がmBaaSに保存されます。
* mBaaSのダッシュボードより、｢データストア｣を選択すると、新たに｢Data｣クラスが作られています。｢Data｣クラスを選択すると保存されたデータを確認できます。





