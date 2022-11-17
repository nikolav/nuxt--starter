<script setup lang="ts">
import { useStoreMain } from "@/store";

const { data } = useFetch("/api/status");
const { store: storeMain, put: putMain, drop: dropMain } = useStoreMain();
const [isActive, toggle] = useToggle(false);
const count = ref(0);
const increment = () => (count.value += 1);
const putTest = () => putMain(() => ({ test1: Date.now(), test2: Date.now() }));
const dropTest = () => dropMain("test2");
const onOff = computed(() => (isActive.value ? "on" : "off"));
const { savePdf } = useSavePdf();
const pdf = () =>
  savePdf({
    locals: {
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolores similique debitis. Repellat eveniet velit ipsum voluptatum voluptatibus dolorem vel, voluptate mollitia quasi quaerat quae at doloribus unde, blanditiis minima! --${Date.now()}`,
    },
  });
const { sendMail } = useSendMail();
const email = async () => {
  const res = await sendMail({
    message: {
      to: "admin@nikolav.rs",
      subject: "@subject, text-message",
    },
    locals: {
      message: `--${Date.now()}`,
    },
  });
  console.log(res);
};
</script>

<template>
  <section class="**prose">
    <button @click="email" class="button">email</button>
    <button @click="pdf" class="button">pdf</button>
    <button @click="increment" class="button">ok [{{ count }}]</button>
    <button @click="() => toggle()" class="button">{{ onOff }}</button>
    <button @click="putTest" class="button">test</button>
    <button @click="dropTest" class="button">drop-test</button>
    <p v-if="isActive">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat facere ab
      quam, laboriosam, perferendis molestias aliquam consequuntur rem ex
      dolorum laudantium nesciunt tenetur, maiores modi ipsam quis nostrum
      excepturi vel?
    </p>
    <pre>
      {{ JSON.stringify(storeMain, null, 2) }}
    </pre>
    <pre>
      {{ JSON.stringify(data, null, 2) }}
    </pre>
  </section>
</template>

<style scoped></style>
