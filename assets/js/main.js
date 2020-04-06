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

    var restart_btn = $('#restart-btn');
    
    var level_count = 1;
    $('.level-circle').text(level_count);
    $('.level-text').text(`${level_count}/5`);
    var i = 0;
    var clicked_box_index_list;
    var count;
    var level_score = 0;
    

    $('#startGame').click(function () {
      
      $('.game-block').show(1000);
      $(this).css({'opacity' : 0})

      var level = generateRandomNumbers( 3 + level_count );
      var step_box_arr = generateStepBoxs( level.length );
      console.log(level);
      console.log(step_box_arr);

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
          clicked_box_index_list = [];
          level_score = 0;
          count = 0;
        }
      }
      var startGameInterval;
      setTimeout(function () {
        startGameInterval = setInterval( startGame, 500 );
      },1000);
        
      $('.inner-box').click(function () {
        var index = $(this).attr('data-index');
        clicked_box_index_list.push(index);
        console.log(count);
        
        if ( clicked_box_index_list[count] == level[count] ){
              $(step_box_arr[count]).css({'background-color' : 'rgba(0,254,10,1)'})
              level_score ++;
              if ( level_score == level.length ) {
                level_count++;

                if ( level_count == 6 ) {
                  $('.game-block').hide(1000);
                } else {
                  $('.level-circle').text(level_count)
                  $('.level-text').text(`${level_count}/5`);

                  level = generateRandomNumbers( 3 + level_count );
                  step_box_arr = generateStepBoxs( level.length );
                  console.log(level);
                  console.log(step_box_arr);

                  setTimeout(function () {
                    startGameInterval = setInterval( startGame, 500 );
                  },1000);
                }
              }
            } else{
              $(step_box_arr[count]).css({'background-color' : 'rgba(254,0,20,1)'})
              
              $('.level-circle').html(restart_btn)
              restart_btn.show(500)
              restart_btn.click(function(){
                level_count = 1;
                $('.level-circle').text(level_count);
                $('.level-text').text(`${level_count}/5`);

                level = generateRandomNumbers( 3 + level_count );
                step_box_arr = generateStepBoxs( level.length );

                console.log('restart level => ',level);
                console.log(step_box_arr);

                setTimeout(function () {
                  startGameInterval = setInterval( startGame, 500 );
                },1000);

              });
            }
        
        count++;
      });
          
    
    })
  });