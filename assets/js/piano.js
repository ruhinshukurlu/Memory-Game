$(document).ready(function(){

    $('.key').mousedown(function(){
        var this_div_class  = $(this)[0].classList[0];
        if (this_div_class == "white-key"){
            $(this).css({
                'box-shadow' : 'inset 0px 0px 41px -9px rgba(0,0,0,0.75)'
             })
        }else if (this_div_class == "black-key") {
            $(this).css({
                'background': 'rgb(0,0,0)',
                'background' : 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(208,208,208,1) 0%, rgba(0,0,0,0.9923319669664741) 0%, rgba(87,86,86,1) 100%)'
            });
        }
    });

    $('.key').mouseup(function(){
        var this_div_class  = $(this)[0].classList[0];
        var this_div = $(this);
        if (this_div_class == "white-key"){
            setTimeout(function(){
                this_div.css({
                    'box-shadow' : 'none'
                })
            },100);
            $(this).css({ 'box-shadow' : 'inset 0px 0px 41px -9px rgba(0,0,0,0.75)' })
        }else if (this_div_class == "black-key") {
            $(this).css({
                'background': 'rgb(0,0,0)',
                'background' : 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9923319669664741) 0%, rgba(115,112,112,1) 0%, rgba(0,0,0,1) 100%)'
            });
        }
    });

    

    var piano_box = $('.piano-block');
    var note_list = piano_box.children();
    var index = 1;

    function addIndexToNotes() {
        for ( note of note_list ) {
            $(note).attr('data-index',index);
            index+=0.5;
            if (index == 7.5) {
                index++;
            }
        }
    }
    addIndexToNotes();


    function getSound(index) {
        return new Audio(`https://awiclass.monoame.com/pianosound/set/${index}.wav`);
    }

    $('.key').click(function(){
        var clicked_note_index = $(this).attr('data-index');
        var sound = getSound(clicked_note_index);
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
            var randomNumber = Math.floor(Math.random() * 10) + 1;
            rand_num_list.push(randomNumber);
        }
        return rand_num_list;
    }
    var rand_nums = generateRandomNumbers(5);
    console.log(rand_nums);

    function addDecimalRandomNumbers(size) {
        var decimal_num_amount = Math.floor(Math.random() * size ) + 1;
        console.log(decimal_num_amount)
        while (decimal_num_amount != 0) {
            var rand_index = Math.floor(Math.random() * size );
            console.log('index',rand_index)
            rand_nums[ rand_index ] += 0.5;

            if (rand_nums [ rand_index ] == 7.5 ){
                rand_nums[ rand_index ] += 0.5;
            }
            decimal_num_amount--;
        }
        return rand_nums;
    }

    var level = addDecimalRandomNumbers( rand_nums.length );
    console.log(level)
    
    function startGame () {
        
    }

    // startGame()

    

});