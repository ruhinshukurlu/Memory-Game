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
        console.log(`assets/audios/${name}.wav`)
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

    function generateStepBoxs (size) {
        var step_box = $('.piano-step-block');
        step_box.html('')
        var step_list = [];
        for (let j = 0; j < size; j++) {
            var step = $('<i class="fas fa-music"></i>')
            step_list.push(step)
            step_box.append(step)
        }
        return step_list;
    }
    
    
    var iterator = 0;
    var click_count = 0;

    $('h1').click(function(){
        var level = generateRandomNumbers( 5 )
        console.log('level',level)
        var step_list = generateStepBoxs (level.length)
        function levelStart () {
            var level_rand_index = level[iterator]
            if ( iterator != level.length ) {
                var random_note = $(`.key[data-index="${level_rand_index}"]`);
                console.log(random_note)
                var random_note_name = random_note.attr('data-key');
                const random_note_sound = getSound( random_note_name );
                console.log(random_note_sound)
                random_note_sound.play();
                setTimeout (function () {
                    random_note.removeClass('active')
                },400)
                random_note.addClass('active')
                iterator++;
            } 
            else {
                clearInterval(id);
                iterator = 0;
                click_count = 0;
            }
        }
        var id;
        setTimeout(function(){
            id = setInterval( levelStart, 500 );
        },1000)
        

        $('.key').click(function(){
            var clicked_note_index = $(this).attr('data-index');
            var clicked_note = $(this)
            if ( level[0] == clicked_note_index ) {
                step_list[click_count].css({'color' : '#52FF00'})
                console.log('right')
                setTimeout (function () {
                    $(clicked_note).removeClass('right')
                },300)
                $(clicked_note).addClass('right')
                level.shift();
                if (level.length == 0) {
                    console.log('winn');
                }
            } else {
                step_list[click_count].css({'color' : '#FF0000'})
                setTimeout (function () {
                    clicked_note.removeClass('wrong')
                },300)
                clicked_note.addClass('wrong')
                console.log('wrong')
            }
            click_count++;
        })



    });
    
    

    

    // startGame()

    

});