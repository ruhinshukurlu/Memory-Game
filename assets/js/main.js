$(document).ready(function(){
    $('.inner-box').hover(function(){
        var this_box_color = $(this).css('border-color');
        $(this).css({'background-color': this_box_color, 'opacity' : 0.3, 'z-index' : 2});

    }, function(){
        $(this).css({'background-color': '', 'opacity' : 1, 'z-index' : 1});
    });

    
    
    $('.inner-box').mousedown(function(){
        $(this).css({'opacity' : 1});
        
    })
    
    $('.inner-box').mouseup(function(){
        var this_box = $(this);
        setTimeout(function(){
            $(this_box).css({'opacity' : 0.3});
        },300);
        $(this_box).css({'opacity' : 1});
     })
    
});