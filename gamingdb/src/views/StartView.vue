<template>

    <h1>Welcome to GamingDB</h1>
    <hr>
    <div class="grid-container">
        <div class="grid-small">
            <h2 class="back-h">Your gaming database</h2>
            <p>At the GamingDatabase you can view games added by our users and add your own to our
                collection. You can also vote for games to influence the score.</p>
        </div>
        <div class="grid-small">
            <h2 class="back-h">Add games to the database</h2>
            <p><RouterLink to="/add">Add</RouterLink> as many games as you would like. Please dont delete other users games without permision.</p>
        </div>
    </div>
    <div class="big">
        <h2 class="back-h">Top games right now</h2>
        <div class="grid-container three">
            <Game @updatescore="voteScore" v-for="game in games.games" :game="game" :key="game._id" />
        </div>
    </div>
    <span id="error">{{ error }}</span>
</template>
<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.grid-small,
.big {
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
    text-shadow: 1px 1px 1px black, 0 0 2px black, 0 0 2px black;
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
a {
   color: rgb(230, 31, 31);
}
#error {
   
   color: rgb(230, 31, 31);

}
@media (max-width: 850px) {
    .grid-container {
        grid-template-columns: repeat(1, 1fr);
    }

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
    
    components: {
        Game
    },
    methods: {
        // getting games from db
        async getGames() {
            console.log(JSON.parse(localStorage["vote"]));
            const response = await fetch("http://localhost:3000/games", {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const data = await response.json();

            this.games = data;
            // calculating median score from the score array
            let index = 0;
            this.games.games.forEach(game => {
                let total = 0;
                let count = 0;
                
                game.score.forEach(score => {
                    total = score + total;
                    count++;
                });
                total = total / count;
                total = Math.round(total * 100) / 100
                // pushing the median score to each object in the db-array
                this.games.games[index] = { ...this.games.games[index], total: total };
                index++
                
            });
            // sorting games based of score
            this.games.games.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));


        },
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
            score.push(vote);
            const game = {
                score: score
            };

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

            this.$router.go(0)  } else {
                this.error = "You already voted on this game";
                document.querySelector('#error').focus();
            }

        }

    },
    // kör funktionerna när sidan är laddad
    mounted() {
        this.getGames();
    }
}
</script>