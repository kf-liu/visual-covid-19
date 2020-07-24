import $ from 'jquery';
$(document).ready(function () {
    $('.MNdianji').click(function () {
        if ($('.lPart').width() < $(window).width() / 2) {
            $('.lPart').css('width', '100%');
            $('.rPart').css('width', '100%');
        } else {
            $('.lPart').css('width', '20%');
            $('.rPart').css('width', '80%');
        }
    });
    $('.MNxiala').click(function () {
        this.parentNode.parentNode.parentNode.parentNode.previousElementSibling.click();
        // console.log(this.parentNode.parentNode.parentNode.parentNode.previousElementSibling);
    });
    // $('.lPart').hover(function(){
    //     $('.lPart').css('width', '100%');
    // });
});