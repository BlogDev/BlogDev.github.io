$(document).ready(function () {
   $('.menu_button').click(function () {
       $('.Side_nave').toggleClass( "hide_side show_side" );
       $('.Header_nav').toggleClass( "min_nav full_nav" );
       $('.content').toggleClass( "min_content full_content" );
   })
    
});
