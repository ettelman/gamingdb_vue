<template>
    <div class="grid-container">
        <div class="cell">

            <h2 class="back-h">{{ this.game.name }}</h2>
            <div class="padd">
                Platform: <b>{{ this.game.platform }}</b> <br />
                Release: <b>{{ this.game.year }}</b><br />
                Genre: <b>{{ this.game.genre }}</b><br />
                Score: <b>{{ showScore }}</b><br />
                <select v-model="score" id="score">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <span @click="voteScore" class="vote">Vote</span>

            </div>
        </div>

        <div class="cell">
            <h2 class="back-h">Edit game:</h2>
            <div class="padd">
                <form @submit.prevent="editGame">

                    <label for="name">Name:</label>
                    <input v-model="name" type="text" id="name"><br />
                    <label for="platform">Platform:</label>
                    <input v-model="platform" type="text" id="platform"><br />
                    <label for="year">Year:</label>
                    <input v-model="year" type="number" id="year"><br />
                    <label for="genre">Genre:</label>
                    <input v-model="genre" type="text" id="genre"><br />
                    <input type="submit" value="Submit"><br />
                    <span class="red">{{ error }}</span>
                </form>
            </div>
        </div>
    </div>
    <button @click="openModal" class="button">Delete Game</button>
    <div id="modal">

        <div class="modal-content">
            <p>Are you sure you want to delete the game from the database?</p>
            <button @click="deleteGame" class="button">YES</button>
            <button @click="closeModal" class="button">NO</button>
        </div>

    </div>
</template>
<style scoped>
.vote {
    cursor: pointer;
    color: rgb(230, 31, 31);
    font-size: 120%;
}

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
    min-width: 30%;
}

@media (max-width: 850px) {
    .grid-container {
        grid-template-columns: repeat(1, 1fr);
    }

}

.button {
    display: block;
    margin: auto;
    margin-top: 1rem;
    background-color: rgb(230, 31, 31);
    border: 2px solid #0f2996;
    color: white;
    padding: 0.4rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
}

.red {
    color: rgb(230, 31, 31);
    font-weight: bold;
    font-size: 120%;
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 25px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    text-align: center;
    border-radius: 10px;
}

#modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>

<script>

export default {
    data() {
        return {
            game: [],
            error: "",
            name: "",
            platform: "",
            genre: "",
            year: "",
            score: "1",
            showScore: ""
        }

    },
    // sending id as a prop to display correct page
    props: ['id'],
    methods: {
        // getting the specified game with the prop sent
        async getGame() {

            const response = await fetch("http://localhost:3000/games/" + this.id, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                }
            });

            const data = await response.json();

            this.game = data.response;
            // setting variables for v-model

            this.name = this.game.name
            this.year = this.game.year
            this.platform = this.game.platform
            this.genre = this.game.genre
            this.viewScore();
        },
        viewScore() {
            // calculating score
            let total = 0;
            let count = 0;
            this.game.score.forEach(score => {
                total = score + total;
                count++;
            });
            this.showScore = total / count;
            this.showScore = Math.round(this.showScore * 100) / 100

        },
        // function for deleting game
        async deleteGame() {
            const response = await fetch("http://localhost:3000/games/" + this.id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            });
            const data = await response.json();
            // send user to gamesview
            this.$router.push('/games');
        },
        async editGame() {
            // checking fields
            if (this.name.length != 0 && this.year.length != 0 && this.genre.length != 0 && this.platform.length != 0) {

                // creating object for editing
                let game = {
                    name: this.name,
                    year: this.year,
                    genre: this.genre,
                    platform: this.platform
                }
                // fetch request for API using PATCH keyword to edit the game
                const response = await fetch("http://localhost:3000/games/" + this.id, {
                    method: "PATCH",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(game)
                });
                const data = await response.json();
                this.error = data.messege;
                this.getGame();


            } else {
                this.error = "All fields are required!";
            }
        },
        // modal functions
        openModal() {
            const modal = document.querySelector('#modal');
            modal.style.display = "block";
        },
        closeModal() {
            const modal = document.querySelector('#modal');
            modal.style.display = "none";
        },
        async voteScore() {
            this.score = parseInt(this.score);
            this.game.score.push(this.score);
            const game = {
                score: this.game.score
            };

            const response = await fetch("http://localhost:3000/games/" + this.id, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",

                },
                body: JSON.stringify(game)
            });
            const Data = await response.json();
            this.score = "1"
            this.getGame();

        }
    },
    mounted() {
        this.getGame();
    }
}

</script>