<template>
    <main>
        <div class="left">
            <div class="img">
                <img :src="`https://api.dicebear.com/6.x/bottts/svg?seed=${data.username}`" :alt="`${data.username}`">

            </div>
            <h1>{{ data.firstname }} {{ data.lastname }}</h1>
        </div>
        <div class="right">
            <form @submit.prevent>
                <div class="input">
                    <label for="username">USERNAME : </label>
                    <input type="text" id="username" :value=" data.username" readonly>
                </div>
                <div class="input">
                    <label for="firstname">FIRST NAME : </label>
                    <input type="text" id="firstname" :value=" data.firstname" readonly>
                </div>
                <div class="input">
                    <label for="lastname">LAST NAME : </label>
                    <input type="text" id="lastname" :value=" data.lastname" readonly>
                </div>
                <div class="input">
                    <label for="email">EMAIL : </label>
                    <input type="email" id="email" :value=" data.email" readonly>
                </div>
                <div class="date">First Join : <date-format :date="new Date(data.created )"  /></div>
            </form>
        </div>
    </main>
</template>

<script setup>
import store from '../../store';
import {ref} from "vue"

const token=localStorage.getItem("token")
const data=ref("")
fetch(`${store.state.apiUrl}/user/me`,{
    headers: {
        'Authorization':`Bearer ${token}`
    }
})
.then(res=>res.json())
.then(d=>data.value=d);



</script>

<style lang="scss" scoped>
main{
    width: 100%;
    height: 100%;
    border: 2px solid black;
    border-radius: .2rem;
    display: flex;
    &>div{
        width: 100%;
    }
    .left{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 2px solid black;
        gap:1rem;
        .img{
            width: 60%;
            aspect-ratio: 1/1;
            background-color: #f1f1f1;
            padding: 1rem;
            border-radius: 50%;
            overflow: hidden;
        }
        h1{
            text-align: center;
            font-size: 1.4rem;
            text-transform: uppercase;
            font-weight: bold;
            
        }
    }
    .right{
        display: flex;
        justify-content: center;
        form{
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap:1rem;
            .date{
                width: 100%;
                font-size: 1.2rem;
                span{
                    font-weight: bold;
                }
            }
            .input{
                width: 100%;
                display: flex;
                flex-direction: column;
                gap:.2rem;
                label{
                    font-size: 1.2rem;
                }
                input{
                    padding: .1rem;
                    padding-left: .5rem;
                    font-size: 1.3rem;
                    border: none;
                    outline: none;
                    border: 2px solid black;
                    border-radius: .2rem;
                }
            }
        }
    }
}
</style>