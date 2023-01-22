<template>
      
    <h1>All games</h1>
    <hr>
      <div class="big">
        <h2 class="back-h">Click on a game to edit or delete</h2>
          <div class="grid-container three">
            <Game @updatescore="voteScore" v-for="game in games.games" :game="game" :key="game._id" />
      </div></div>
      <span id="error">{{ error }}</span>
    </template>
    <style scoped>
    .grid-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
    }
    .grid-small, .big {
          border: 1px solid black;
          border-radius: 10px;
          padding-top: 0;
    }
    .back-h {
         color: white;
          padding: 0.2rem;
          margin: 0;
          background-color: #0f2996;
          border-bottom: 1px black solid;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
    }
    p {
          margin-left: 0.2rem;
    }
    h1 {
          font-size: 250%;
          text-align: center;
    }
    .big {
        margin-top: 1rem;
       
    }
    .three {
        grid-template-columns: repeat(3, 1fr);
        margin-right: 1rem;
        margin-left: 1rem;
        margin-bottom: 0;
    }
    
    
    </style>
    
    <script>
    import Game from "../components/Game.vue"
    
    export default {
        data() {
            return {
                games: [],
                error: ""
            }
    
        },
        // using game component to show games
        components: {
            Game
        },
        methods: {
            // function to get game
            async getGames() {
                const response = await fetch("http://localhost:3000/games", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
    
                const data = await response.json();
    
                this.games = data;
      
            },
            // function for voting on score. using $event to pass several variables in an emit
            async voteScore(none, score, vote, id) {
                let stored_votes = []
            let setVote = 0;
            if (localStorage.getItem("vote") != null) stored_votes = JSON.parse(localStorage["vote"]);
            console.log (id);
            stored_votes.forEach(vote => {
                if(vote == id){ 
                    setVote = 1;
            }});
            if (setVote === 0) { 
            stored_votes.push(id);
            localStorage["vote"] = JSON.stringify(stored_votes);
            vote = parseInt(vote);
            // pushing the vote into the score array
            score.push(vote);
            const game = {
                score: score
            };
            // using patch to update score
            const response = await fetch("http://localhost:3000/games/" + id, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",

                },
                body: JSON.stringify(game)
            });
            const Data = await response.json();
            this.getGames();
            // forcing update because of bug in VUE
            this.$router.go(0)
        } else {
                this.error = "You already voted on this game";
                document.querySelector('#error').focus();
            }

        }
        }
        ,
        mounted() {
            this.getGames();
        }
    }
    </script>