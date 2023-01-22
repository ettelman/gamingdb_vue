<template>
    <div class="cell">

        <h3 @click="this.$router.push('/single/' + game._id)">{{ game.name }}</h3>
            Platform: <b>{{ game.platform }}</b> <br />
            Release: <b>{{ game.year }}</b><br />
            Genre: <b>{{ game.genre }}</b><br />
           Score: <b>{{ showScore }}</b><br />
           <select v-model="score" id="score">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
           <span @click="this.$emit('updatescore', $event, game.score, this.score, game._id)" class="vote" id="vote">Vote</span>

    </div>
</template>

<script>
export default {
    props: {
        game: Object
    },
    data() {
        return {
            score: "1",
            showScore: ""
        }
    },
    methods: { 
        // function for score. Getting all numbers in the array and calculates the median score
       viewScore() {
            let total = 0;
            let count = 0;
            this.game.score.forEach(score => {
                total = score+total;
                count++;
            });
            this.showScore = total / count;
            this.showScore = Math.round(this.showScore * 100) / 100

         
        }
    },
    mounted() {
        this.viewScore();
    }

}

</script>

<style scoped>
.cell {
    border: 1px solid black;
    text-align: center;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 10px;
    
}

h3 {
    cursor: pointer;
    margin-top: 0;
    color: rgb(230, 31, 31);
}

.vote {
    cursor: pointer;
    color: rgb(230, 31, 31);
    font-size: 120%;
}



.minus,
.plus {
    font-size: 1.6em;
    display: inline-block;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: -1rem;
    font-weight: bold;
    color: #1779c8;
    cursor: pointer;
}

.bold {
    font-weight: bold;
    text-align: left;
}
.price {
    color: rgb(172, 21, 21);
}
@media (max-width: 850px) {
 .cell {
    border: none;
    border-bottom: 1px black solid;
    border-radius: 0;
 }

}
</style>

