$(document).ready(function(){

    var piano_box = $('.piano-block');
    var note_list = piano_box.children();
    

    function addIndexToNotes() {
        var index = 0;
        for (const note of note_list) {
            $(note).attr('data-index',index);
            index++;
        }    
    }
    addIndexToNotes();

    function getSound(name) {
        return new Audio(`assets/audios/${name}.wav`);
    }

    $('.key').click(function(){
        var clicked_note_index = $(this).attr('data-key');
        var sound = getSound(clicked_note_index);
        sound.play()
    });
    
    function generateRandomNumbers(size) {
        var rand_num_list = [];
        while (rand_num_list.length != size) {
            var randomNumber = Math.floor(Math.random() * 17) ;
            rand_num_list.push(randomNumber);
        }
        return rand_num_list;
    }

    function generateAllLevels( size ) {
        var levels_list = [];
        for (var i=4; i <= size; i++ ) {
            var rand_num_list = generateRandomNumbers(i);
            levels_list.push(rand_num_list);
        }
        return levels_list;
    }


    function generateStepBoxs (size) {
        var step_box = $('.piano-step-block');
        step_box.html('')
        var step_list = [];
        for (let j = 0; j < size; j++) {
            if ( j%2==0) {
                var step = $('<div class="music-note"><i class="fas fa-music"></i></div')
            } else {
                var step = $('<div class="music-note"><span class="material-icons"> music_note </span></div>')
            }
            step_list.push(step)
            step_box.append(step)
        }
        return step_list;
    }
    
    var piano_restart_btn = $('#piano-restart');
    var clicked_note_list = [];
    var iterator = 0;
    var click_count = 0;
    var level_count = 0;
    var levels_list = generateAllLevels( 10 )
    var level = levels_list[ level_count ]

    $('#hard-mode').click(function(){
        $('.game-mode-block').hide(700)
        $('.piano-game-block').show(1000);
        
        // console.log(levels_list);
        // console.log('level',level)
        
        $('.piano-score-text').text( level_count+1 )
        var step_list = generateStepBoxs (level.length)

        function levelStart () {
            var level_rand_index = level[iterator]
            if ( iterator != level.length ) {
                var random_note = $(`.key[data-index="${level_rand_index}"]`);
                
                var random_note_name = random_note.attr('data-key');
                const random_note_sound = getSound( random_note_name );
                random_note_sound.play();
                
                setTimeout (function () {
                    random_note.removeClass('active')
                },500)
                random_note.addClass('active')
                iterator++;
            } 
            else {
                clearInterval(id);
                iterator = 0;
                click_count = 0;
                clicked_note_list = [];
            }
        }  
        var  id;
        setTimeout(function(){
          id = setInterval( levelStart, 600 );
        },1500)

        piano_restart_btn.click(function(){
            level_count = 0;
            $(this).hide();
            
            var levels_list = generateAllLevels( 10 )
            
            level = levels_list[ level_count ]

            $('.piano-score-text').text( level_count+1 )

            step_list = generateStepBoxs (level.length)
            $('.piano-step-block').show()

            setTimeout(function(){
                id = setInterval( levelStart, 600 );
            },1500)
        });
        

        $('.key').click(function(){
            var clicked_note_index = $(this).attr('data-index');
            clicked_note_list.push(clicked_note_index);
            var clicked_note = $(this)

            if ( clicked_note_list[click_count] == level[click_count] ) {
                step_list[click_count].children().css({'color' : '#52FF00'})
                console.log('right')
                setTimeout (function () {
                    $(clicked_note).removeClass('right')
                },300)
                $(clicked_note).addClass('right')

                if (clicked_note_list.length == level.length ) {
                    level_count++;
                    $('.piano-score-text').text( level_count+1 )
                    level = levels_list[ level_count ]
                    
                    step_list = generateStepBoxs (level.length)
                    setTimeout(function(){
                        id = setInterval( levelStart, 600 );
                    },1500)
                }
            } 
            else {
                step_list[click_count].children().css({'color' : '#FF0000'})

                setTimeout (function () {
                    $(clicked_note).removeClass('wrong')
                },500)
                $(clicked_note).addClass('wrong')

                $('.piano-step-block').hide(500)
                piano_restart_btn.show(700)

                console.log('wrong')
            }
            click_count++;
        })
    });
    
});