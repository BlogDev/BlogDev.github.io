var editor;
$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCsQKRjXxahCZPlrxIJLWGTvLrYaVKRckY",
        authDomain: "aqua-e6388.firebaseapp.com",
        databaseURL: "https://aqua-e6388.firebaseio.com",
        storageBucket: "aqua-e6388.appspot.com",
    };
    firebase.initializeApp(config);

    var UploadImage = function (file,callback){
        var storageRef = firebase.storage().ref();

        var uploadTask = storageRef.child('images/' + file.name).put(file);

        //Si
        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // See below for more detail
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            var downloadURL = uploadTask.snapshot.downloadURL;
            callback(downloadURL);
        });
    };

    var Upload_With_Stat = function (file,callback) {
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child('images/' + file.name).put(file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function(error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                }
            }, function() {
                // Upload completed successfully, now we can get the download URL
                var downloadURL = uploadTask.snapshot.downloadURL;
                callback(downloadURL);
            });
    };


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
    if (ctx.length) {
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
                responsive: true
            }
        });
    }
    //ChartJs End



    var demoArticle;
    var storedArticle = localStorage.getItem('article-ar');
    if (storedArticle) {
        try {
            demoArticle = carbon.Article.fromJSON(JSON.parse(storedArticle));
        } catch (e) {
            console.error('Error with the loading saved article.' +
                'This is probably due to backward-incompatability.');
        }
    }

    if(!demoArticle) {
        demoArticle = new carbon.Article({
            sections: [new carbon.Section({
                components: [
                    new carbon.Layout({
                        components: [
                            new carbon.Paragraph({
                                placeholderText: 'عنوان المقال',
                                paragraphType: carbon.Paragraph.Types.SecondaryHeader
                            }),
                            new carbon.Paragraph({
                                placeholderText: 'وصف المقال',
                                paragraphType: carbon.Paragraph.Types.Quote
                            }),
                            new carbon.Paragraph({
                                placeholderText: 'أكتب مقالك هنا'
                            })
                        ]
                    })
                ]
            })]
        });
    }

    var editor_ID = document.getElementById('TextEditor');
    editor = new carbon.Editor(editor_ID, {
        article: demoArticle,
        rtl: true,
        locale: 'ar',
        modules: [
            carbon.GiphyComponent,
            carbon.EmbeddedComponent
        ]
    });
    editor.install(carbon.EmbeddingExtension, {
        embedProviders: {
            embedly: new carbon.EmbedlyProvider({
                apiKey: '26bcd97b7e2545eab61c7744d39b0f8d'
            }),
            carbon: new carbon.CarbonEmbedProvider({
                DEV_IFRAME_URL: 'http://localhost:63342/Test%20Test/public/iframe.html'
            })
        },
        ComponentClass: carbon.EmbeddedComponent
    });

    editor.install(carbon.LayoutingExtension);
    editor.render();

    var model = document.getElementById('Aricle_Json');
    editor.addEventListener('change', function (event) {
        model.innerHTML = JSONTree.create(editor.getJSONModel());
        localStorage.setItem('article-ar', JSON.stringify(editor.getJSONModel()));
    });
    model.innerHTML = JSONTree.create(editor.getJSONModel());

    // TODO(mkhatib): Create a small helper app to support the demo
    // and provide a better uploading capability.
    editor.addEventListener('attachment-added', function (event) {
        
        var attachment = event.detail.attachment;
        var file = attachment.file;

        Upload_With_Stat(file,insert_URL);

        function insert_URL(downloadURL){
            console.log("End Of Upload : "+downloadURL);
            attachment.setAttributes({
                src: downloadURL,
                caption: 'قمت بتحميل الصورة على FireBase من أجل التجربة'
            });
            editor.dispatchEvent(new Event('change'));
        }

        editor.dispatchEvent(new Event('change'));
    });

});
