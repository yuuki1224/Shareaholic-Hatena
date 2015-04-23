jQuery(document).ready(function($){

	//----------------------------
	//はてなシェアボタンを追加
	//----------------------------
	$.fn.shareaholicHatena = function(options){

		//モバイル端末判定
		var is_mobile = false;
		var ua = navigator.userAgent;
		if(ua.indexOf('iPhone')>-1 || ua.indexOf('iPod')>-1 || ua.indexOf('iPad')>-1 || ua.indexOf('Android')>-1){
			is_mobile = true;
		}
	
		var interval = setInterval(checkReady, 500);

		function checkReady(){			
			//シェアボタンの背景画像が設定されたかの確認
			var iconImage = $('i.shareaholic-service-icon').css('background-image');
			if( iconImage.length && iconImage != 'none' ){

				//確認処理の終了
				clearInterval(interval);

				$('.shareaholic-canvas').each(function(){
					if (this.getAttribute('data-app') == 'share_buttons') {
						//ボタン種類の取得
						var filename = $('li:first-child i', this).css('background-image').split('/').pop().split('.').shift();

						//はてなボタン画像の設定
						imgUrl = options.themePath + '/images/hatena-' + filename + '.png';

						//はてなボタンの追加
						$('.shareaholic-share-buttons',this).prepend('<li title="hatena" class="shareaholic-share-button"><div class="shareaholic-share-button-container"><span class="share-button-counter">0</span><a href="http://b.hatena.ne.jp/bookmarklet?url='+location.href+'" target="_blank"><i class="shareaholic-service-icon service-hatena" style="background-image:url('+imgUrl+');"></i><span class="share-button-verb"><b>Share</b></span></a></div></li>');
					}
				});

				//カウント数を追加
				var count;
				$.ajax({
					url:'http://api.b.st-hatena.com/entry.count?url=' + encodeURI(location.href),
					dataType:"jsonp",
					success:function(count){
						//カウントが0でない場合
						if(count != ''){
							$('.shareaholic-share-button[title=hatena]').addClass('has-shares');
							$('.shareaholic-share-button[title=hatena] .share-button-counter').text(count);
						}
					},
					error:function(){ return false; },
					complete:function(){ return false; }
				});

				//PC表示時には別ウィンドウで開く
				if(!is_mobile){
					$('.shareaholic-share-button[title=hatena] a').on('click', function(){
						window.open('http://b.hatena.ne.jp/bookmarklet?url='+location.href+'&btitle='+document.title, '', 'width=800, height=600,  left=50, top=50, menubar=no, toolbar=no, scrollbars=yes');
						return false;
					});
				}

			}
		}
	}

});
