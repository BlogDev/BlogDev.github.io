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

    demoArticle = new carbon.Article({
        sections: [new carbon.Section({
            components: [
                new carbon.Layout({
                    components: [
                        new carbon.Paragraph({
                            placeholderText: 'كاربون',
                            text: 'مرحباً بك في المحرر',
                            paragraphType: carbon.Paragraph.Types.MainHeader
                        }),
                        new carbon.Paragraph({
                            placeholderText: 'This is just a demo.',
                            text: 'محرر مقالات في المتصفح',
                            paragraphType: carbon.Paragraph.Types.ThirdHeader
                        })
                    ]
                })
            ]
        })]
    });

    var editor = new carbon.Editor(document.getElementById('my-editor'),{
            rtl: true,
            locale: 'ar',
            article: demoArticle,
            modules: [
                carbon.GiphyComponent,
                carbon.EmbeddedComponent
            ]
        });
    editor.install(carbon.EmbeddingExtension, {
        embedProviders: {
            embedly: new carbon.EmbedlyProvider({
                apiKey: '46c6ad376b1343359d774c5d8a940db7'
            }),
            carbon: new carbon.CarbonEmbedProvider({
            })
        },
        ComponentClass: carbon.EmbeddedComponent
    });
    editor.install(carbon.SelfieExtension);
    editor.install(carbon.LayoutingExtension);


    editor.render();
});
