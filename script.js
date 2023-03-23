window.addEventListener('load', () =>{
    const alphabet = document.getElementById('letters');
    Hangman.generate_alphabet(alphabet);
    Hangman.generate_answear();
})


const Hangman = {

    football_clubs: 
        ["BARCELONA", "JUVENTUS", "PSG", "REAL MADRYT", "LEGIA WARSZAWA", "BENFICA LIZBONA",
        "CRACOVIA", "AC MILAN", "AJAX AMSTERDAM", "NAPOLI"],

    football_players:
        ["MESSI", "CRISTIANO RONALDO", "KAKA", "LEWANDOWSKI", "MILIK",
        "NEYMAR", "ANTHONY", "RAUL", "RAMOS", "BALLACK"],


    generate_alphabet: function(some_div){
        for(let i=0; i<26; i++){
            const letter = document.createElement('button');
            letter.className = "alphabet";
            letter.value = String.fromCharCode(65+i);
            letter.innerHTML = letter.value;
            some_div.appendChild(letter);

            letter.addEventListener('click', () =>{
                letter.className = "clicked-button";
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
                console.log(randomCategory+ " " + randomAnswear);
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
            const answear_span = document.createElement('span');
            answear_span.className = "answear-span";
            document.getElementById('answear').appendChild(answear_span);
        }
    }


}
