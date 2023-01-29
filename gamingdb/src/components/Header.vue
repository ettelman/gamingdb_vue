<template>
    <header>
        <nav>
            <button @click="showMenu" class="button" id="mobilemenu">Menu &dArr;</button>
            <div id="show">
                <ul>
                    <li class="button">
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li class="button">
                        <RouterLink to="/games">Games</RouterLink>
                    </li>

                    <li class="button">
                        <RouterLink to="/add">Add to DB</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
        <img src="../assets/logo.png" alt="Logotyp för GamingDB">

        <hr class="minus-margin" />
    </header>
</template>
<script>
// routerlink for navigation
import { RouterLink } from 'vue-router';
export default {
    name: "Header",
    methods: {
        showMenu() {
            // open/close mobile menu
            const mobileMenu = document.querySelector('#show');

            if (mobileMenu.classList.contains("temp")) {
                mobileMenu.style.height = '0';
                mobileMenu.classList.remove("temp");
            } else {
                mobileMenu.classList.add("temp");
                mobileMenu.style.height = '200px';
            }
        }
    }
}

</script>

<style scoped>
.button {
    background-color: rgb(230, 31, 31);
    border: 2px solid #0f2996;
    color: white;
    padding: 0.4rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

header {
    text-align: center;
}

img {
    max-width: 100%;
}



nav ul {
    list-style: none;
    color: white;
    margin: 0;
    padding: 0;
}

nav li a {

    color: white;
    font-size: 150%;
    text-decoration: none;

}

nav li {
    display: inline-block;
    margin: 1rem;
}

#mobilemenu {
    display: none;

}

@media (max-width: 850px) {
    nav li {
        display: block;
        margin: auto;
        margin-bottom: 0.5rem;
        width: 90%;
    }



    #show {
        height: 0;
        transition: all 1s ease;
        overflow: hidden;
    }

    #mobilemenu {
        display: block;
        margin: auto;
        margin-bottom: 1rem;
        width: 90%;
    }

    .button {
        padding: 0.2rem;

    }

    .minus-margin {
        margin-top: 0;
    }
}
</style>