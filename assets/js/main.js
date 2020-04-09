$(document).ready(function () {


    $('.inner-box').hover(function () {
      var this_box_color = $(this).css('border-color');
      $(this).css({ 'background-color': this_box_color, 'opacity': 0.3 });
    },
    function () {
      $(this).css({ 'background-color': '', 'opacity': 1 });
    });

    $('.inner-box').mousedown(function () {
      $(this).css({ 'background-color': $(this).css('border-color'), 'opacity': 1 });
    })

    $('.inner-box').mouseup(function (e) {
      $(this).css({ 'background-color': '' });
    })

    $('#review-btn').click(function(){
      $('.review-box').slideToggle(500);
    })
    

    $('.inner-box').click(function (e) {
      var this_box = e.target;
      var box_index = $(this_box).attr('data-index');
      const sound = new Audio(`assets/audios/sound-${box_index}.wav`);
      if (sound.paused) {
        sound.play();
      }
      else {
        sound.currentTime = 0;
      }
    }); 


    function generateRandomNumbers(size) {
      var rand_num_list = [];
      while (rand_num_list.length != size) {
        var randomNumber = Math.floor(Math.random() * 4) + 1;
        rand_num_list.push(randomNumber);
      }
      return rand_num_list;
    }

    function generateStepBoxs (size) {
      var sub_step_list = $('.sub-steps-box').html('');
      var sub_step_arr = [];
      for (var j=0; j<size; j++){
        var step_box = $('<div></div>')
        sub_step_arr.push(step_box)
        sub_step_list.append(step_box)
      }
      return sub_step_arr;
    }

    $('#startGame').click(function(){
      
      $('.start-block').hide(500)
      $('.came-back-btn').show(500)
      $('.game-mode-block').show(500);
      
    });
     

    var level_block = $('.level-block');
    var level_item_list = $(level_block).children('.level-item')
    var line_list = $('.level-block').children('.line')

    var level_count = 1;
    $('.level-circle').text(level_count);
    $(level_item_list[level_count-1]).css({'background-color' : 'rgba(255, 251, 0,0.5)' })
    
    var cube_restart_btn = $('#cube-restart');
    var clicked_box_index_list = [];
    var i = 0;
    var count = 0;
    var level_score = 0;
    var level_count = 1;

    $('#easy-mode').click(function () {

      $('#cube-restart').hide();
      $('.game-mode-block').hide(500)
      $('.cube-game-block').show(500);

      
      level_count = 1;
      $('.level-circle').text(level_count);
    
      var level = generateRandomNumbers( 4 + level_count );
      var step_box_arr = generateStepBoxs( level.length );

      function startGame () {
        var random_inner_box = $(`.inner-box[data-index="${level[i]}"]`);

        if (i != level.length) {
          const sound = new Audio(`assets/audios/sound-${level[i]}.wav`);
          sound.play();

          setTimeout(function () {
            $(random_inner_box).css({ 'background-color': '' })
          }, 300)
          $(random_inner_box).css({ 'background-color': random_inner_box.css('border-color'), 'opacity': 1 })

          i++;
        } else {
          clearInterval(startGameInterval);
          i = 0;
          level_score = 0;
          count = 0;
          clicked_box_index_list = [];
          console.log(count)
        }
      }

      var startGameInterval;
      setTimeout(function () {
        startGameInterval = setInterval( startGame, 500 );
      },1500);

      cube_restart_btn.click(function(){
        level_count = 1; 
        $(this).hide();
        
         
        $('.level-circle').text(level_count);
        $('.level-text').show();
        $('.level-item').css({
          'background-color' : 'transparent',
          'box-shadow' : 'none'
        });
        $(line_list[level_count-1]).css({
          'border-style' : 'dashed',
          'border-color' : '#fff'
        });
        $(level_item_list[level_count-1]).css({'background-color' : 'rgba(255, 251, 0,0.5)' })

        level = generateRandomNumbers( 4 + level_count );
        step_box_arr = generateStepBoxs( level.length );

        setTimeout(function () {
          startGameInterval = setInterval( startGame, 500 );
        },1000);

      });
        
      $('.inner-box').click(function () {
        var index = $(this).attr('data-index');
        clicked_box_index_list.push(index);
        
        if ( clicked_box_index_list[count] == level[count] ){
              $(step_box_arr[count]).css({'background-color' : 'rgba(0,254,10,1)'})
              level_score ++;

              if ( level_score == level.length ) {

                $(level_item_list[level_count-1]).find('.level-text').hide();
                $(level_item_list[level_count-1]).css({
                  'background-color' : 'rgba(255, 251, 0, 1)',
                  'box-shadow' : '0px 0px 49px 14px rgba(255,251,0,1)'
                })
                $(line_list[level_count-1]).css({
                  'border-style' : 'solid',
                  'border-color' : 'rgba(255, 251, 0, 1)'
                });
                level_count++;
                $(level_item_list[level_count-1]).css({'background-color' : 'rgba(255, 251, 0,0.5)' })
                
                if ( level_count == 6 ) {

                  $('.cube-game-block').hide(1000);
                  $('.congrat-block').show(1000)

                } else {
                  $('.level-circle').text(level_count)
                  
                  level = generateRandomNumbers( 4 + level_count );
                  step_box_arr = generateStepBoxs( level.length );
                  
                  setTimeout(function () {
                    startGameInterval = setInterval( startGame, 500 );
                  },1000);
                }
              }
            } else{
              $(step_box_arr[count]).css({'background-color' : 'rgba(254,0,20,1)'})
              cube_restart_btn.show();

            }
        
        count++;
      });
          
    
    })
  });