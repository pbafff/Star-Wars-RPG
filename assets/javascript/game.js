$(document).ready(function() {
    var x, y;
    $(".character-select").on("click", ".character" ,function() {
        x = $(this).offset().left;
        y = $(this).offset().top;
        alert(x);
        alert(y);
        
    });
    $(".enemy-position").on("click", function() {
        x = $(this).offset().left;
        y = $(this).offset().top;
        alert(x);
        alert(y);
    })
    
        
        
        
        
        
        
        
        
});