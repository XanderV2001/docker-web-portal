<script setup lang="ts">
import { Account, Models } from 'appwrite';
import { onMounted, ref, Ref } from 'vue';
import { useAppwrite, logout } from './code/appwrite';

const user: Ref<Models.Account<Models.Preferences> | null> = ref(null);
const email: Ref<HTMLInputElement | null> = ref(null);
const password: Ref<HTMLInputElement | null> = ref(null);

const account = new Account(useAppwrite());


onMounted(() => {
  try {
    const promise = account.get();

    promise.then((loggedInUser: Models.Account<Models.Preferences>) => {
      user.value = loggedInUser;
    });
  } catch {

  }
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
  <div class="min-h-screen w-screen bg-primary-darker text-secondary">

    <section class="h-16 flex items-center bg-primary gap-4">

      <p class="text-4xl font-semibold pb-1">&lt;Xander Dev/&gt;</p>

      <div class="text-4xl border-accent border h-8"></div>

      <nav class="text-lg gap-4 flex">
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
      </nav>

    </section>

    <div class="text-2xl ">
      Currently logged in user: {{ user?.name }}
    </div>

    <div class="text-lg">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" ref="email">
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" ref="password">
      <input type="button" value="login" id="login" @click="login">
    </div>


    <input type="button" value="logout" id="logout" @click="logout">
    <RouterView />
  </div>
</template>
