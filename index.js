
//My CREATIONS MWHaHaHaHaaah.....HAHAHAHAHAHAHAHAHAHAHA!!!!!!!!!!!!!!!!!!!!!!
let tab = document.querySelector("#genreTab");//selects genreTab element and assigns it to variable tab
let quoteContainer = document.querySelector('#quotesHere');//selects #quotesHere  div assigns it var qouteContainer

let oneTab = document.createElement("button");//creates button element and stores it in var oneTab
let twoTab = document.createElement('button');

allAboutKanye();
allAboutInspiration();

function allAboutKanye() {

    oneTab.classList.add('tabButton');//adds class name 'qKanye' to oneTab 
    oneTab.setAttribute('id', 'kButton')
    tab.appendChild(oneTab);// appends oneTab to tab
    oneTab.textContent = "Words of Wisedom by Kanye";// adds text to oneTab
    var $kanyeCard = $('<span class="kanyeCard"></span>');

    //creates span element with class name kanyeCard and assigns it to var $kanyeCard
    
    let kQuotesArr = [];
    
    kanyeButton();
    function kanyeButton() {
       
        //add event listener to oneTab but with jQuery .one make sure event can only happen one time
        $('#kButton').on("click", function () {
            console.log("click")//check if event works
            $('#quotesHere').empty()
            $kanyeCard.empty()
            
            $kanyeCard.appendTo('#quotesHere'); //append kanyeCard to #quotesHere Div

            $.get(' https://api.kanye.rest/text', (data) => {

                console.log(data)
                let $wordsOfKanye = $(`<p class="mainText">${data}</p>`);
                kQuotesArr.push($wordsOfKanye.text());
                $wordsOfKanye.appendTo($kanyeCard)

                kanyeRefresh();
                // kanyePrev()
            });

        })
    }

    function kanyeRefresh() {


        let kRefreshButtton = document.createElement('button');// Create button  element assign it to var kRefreshButton
        kRefreshButtton.classList.add('nextButton');// add class name newKwise to kRefreshButton 
        kRefreshButtton.textContent = 'Next';//add text to kRefreshButton

        

        quoteContainer.appendChild(kRefreshButtton)//appends kRefreshButton to quoteContainer
        $('.nextButton').click(function () {
            console.log("click"); 
           
            $.get(' https://api.kanye.rest/text', (data) => {
                console.log(kQuotesArr);
                $wordsOfKanye = $(`<p class="mainText">${data}</p>`)
                kQuotesArr.push($wordsOfKanye.text());
                $kanyeCard.empty().append($wordsOfKanye);
            })
        })

    }

    // function kanyePrev(){
    //     let kanyePreButton = document.createElement('button'); 
    //     kanyePreButton.classList.add('preKwords');
    //     kanyePreButton.textContent = "previous";

    //     quoteContainer.appendChild(kanyePreButton);

    //     $('.preKwords').click(function(){
    //         console.log('click');

    //     })


    // }

}

function allAboutInspiration(){

    twoTab.classList.add('tabButton');
    twoTab.setAttribute('id', 'iButton');
    tab.appendChild(twoTab);
    twoTab.textContent = 'Need Some Inspiration';
    let $inspireCard = $('<span class="inspireCard"></span>');
    
    
    let IQuotesObj = {};
    
    inspireButton();
    function inspireButton() {
        //add event listener to oneTab but with jQuery .one make sure event can only happen one time
        $('#iButton').on("click", function () {
            console.log("click")//check if event works
            $('#quotesHere').empty()
            $inspireCard.empty()
           
            inspireSearch();
            $inspireCard.appendTo('#quotesHere')

            $.get('https://api.quotable.io/random', (data) => {
                
               
                let inspireData = data;
                // const json = JSON.stringify(data);
                console.log(inspireData)
                let $wordsOfInspire = $(`<p class="mainText">${inspireData['content']}</p>`);
                $wordsOfInspire.appendTo($inspireCard);

                let $authorOfInspire = $(`<p class="subText">-${inspireData['author']}</p>`);
                $authorOfInspire.appendTo($inspireCard);
;
                IQuotesObj.quote = inspireData.quote;
                IQuotesObj.author = inspireData.author


                inspireAgain();
                // dadPrev()
            });

        })
    }

    function inspireAgain() {


        let iRefreshButton = document.createElement('button');// Create button  element assign it to var kRefreshButton
        iRefreshButton.classList.add('nextButton');// add class name newKwise to kRefreshButton 
        iRefreshButton.textContent = 'Need More Inspiration?';//add text to kRefreshButton


        quoteContainer.appendChild(iRefreshButton)//appends kRefreshButton to quoteContainer
        $('.nextButton').click(function () {
            console.log("click");
            $.get('https://api.quotable.io/random ', (data) => {
            let inspireData = data
           
                let $wordsOfInspire = $(`<p class="mainText">${inspireData['content']}</p>`);                
                $inspireCard.empty().append($wordsOfInspire);

                let $authorOfInspire = $(`<p class="subText">-${inspireData['author']}</p>`);
                $inspireCard.append($authorOfInspire)

                IQuotesObj.quote = inspireData.quote;
                IQuotesObj.author = inspireData.author

                console.log(IQuotesObj);
            })
        })

    }
    
    function inspireSearch() {
    
        let $earchBar = $('<input class="genreSearch" type="text">');
        $('.genreSearch').appendTo('#quotesHere');
         
        $('.genreSearch').on('keyup', ()=>{
          let search = $('.genreSearch').text(); 
          $.get('https://api.quotable.io/search/authors/'+ search,()=>{
            console.log('click')
          } )
        })
    }
}
