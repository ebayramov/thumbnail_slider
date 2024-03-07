$(() => {
    let path = 'img/'
    let imgarr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"]
    let slider = $("#slider")
    let slide = $("#slide")
    let x = 0
    let timer
    slider
        .click((e)=>{
            if(e.pageX > $(window).width() / 2) change(1)
            else change(-1)
        })
        .prepend( '<div id="slide0"></div>' )
        .append( '<div id="thumbs"></div>' )
    let slide0 = $("#slide0")
    slide0.css({
        position: 'absolute',
        width: '100%',
        height: '100%'
    })
    slide.css({
        position: 'absolute',
        width: '100%',
        height: '100%'
    })
    $('#thumbs').css({
        position: 'absolute',
        bottom: '0',
        width: '100%',
        textAlign: 'center'
    })

    imgarr.forEach( item => $('#thumbs').append( `<img src="${path + item}" alt="" />` ) )

    $('#thumbs>img')
        .css({
            width: '20px',
            height: '20px',
            margin: '5px',
            borderRadius: '50%',
            border: '1px solid #fff'
        })
        .click( function(e) {
            e.stopPropagation()
            x = $(this).index() - 1
            change(1)
        } )

    change(0)

    function change(dir = 1) {
        clearTimeout(timer)
        x += dir
        if ( x > imgarr. length - 1 ) x = 0
        if ( x < 0 ) x = imgarr. length - 1

        slide0
            .css({ left: 0 })
            .animate( { left: `${ -dir * 100 }%` }, 'slow')
            
        slide
            .css({ 
                left: `${ dir * 100 }%`,
                background: `url('${path + imgarr[x]}') center/cover`
            })
            .animate( { left: 0 }, 'slow', function() {
                slide0.css({ background: `url('${path + imgarr[x]}') center/cover` })
             } )
 
        timer = setTimeout(change, 3000, 1)
    }
})