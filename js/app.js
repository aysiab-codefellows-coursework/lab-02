'use strict';

function HornedCritter(critter) {
    this.image = critter.image_url;
    this.title = critter.title;
    this.desc = critter.description
    this.tag = critter.keyword;
    this.horns = critter.horns;
}

HornedCritter.prototype.render = function() {
    let $galleryClone = $('.gallery-temp').clone();
    $('main').append($galleryClone);

    $galleryClone.find('h2').text(this.title);
    $galleryClone.find('img').attr('src', this.image);
    $galleryClone.find('p').text(this.desc);
    $galleryClone.removeClass('gallery-temp');
    $galleryClone.attr('class', this.title);
}

HornedCritter.readJSON = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }

    $.ajax('../data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach( item => {
                let critter = new HornedCritter(item);
                critter.render();
            })
        })
}

$(() => HornedCritter.readJSON());