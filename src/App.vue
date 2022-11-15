<script setup lang="ts">
import { Account, Models } from 'appwrite';
import { onMounted, ref, Ref } from 'vue';
import { useAppwrite } from './code/appwrite';

const user: Ref<Models.Account<Models.Preferences> | null> = ref(null);
const email: Ref<HTMLInputElement | null> = ref(null);
const password: Ref<HTMLInputElement | null> = ref(null);

const account = new Account(useAppwrite());


onMounted(() => {

  const promise = account.get();

  promise.then((loggedInUser: Models.Account<Models.Preferences>) => {
    user.value = loggedInUser;
  }, error => {
    console.error(error);
  })

});


const login = () => {

  const promise = account.createEmailSession(email.value?.value!, password.value?.value!)

  promise.then(async (response: Models.Session) => {
    user.value = await account.get();
  }, (error: any) => {
    console.error(error);
  })
}

</script>

<template>
  <div class="text-2xl">
    <h1>Currently logged in user: {{ user?.name }}</h1>
  </div>

  <div class="text-lg">
    <label for="email">Email:</label>
    <input type="email" name="email" id="email" ref="email">
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" ref="password">
    <input type="button" value="login" id="login" @click="login">
  </div>
</template>
