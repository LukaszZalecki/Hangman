window.addEventListener('load', () =>{
    
    const alphabet = document.getElementById('letters');
    const new_game_button = document.getElementById('new-game-button');
    
    document.getElementById('lives').innerHTML = Hangman.live_counter;
    Hangman.generate_answear();
    Hangman.generate_alphabet(alphabet);
    Hangman.new_game(new_game_button);
    
})



const Hangman = {

    football_clubs: 
        ["BARCELONA", "JUVENTUS", "PSG", "REAL MADRYT", "LEGIA WARSZAWA", "FC PORTO",
        "CRACOVIA", "AC MILAN", "AJAX AMSTERDAM", "NAPOLI"],

    football_players:
        ["MESSI", "CRISTIANO RONALDO", "KAKA", "LEWANDOWSKI", "MILIK",
        "NEYMAR", "ANTHONY", "RAUL", "RAMOS", "BALLACK"],

    football_clubs_hint:
        ["Club from Catalonia", "Old lady", "Sheikh club", "Los Blancos", "Club from Warsaw", "Portugal champion 2022",
        "Wisła Kraków opponents", "San Siro", "Eredivise champion", "Stadio Diego Armando Maradona"],

    live_counter: 10,

    generate_alphabet: function(some_div){
        for(let i=0; i<26; i++){
            const letter = document.createElement('button');
            letter.className = "alphabet";
            letter.innerHTML = String.fromCharCode(65+i);
            letter.value = letter.innerHTML.charCodeAt(0);
            some_div.appendChild(letter);
            letter.addEventListener('click', () =>{
                letter.className = "clicked-button";
                const list = document.querySelectorAll('#answear-ul li');
                let control_var = 0;
                for(let i=0; i<list.length; i++){
                    if(letter.value == list[i].getAttribute('value')){
                        list[i].innerHTML = String.fromCharCode(letter.value);
                        control_var++;
                    }
                }
                if(control_var==0){
                    this.live_counter = this.live_counter -1;
                }
                document.getElementById('lives').innerHTML = this.live_counter;
            })

            
        }
    }, 

    generate_answear: function(){
        const randomCategory = Math.floor(Math.random()*2);
        const randomAnswear = Math.floor(Math.random()*10);
        const category = document.getElementById('current-category');
        switch(randomCategory){
            case 0: 
                category.innerHTML = "Kluby piłkarskie";
                Hangman.answear(this.football_clubs, randomAnswear);
                break;
            case 1:
                category.innerHTML = "Piłkarze";
                Hangman.answear(this.football_players, randomAnswear);
                break;
            default: 
                break;
        }
    },

    answear: function(array,index){
        for(let i=0; i<array[index].length; i++){
            const answear_li = document.createElement('li');
            if(array[index][i] == " "){
                answear_li.className = "answear-li-spacebar";
                answear_li.value = array[index].charCodeAt(i);
            }
            else{
                answear_li.className = "answear-li";
                answear_li.value = array[index].charCodeAt(i);
                 
            }
            document.getElementById('answear-ul').appendChild(answear_li);   
        }
    },

    check_letter: function(){
        
    },


    new_game: function(button){
        button.addEventListener('click', () =>{
            location.reload();
        })
    },

 

    hint_button: function(button, category, index, array){
        button.addEventListener('click', ()=>{
            switch(category){
                case 0: 
                    document.getElementById('span-hint').innerHTML = array[index];
                    break;
                case 1:
                    break;
                default:
                    break;
            }
        })
    }

}
