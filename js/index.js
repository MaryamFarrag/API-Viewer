var request = new XMLHttpRequest()
var url = $("#url")
var timesClicked = 0
$("#submit").click(function(){
    timesClicked++
    if(timesClicked > 1){
        $(".row").html(" ")
    }
//https://ghibliapi.herokuapp.com/films
request.open('GET', ''+url.val()+'', true)
request.onload = function () {
    var data = JSON.parse(this.response)
    if(request.status >= 200 && request.status < 400){
     var elementArr = []
     var keys
     var values
     var length
     var j = 0
        if(data.hasOwnProperty('articles')){
            data = data.articles
        }
        data.forEach(elements => {
            length = Object.keys(elements).length;
            $('<div class="col-md-4"><div class="element">\
            <p></p>\
            </div></div>').appendTo('.row')  
            elementArr.push(elements)
        });
        $(".element").each(function(){
             keys = Object.keys(elementArr[j])
             values = Object.values(elementArr[j])
            for(let i = 0; i < length; i++){
                if(keys[i].includes("image") || keys[i].includes("img") || keys[i].includes("Img") || keys[i].includes("Image")){
                    $('<h2 class="key">'+keys[i]+':</h2><img class="val img-fluid" src="'+values[i]+'">').appendTo($(this));
                }
                else{
                    $('<h2 class="key">'+keys[i]+':</h2><p class="val">'+values[i]+'</p>').appendTo($(this));
                }                
            }
            j++
        }) 
    }
    else{
        document.write("Please enter a valid URL")
    }
}
request.send()
})