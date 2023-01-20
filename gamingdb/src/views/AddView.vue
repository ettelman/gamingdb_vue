<template>
    <div class="grid-container">
        <div class="cell">
            <h2 class="back-h">Add game:</h2>
            <div class="padd">
                <form @submit.prevent="addGame">

                    <label for="name">Name:</label>
                    <input v-model="name" type="text" id="name"><br />
                    <label for="platform">Platform:</label>
                    <input v-model="platform" type="text" id="platform"><br />
                    <label for="year">Year:</label>
                    <input v-model="year" type="number" id="year"><br />
                    <label for="genre">Genre:</label>
                    <input v-model="genre" type="text" id="genre"><br />
                    <label for="score">Score:</label>
                    <select v-model="score" id="score">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br />
                    <input type="submit" value="Submit"><input type="reset" value="Reset"><br />
                    <span class="red">{{ error }}</span>
                </form>
            </div>
        </div>
        <div class="cell">
            <h2 class="back-h">Information:</h2>
            <div class="padd">
                <b>Name:</b> Enter the full name of the game <br />
                <b>Platform:</b> Enter what platform the game originally came out for <br />
                <b>Year:</b> Enter the release year of the game <br />
                <b>Genre:</b> Enter the genre of the game, can contain more then one genre <br />
                <b>Score:</b> Enter your score for the game. Other users can vote for score<br />
                <div class="padd"></div>
            </div>
        </div>

    </div>
</template>
<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
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

.cell {
    border: 1px solid black;
    border-radius: 10px;
    padding-top: 0;
}

.padd {
    padding: 0.5rem;
}

label {
    display: inline-block;
    min-width: 20%;
    font-weight: bold;
}

@media (max-width: 850px) {
    .grid-container {
        grid-template-columns: repeat(1, 1fr);
    }

}

.red {
    color: rgb(230, 31, 31);
    font-weight: bold;
    font-size: 120%;
}
</style>

<script>
import { RouterLink } from 'vue-router';
export default {
    // data needed for this view
    data() {
        return {
            error: "",
            name: "",
            platform: "",
            genre: "",
            year: "",
            score: ""
        }
    },
    methods: {
        // function for adding a game to db
        async addGame() {
            // checking input in fields on form
            if (this.name.length != 0 && this.year.length != 0 && this.genre.length != 0 && this.platform.length != 0 && this.score.length != 0) {
                // making sure score is an integer
                this.score = parseInt(this.score);
                // creating object for posting
                let game = {
                    name: this.name,
                    year: this.year,
                    genre: this.genre,
                    platform: this.platform,
                    score: this.score
                }
                // fetch request for API using POST keyword to add a game
                const response = await fetch("http://localhost:3000/games/", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(game)
                });
                const data = await response.json();
                // sending user to the created game page
                this.$router.push('/single/' + data.game._id); 


            } else {
                this.error = "All fields are required!";
            }
        }
    }
}

</script>