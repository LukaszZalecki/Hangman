window.addEventListener('load', () =>{
    
    const alphabet = document.getElementById('letters');
    const new_game_button = document.getElementById('new-game-button');
    
    

    document.getElementById('lives').innerHTML = Hangman.live_counter;
    Hangman.generate_answear();
    Hangman.generate_alphabet(alphabet);
    Hangman.new_game(new_game_button);
    console.log(Hangman.win_counter);
    
})



const Hangman = {

    football_clubs: 
        ["BARCELONA", "JUVENTUS", "PSG", "REAL MADRYT", "LEGIA WARSZAWA", "FC PORTO",
        "CRACOVIA", "AC MILAN", "AJAX AMSTERDAM", "NAPOLI"],

    football_players:
        ["MESSI", "CRISTIANO RONALDO", "KAKA", "LEWANDOWSKI", "MILIK",
        "NEYMAR", "ANTHONY", "RAUL", "RAMOS", "BALLACK"],

    football_clubs_hint:
        ["Duma Katalonii", "Stara dama", "Klub szejków", "Los Blancos", "Wojskowi", "Miszt ligi portugalskiej 2022",
        "Przeciwnicy Wisły Kraków", "Stadion San Siro", "Mistrzowie Holandii", "Stadion Diego Armando Maradona"],

    football_players_hint:
        ["Legenda Barcelony", "Definicja ciężkiej pracy", "Jedyny piłkarz, który wygrał rywalizację o złotą piłkę jednocześnie z CR7 i Messim", "Najlepszy polski napastnik",
        "Piłkarz który nie trafia w bramkę na lotnisku", "Magik na boisku", "Fidget spinner", "Legenda Realu Madryt", "Najlepszy hiszpański obrońca", "Niemiecki pomocnik, który zdobył tytuł wicemistrza Europy w 2008 roku"],

    live_counter: 10,

    win_counter : 0,

    current_answear: 0,

    generate_alphabet: function(some_div){
        let final_result = 0;
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
                        final_result = final_result + parseInt(letter.value);
                        Hangman.win(final_result);
                    }
                }
                if(control_var==0){
                    this.live_counter = this.live_counter -1;
                    document.getElementById('lives').innerHTML = this.live_counter;
                }
                Hangman.defeat();
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
                this.current_answear = this.football_clubs[randomAnswear];
                Hangman.answear(this.football_clubs, randomAnswear);
                document.getElementById('hint-button').addEventListener('click', () =>{
                    Hangman.hint(this.football_clubs_hint, randomAnswear);
                });
                break;
            case 1:
                category.innerHTML = "Piłkarze";
                this.current_answear = this.football_players[randomAnswear];
                Hangman.answear(this.football_players, randomAnswear);
                document.getElementById('hint-button').addEventListener('click', () =>{
                    Hangman.hint(this.football_players_hint, randomAnswear);
                });
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
                this.win_counter = this.win_counter + parseInt(answear_li.value);
                 
            }
            document.getElementById('answear-ul').appendChild(answear_li);   
        }
    },

    defeat: function(){
        if(this.live_counter == 0){
            document.getElementById('win-span').innerHTML = "PRZEGRANA!";
            const letters = document.getElementById('letters');
            while(letters.firstChild){
                letters.removeChild(letters.firstChild);
            }
            document.getElementById('current-category').innerHTML = "Poprawna odpowiedź: " + this.current_answear;
        }
    },

    win: function(result){
        if(this.win_counter == result){
            document.getElementById('win-span').innerHTML = "GRATULACJE, ZWYCIĘSTWO!";
            const letters = document.getElementById('letters');
            while(letters.firstChild){
                letters.removeChild(letters.firstChild);
            }
        }
    },

    new_game: function(button){
        button.addEventListener('click', () =>{
            location.reload();
        })
    },

 
    hint: function(array, index){
        document.getElementById('hint-span').innerHTML = "Podpowiedź: " + array[index];
    }

}
