//-------------------------------------------------------------------------------//
//DATA (Serve JSON to our AngularJS/BootstrapJS client)
//-------------------------------------------------------------------------------//
//Image sizes 
var appImageHeight = 640;
var appImageWidth = 350;

exports.jsonWork = {
    "posts": [
        {
            "id" : "keen-img",
            "title": "Keen Home.",
            "subTitle": "The next innovation in home automation.",
            "date": "Expected Release: Spring 2014",
            "text": "This app was developed along with the Keen Home team.  The app allows you to seamlessly open and close vents via your smart phone using the bluetooth low energy protocol.",
            "language": "Objective-C,Arduino",
            "linkUrl": "http://mykeenhome.com",
            "linkTitle": "Visit Keen Home!",
            "image": "images/imageKeenHome2.png",
            "galleryName": "keen",
            "gallery": ["images/imageKeenHome1.png",
                "images/imageKeenHome2.png",
                "images/imageKeenHome3.jpg"],
            "height": appImageHeight,
            "width": appImageWidth
        },
        {
            "id" : "pap-img",
            "title": "Park As Pharmacy.",
            "date": "Expected Release: January 2014",
            "subTitle": "A leaf identification app for Android.",
            "text": "This app was developed in parternship with Rena Lee, a student at Parsons School of Design.  The app allows you to input leaf characteristics to identify different species of plants, and search leaves by medicinal properties. ",
            "language": "Java,XML,SQLite",
            "image": "images/imagePAP3.png",
            "galleryName": "pap",
            "gallery": ["images/imagePAP3.png",
                "images/imagePAP2.png",
                "images/imagePAP1.png"],
            "height": appImageHeight,
            "width": appImageWidth
        },
        {
            "id" : "ccny-img",
            "title": "CCNY Mobile.",
            "date": "Expected Release: November 2013",
            "subTitle": "A student and alumni app for Android.",
            "text": "This app was developed for the City College of New York.  The app has a news feed, a school directory, course sections/schedules, as well as a map.  The map interfaces with NextBus to provide real-time shuttle bus locations + predictions.",
            "language": "Java,XML,Ruby on Rails",
            "linkUrl": "http://julintani.com",
            "linkTitle": "Visit Julintani!",
            "image": "images/imageCCNYMobile1.png",
            "galleryName": "ccnymobile",
            "gallery": ["images/imageCCNYMobile1.png",
                "images/imageCCNYMobile3.png",
                "images/imageCCNYMobile5.png"],
            "height": appImageHeight,
            "width": appImageWidth
        }
    ]
}

exports.jsonResearch = {
    "posts": [
        {
            "title": "NOAA ESRL.",
            "date": "Summer 2013",
            "image": "images/imageNOAA1.jpg",
            "text": "Helped to develop a cost minimization code using Python and NCL to optimize a national electricity production system using weather driven renewable energy. Worked on a front-end Javascript web app to display the result of the optimization code. Presented research at NOAA Hollings Symposium in Washington DC Summer 2012."
        },
        {
            "title": "NOAA CREST.",
            "date": "2009-2013",
            "image": "images/imageNOAA2.png",
            "text": "Used meteorological data from NOAA geostationary satellites to remove water contamination for earth and defense satellite observations using Python and MATLAB. Presented research and my experience as a NOAA CREST intern to an audience of 300+ on NOAA CREST Day 2012. ",
        },
        {
            "title": "NASA GISS.",
            "date": "Summer 2009 & Summer 2010",
            "image": "images/imageNASA1.jpg",
            "text": "Worked on validation of the RM3 Climate Model developed at GISS using MATLAB. Helped to develop crucial regional climate model in order to predict drought trends in the Sahel region of Africa.",
        }
    ]
}

exports.jsonMusic = {
    "tracks": [
        {
            "link": "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F26962355",
        },
        {
            "link": "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F110836596",
        },
        {
            "link": "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F110835620",
        },
        {
            "link": "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F17364289"
        }
    ]
}

exports.jsonDesign = {
    "posts": [
        {
            "title": "Neuschwanstein Castle.",
            "date": "2009-2010",
            "text": "This map is a replica of Neuschwanstein Castle in Bavaria Germany, constructed by Ludwig II of Bavariain 1869-1892.",
            "image": "images/neu_d0044.jpg",
            "editor": "Valve Hammer Editor",
            "galleryName": "neuschwanstein",
            "gallery": ["images/neu_d0044.jpg",
                "images/neu_d0108.jpg",
                "images/neu_d0087.jpg",
                "images/neu_d0085.jpg",
                "images/neu_d0086.jpg",
                "images/neu_d0080.jpg",
                "images/neu_d0068.jpg",
                "images/neu_d0067.jpg",
                "images/neu_d0065.jpg",
                "images/neu_d0076.jpg",
                "images/neu_d0049.jpg",
                "images/neu_d0046.jpg",
                "images/neu_d0051.jpg",
                "images/neu_d0052.jpg",
                "images/neu_d0056.jpg",
                "images/neu_d0054.jpg",
                "images/neu_d0041.jpg",
                "images/neu_d0045.jpg",
                "images/neu_d0048.jpg"
            ],
            "height": 800,
            "width": 640
        },
        {
            "title": "RMS Titanic.",
            "date": "2006-2009",
            "text": "This map was designed using the MOH map editor and is playable in AA,SH,and BT.",
            "image": "images/imageTitanic1.png",
            "editor": "Quake III",
            "galleryName": "titanic",
            "gallery": ["images/imageTitanic1.png",
                "images/imageTitanic2.png"],
            "height": 800,
            "width": 640
        },
        {
            "title": "St. Etienne Cathedral.",
            "date": "2007-2009",
            "text": "This map was designed using the MOH map editor and is playable in AA,SH,and BT.",
            "image": "images/imageCaen1.png",
            "editor": "Quake III",
            "galleryName": "caen",
            "gallery": ["images/imageCaen1.png"],
            "height": 800,
            "width": 640
        },

    ]
}