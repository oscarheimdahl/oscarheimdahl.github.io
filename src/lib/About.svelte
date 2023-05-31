<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import oscar from '../assets/oscar.png';
  import chatup from '../assets/chatup.png';
  import washTime from '../assets/wash-time.png';
  import Paragraph from './Paragraph.svelte';
  import ProjectImage from './ProjectButton.svelte';
  import Heading from './Heading.svelte';
  import Confetti from './Icons/Confetti.svelte';
  import Glitter from './Icons/Glitter.svelte';
  import { explode } from '../konva/confetti';
  import { startBubbles } from '../konva/bubbles';
  import Bubbles from './Icons/Bubbles.svelte';

  let hideContent = false;
  let confettiMode = false;
  let bubbleMode = false;
  let bubbleModeInterval;

  onMount(() => {
    document.body.style.cursor = "url('../assets/svelte.svg')";
    setTimeout(() => {
      hideContent = false;
    }, 2000);

    document.addEventListener('click', fireConfetti);
  });

  onDestroy(() => {
    document.removeEventListener('click', fireConfetti);
  });

  function fireConfetti(e: MouseEvent) {
    const mouseX = e.x;
    const mouseY = e.y;
    if (confettiMode) explode({ x: mouseX, y: mouseY });
  }

  function toggleConfettiMode(e: MouseEvent) {
    if (confettiMode) return (confettiMode = false);
    e.stopPropagation();
    setTimeout(() => {
      confettiMode = !confettiMode;
      bubbleMode = false;
      clearInterval(bubbleModeInterval);
    });
  }
  function toggleBubbleMode(e: MouseEvent) {
    clearInterval(bubbleModeInterval);
    if (bubbleMode) return (bubbleMode = false);
    e.stopPropagation();
    bubbleMode = true;
    setTimeout(() => {
      if (!document.hasFocus()) return;
      confettiMode = false;
      startBubbles({ x: Math.random() * window.innerWidth });
      bubbleModeInterval = setInterval(() => {
        startBubbles({ x: Math.random() * window.innerWidth });
      }, 10000);
    });
  }
</script>

<div
  style:overflow={hideContent ? 'hidden' : 'scroll'}
  class="h-full flex justify-center"
>
  <div
    class:hide={hideContent}
    class={`content
            scroll-smooth bg-slate-100 shadow-lg rounded-t-xl
            relative flex justify-center
            mt-[36rem] mx-4 pt-36 pb-8 px-4 h-fit min-h-[calc(100dvh-24rem)]
            sm:px-[2vw]
            `}
  >
    <div class="img-container absolute -top-36 p-2 rounded-[2rem]">
      <img src={oscar} alt="oscar" class="profile-img w-64 h-64 rounded-3xl" />
    </div>
    <div class="absolute top-0 right-0 m-3 flex justify-end gap-2">
      <button
        on:click={toggleConfettiMode}
        class="group p-1 rounded-md scale-125 hover:bg-slate-300"
      >
        <Confetti colored={confettiMode} />
      </button>
      <button
        on:click={toggleBubbleMode}
        class="group p-1 rounded-md scale-125 hover:bg-slate-300"
      >
        <Glitter colored={bubbleMode} />
      </button>
      <button
        on:click={toggleBubbleMode}
        class="group p-1 rounded-md scale-125 hover:bg-slate-300"
      >
        <Bubbles colored={bubbleMode} />
      </button>
    </div>
    <div class=" flex flex-col gap-8">
      <div>
        <Heading>Om mig</Heading>
        <Paragraph>
          Hej! Oscar Heimdahl heter jag, här kan du läsa mer om mig och vad jag
          håller på med. Jag bor i centrala Luleå med min fru och våra två
          katter. Skulle jag beskriva mig själv, så skulle jag säga att jag är
          glad, driven, trevlig och lättlärd. Utöver att programmera så gillar
          jag discgolf, brädspel, pingis och datorspel.
        </Paragraph>
      </div>
      <div>
        <Heading>Erfarenhet</Heading>
        <div class="flex flex-col gap-5">
          <Paragraph>
            Jag har en
            <a
              class="underline"
              href="https://www.umu.se/utbildning/program/civilingenjorsprogrammet-i-interaktion-och-design/"
              >Civilingenjörsexamen i Interaktion och Design</a
            >
            där jag fick lära mig vikten av bra design samt fick en kärlek till utveckling.
            Min förmåga att lösa problem och mitt öga för design gör mig till en
            bra Front-end utvecklare.
          </Paragraph>
          <Paragraph>
            Javascript är mitt val av språk, och i webben och front-end trivs
            jag bäst. Har jobbat mycket med <i>React</i>, och är bekväm med
            andra ramverk som
            <i>Svelte</i>. På sista tiden har jag även suttit mycket med SSR i
            <i>NextJS</i>
            och <i>SvelteKit</i>.
          </Paragraph>
          <Paragraph>
            Har givetvis erfarenhet av backend också och är inte främmande med
            <i>Go,</i> <i>NodeJS,</i> och <i>PostgreSQL</i>.
          </Paragraph>
          <Paragraph>Idag jobbar jag som konsult på Cygni.</Paragraph>
        </div>
      </div>
      <div>
        <Heading>Projekt</Heading>
        <Paragraph>
          På fritiden kodar jag ofta för nöjets skull och för att lära mig nya
          spännande teknologier, exempel på vad jag hittat på hittar du här.
        </Paragraph>
        <div class="flex gap-8 justify-center mt-4">
          <ProjectImage img={chatup} alt={'chatt-projekt'} />
          <ProjectImage img={washTime} alt={'tvättids-projekt'} />
        </div>
      </div>
      <div>
        <Heading>Kontakt</Heading>
        <Paragraph>Jag finns att nå på dessa ställen, på återseende.</Paragraph>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

  .img-container {
    --color-shadow: rgba(54, 54, 169, 0.2) 0px 7px 29px 0px,
      rgba(39, 174, 140, 0.4) 0px 2px 8px 0px,
      rgba(215, 218, 30, 0.2) 0px -2px 8px 0px,
      rgba(166, 23, 135, 0.2) 0px 7px 29px 0px;

    box-shadow: var(--color-shadow);

    .profile-img {
      cursor: url('cursor.png') auto;
      background: linear-gradient(30deg, #000000 0%, hsl(240, 6%, 20%) 100%);
    }
  }

  .content {
    transition: transform 400ms;
    &.hide {
      transform: translateY(100vh);
    }
  }

  .wiggle {
    opacity: 0.2;
  }
</style>
