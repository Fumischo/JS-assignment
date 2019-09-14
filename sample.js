$(document).ready(function(){  //No.1(HTMLが完全に読み込まれてからfunctionの中身を起動する。)
  function score_indicate(){
    // このような記述をすることで、subject_pointsという変数の中に
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]という配列を作成できる。
    let subject_points = [Number($('#national_language').val()), 
                          Number($('#english').val()), 
                          Number($('#mathematics').val()), 
                          Number($('#science').val()), 
                          Number($('#society').val()) 
                          ];
                          //No.5(取得した点数を数値に変換し処理している)

    // htmlのlavelidを記述をすることで、「合計点：」となっている右の部分に合計点が出力される
    let sum = subject_points[0]; 
    sum = sum + subject_points[1]; 
    sum = sum + subject_points[2]; 
    sum = sum + subject_points[3]; 
    sum = sum + subject_points[4]; 
    $("#sum_indicate").text(sum);   // No.6(IDが"sum_indicate"のlabelタグで囲った部分に5教科の合計点を追加している。) 

    
    let avg = (sum / subject_points.length); 
    $("#avarage_indicate").text(avg); 
    return avg; 
  };

  function get_achievement(){
    // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
    let score = score_indicate(); 
    if (score >= 80) {
      return "A"; 
    }
    else if (score >= 60) { 
      return "B"; 
    }
    else if (score >= 40) { 
      return "C"; 
    } else { 
      return "D"; 
    }
  };

  function get_pass_or_failure(){ 
    // ここに、全ての教科が60点以上なら"合格"の文字列、一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
    let subject_points = [Number($('#national_language').val()), //No.4 (IDが"national_language"の入力フォームの中のvalue値を取得)
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];
    let judge = "合格"; 
    for(let i=0; i<subject_points.length; i++){ 
      if (subject_points[i] < 60) { 
        judge = "不合格"; 
        return judge; 
      }
    }
    return judge; 
  };

  function judgement(){ 
    let achievement = get_achievement(); 
    let judgement = get_pass_or_failure(); 
    // ここに、「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する処理を書き込む
    $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${achievement}です。${judgement}です</label>`);
  };  // No.7(ID="declaration"のlabelタグで囲った部分に引数と内容を追加)
 
  $('#national_language, #english, #mathematics, #science, #society').change(function() {  
    score_indicate();   //No.3(5教科何れかの点数の入力フォームが変更された場合、処理が実行される)
  });

  $('#btn-evaluation').click(function() { 
    let lank = get_achievement(); 
    $("#evaluation").text(lank); 
  });

  $('#btn-judge').click(function() { //No.2(ランクボタンがクリックされたら処理が実行される。)
    let jdg = get_pass_or_failure(); 
    $("#judge").text(jdg);
  });

  $('#btn-declaration').click(function() {  
    $('#alert-indicate').remove(); 
    judgement(); //最終ジャッジ関数を実行。追加されている要素を削除することで重複を防ぐ
  });
});