'use strict';

let tempID = '#gallery-template'
let pageLoad = 'data/page-1.json'
let divClass = '#gallery-1'
const filters = ['View-All'];

function HornedCritter(critter) {
    this.image = critter.image_url;
    this.title = critter.title;
    this.desc = critter.description
    this.tag = critter.keyword;
    this.horns = critter.horns;
}

HornedCritter.prototype.render = function() {
    let template = $(tempID).html();
    let html = Mustache.render(template, this);
    return html;
}


HornedCritter.readJSON = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }

    $.ajax(pageLoad, ajaxSettings)
        .then(data => {
            data.forEach( item => {
                let critter = new HornedCritter(item);
                if(!filters.includes(critter.tag)) {
                    filters.push(critter.tag);
                }
                console.log(filters);
                $(divClass).append(critter.render());
            })
        })
       .then(data => {
            appendOptions();
       }) 
}


function appendOptions() {
    console.log(filters);
    filters.forEach(function(value) {
        $('select').append(`<option value="${value}">${value}</option>`);
        console.log($('select'));
    })
}

$('select').on('change', function() {
    $('#gallery-1').show();
    $('gallery-2').show();
    if($('select option:selected').text() === 'View-All') {
        $('section').show();
    } else {
        $('section').hide();
        $(`.${$('select option:selected').val()}`).show();
    }
  })


$('#second').on('click', function() {
    $(divClass).hide();
    divClass = '#gallery-2'
    if($(divClass).children().length) {
        $(divClass).show();
    } else {
        $('select').empty();
        pageLoad = 'data/page-2.json';
        HornedCritter.readJSON();
    }
})

$('#first').on('click', function() {
    $(divClass).hide();
    divClass = '#gallery-1';
    $(divClass).show();
})




$(() => HornedCritter.readJSON());
console.log(filters);
