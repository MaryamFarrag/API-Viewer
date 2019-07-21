var request = new XMLHttpRequest()
var url = $("#url")
var timesClicked = 0
$("#submit").click(function(){ //if clicked more than once clear the page then print the new output
    timesClicked++
    if(timesClicked > 1){
        $(".row").html(" ")
    } 
//https://ghibliapi.herokuapp.com/films
//https://jsonplaceholder.typicode.com/users
request.open('GET', ''+url.val()+'', true)
request.onload = function () {
    var data = JSON.parse(this.response)
    if(request.status >= 200 && request.status < 400){
    
        if(data.hasOwnProperty('articles')){ //fix this later to work with other endpoints!
            data = data.articles
        }
        var dataArr = []
        /*so the function(shownInArr) does the following: it makes 2 arrays and a maparr, first and parent arr is the dataArr,
         the second for prop loop has a temp array that stores the 12(n of props) maps of keys and values. in the end of the loop it pushes all the 
         properties mapped to another array in the first for element loop then this array gets pushed in the original daraArr.
         so it becomes: dataArr has (n of elements) arrays that has (n of props) mapped array */
        showInArr(data)
        recur(dataArr)
        function showInArr(data){
            for(element in data){
                var keys = Object.keys(data[element])
                var values = Object.values(data[element])
                let elementTempArr = []
                $(".row").append('<div class="col-md-4"><div class="element"></div></div>')
                for(prop in keys){
                    let propTempArr = new Array()                
                    propTempArr.push(keys[prop],values[prop])
                    elementTempArr.push(propTempArr)
                }
                dataArr.push(elementTempArr)
            }               
        }
        function recur(data){
            for(ele of data){
                for(prop of ele){
                    for(i in prop){//i will be just 0 and 1, cuz key and value
                        if(prop[i] instanceof(Object) == false){
                        }
                        else if(prop[i] instanceof(Object)){
                    //     console.log("yep",prop[i])
                        //  console.log("true obj",prop[0],prop[1]) //put them in a temp array
                            var parentArr = []
                            var secArr= []
                            for(j in Object.keys(prop[i])){
                                var tempArr = [] //to store the object props temproraly
                                tempArr.push(Object.keys(prop[i])[j],Object.values(prop[i])[j])  
                                secArr.push(tempArr)
                            }
                            parentArr.push(secArr)
                            prop[i] = parentArr
                        //   console.log("pA=>",parentArr)
                            recur(parentArr)
                        } 
                    }
                }
            }
        }
       $(".element").each(function(j){ //dataArr[j] is the element
        for(prop of dataArr[j]){
            if(prop[1] instanceof(Array)){
                $('<h2 class="key">'+prop[0]+'</h2><div class="ele text-center"></div>').appendTo($(this));
                for(ele in prop[1]){
                    for(value of prop[1][ele]){
                        $('<h3 class="key">'+value[0]+'</h3><p class="val">'+value[1]+'</p>').appendTo($('.ele',this))   
                    }                
                }
            }
            else{
                if(prop[0].includes("image") || prop[0].includes("img") || prop[0].includes("Img") || prop[0].includes("Image")){
                    $('<h2 class="key">'+prop[0]+':</h2><img class="val img-fluid" src="'+prop[1]+'">').appendTo($(this));
                }
                else{
                    $('<h2 class="key">'+prop[0]+':</h2><p class="val">'+prop[1]+'</p>').appendTo($(this));
                }
            }
        }
    })
    }
    else{
        document.write("Please enter a valid URL")
    }
}
request.send()
    let aHref = $("#data");
    $("body").animate({scrollTop:$(aHref).offset().top},1000)
})