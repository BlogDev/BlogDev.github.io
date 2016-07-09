$(document).ready(function () {
    //Card Controlle Variables :
    var card_Body = $('._card .Body');
    var card_Reduire = $('._card .Reduire');
    var card_Agrendire = $('._card .Agrendire');
    var card_Exit = $('._card .Exit');

    $('.menu_button').click(function () {
        $('.Side_nave').toggleClass("hide_side show_side");
        $('.Header_nav').toggleClass("min_nav full_nav");
        $('.content').toggleClass("min_content full_content");
    });

    //Start Card Controlle :
    // Button Reduire
    card_Reduire.click(function (e) {
        $(e.target).parents('._card').children('.Body').addClass('hidden');
        $(this).parent().find('.Agrendire').toggleClass('hidden');
        $(this).toggleClass('hidden');
    });
    // Button Agrendire
    card_Agrendire.click(function (e) {
        $(e.target).parents('._card').children('.Body').removeClass('hidden');
        $(this).parent().find('.Reduire').toggleClass('hidden');
        $(this).toggleClass('hidden');
    });
    //Button Exit
    card_Exit.click(function (e) {
        var card = $(e.target).parents('._card');
        card.toggleClass('hidden');
    });
    //End Card Controlle :

    //ChartJs Start
    var ctx = $("#ArticleViews");
    var data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "عدد الزيارات",
                backgroundColor: "rgba(255,99,132,0)",
                borderColor: "rgba(111, 125, 149,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [150, 55, 90, 111, 83, 400, 320]
            }
        ]
    };
    var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            responsive : true
        }
    });
    //ChartJs End

   
});
