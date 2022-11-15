<script setup lang="ts">
import { Account, Models } from 'appwrite';
import { ref, Ref } from 'vue';
import { Router, useRouter } from 'vue-router';
import { useAppwrite, isLoggedIn } from './code/appwrite';
import { routeItem, useNavItems } from './code/nav';

const email: Ref<HTMLInputElement | null> = ref(null);
const password: Ref<HTMLInputElement | null> = ref(null);

const account: Account = new Account(useAppwrite());
const loggedIn: Ref<boolean> = ref(false);

isLoggedIn().then(loggedInStatus => loggedIn.value = loggedInStatus)

const nav: routeItem[] = useNavItems();

const router: Router = useRouter();


// onBeforeMount(() => {
//   const promise = account.get();

//   promise.then((loggedInUser: Models.Account<Models.Preferences>) => {
//     user.value = loggedInUser;
//   });
// });

const logout = () => {
  account.deleteSession("current");
  router.go(0);
}

const login = () => {

  const promise = account.createEmailSession(email.value?.value!, password.value?.value!)

  promise.then(async (response: Models.Session) => {
    router.go(0);
  }, (error: any) => {
    console.error(error);
  })
}

</script>

<template>
  <div class="min-h-screen w-screen flex flex-col bg-primary-darker text-secondary">

    <section class="h-16 flex items-center bg-primary gap-4">

      <p class="text-4xl font-semibold pb-1">&lt;Xander Dev/&gt;</p>

      <div class="text-4xl border-accent border h-8"></div>

      <div class="flex grow justify-between mr-4">
        <nav class="text-lg gap-4 flex">
          <RouterLink :to="navItem.to" class="hover:underline" v-for="navItem in nav">{{ navItem.name }}</RouterLink>
        </nav>

        <input type="button" class="hover:outline outline-1 outline-offset-1 outline-accent rounded px-2" value="Logout"
          id="logout" @click="logout" v-if="loggedIn">
      </div>
    </section>

    <div class="text-lg flex flex-col grow justify-center items-center" v-if="!loggedIn">
      <div class="grid grid-cols-3 grid-rows-4 gap-4 p-4 bg-primary rounded">
        <div class="col-span-3 text-2xl border-b pb-2 border-gray-600">Login</div>
        <label for="email">Email:</label>
        <input type="email" class="col-span-2 rounded focus:accent-accent text-black" name="email" id="email"
          ref="email">
        <label for="password">Password:</label>
        <input type="password" class="col-span-2 rounded focus:accent-accent text-black" name="password" id="password"
          ref="password">
        <input type="button" class="bg-accent text-black rounded col-start-3" value="login" id="login" @click="login">
      </div>
    </div>


    <RouterView />
  </div>
</template>
