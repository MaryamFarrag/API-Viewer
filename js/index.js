var request = new XMLHttpRequest()
var url = $("#url")
var timesClicked = 0
$("#submit").click(function(){ //if clicked more than once clear the page then print the new output
    timesClicked++
    if(timesClicked > 1){
        $(".row").html(" ")
    } 
//https://ghibliapi.herokuapp.com/films
request.open('GET', ''+url.val()+'', true)
request.onload = function () {
    var data = JSON.parse(this.response)
    if(request.status >= 200 && request.status < 400){
    
        if(data.hasOwnProperty('articles')){ //fix this later to work with other endpoints!
            data = data.articles
        }
        var dataArr = []
        /*so the function does the following: it makes 2 arrays and a map, first and parent arr is the dataArr,
         the second for prop loop has a temp array that stores the 12(n of props) maps of keys and values. in the end of the loop it pushes all the 
         properties mapped to another array in the first for element loop then this array gets pushed in the original daraArr.
         so it becomes: dataArr has (n of elements) arrays that has (n of props) mapped array */
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
        showInArr(data)
        //the following code sucks..
       for(ele in dataArr){ //loops through the whole array of data
           for(pro of dataArr[ele]){ // loops through arrays that contain the keys and values(that are now values in arrays!)
               for(i in pro){ // loops thro each key and value
                   if(pro[i] instanceof(Object)){ //checks if either is an object
                       var parentArr = []
                       for(j in Object.keys(pro[i])){
                           var temArr = [] 
                           temArr.push(Object.keys(pro[i])[j],Object.values(pro[i])[j]) //breaks that object and put the keys and vals in the temp array
                           parentArr.push(temArr) //then stores these arrays in a parent array
                       }
                       pro[i] = parentArr //changes the obj to an array of the same data.
                   }
               }
           }
       } 
       $(".element").each(function(j){
        for(let i = 0; i < dataArr[j].length; i++){
            if(dataArr[j][i][1] instanceof(Array)){
                $('<h2 class="key">'+dataArr[j][i][0]+':</h2><div class="ele text-center"></div>').appendTo($(this));
                    for(key of dataArr[j][i][1]){
                        $('<h3 class="key">'+key[0]+'</h3><p class="val">'+key[1]+'</p>').appendTo($('.ele',this))
                    }
            }
            else{
                let keyName = dataArr[j][i][0]
                let valueName = dataArr[j][i][1];
                if(keyName.includes("image") || keyName.includes("img") || keyName.includes("Img") || keyName.includes("Image")){
                    $('<h2 class="key">'+keyName+':</h2><img class="val img-fluid" src="'+valueName+'">').appendTo($(this));
                }
                else{
                    $('<h2 class="key">'+keyName+':</h2><p class="val">'+valueName+'</p>').appendTo($(this));
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
 
