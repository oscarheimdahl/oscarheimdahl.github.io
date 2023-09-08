<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import oscar from '../assets/oscar.png';
  import chatup from '../assets/chatup.png';
  import washTime from '../assets/wash-time.png';
  import Paragraph from './Paragraph.svelte';
  import ProjectButton from './Project/ProjectButton.svelte';
  import Heading from './Heading.svelte';
  import Confetti from './Icons/Confetti.svelte';
  import Glitter from './Icons/Glitter.svelte';
  import { explode } from '../konva/confetti';
  import Bubbles from './Icons/Bubbles.svelte';
  import { hideBackground } from '../store/store';
  import ModeButton from './ModeButton.svelte';
  import { fireSpiral } from '../konva/spiral';
  import { toggleOrbs } from '../konva/orbs';

  let hideContent = false;
  type Mode = 'confetti' | 'orbs' | 'spiral' | '';
  let mode: Mode = '';
  let bubbleModeInterval;

  onMount(() => {
    document.body.style.cursor = "url('../assets/svelte.svg')";
    setTimeout(() => {
      hideContent = false;
    }, 2000);

    document.addEventListener('click', handleClick);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClick);
  });

  function handleClick(e: MouseEvent) {
    const mouseX = e.x;
    const mouseY = e.y;
    if (mode === 'confetti') explode({ x: mouseX, y: mouseY });
    if (mode === 'spiral') fireSpiral({ x: mouseX, y: mouseY });
    // if (mode === 'orbs') toggleOrbs({ x: mouseX, y: mouseY });
  }

  function toggleMode(e: MouseEvent, _mode: Mode) {
    e.stopPropagation();
    toggleOrbs(false);
    if (mode === _mode) {
      clearInterval(bubbleModeInterval);
      hideBackground.set(false);
      mode = '';
      document.body.style.cursor = 'initial';
      return;
    }
    document.body.style.cursor = 'pointer';
    hideBackground.set(true);
    clearInterval(bubbleModeInterval);
    setTimeout(() => {
      mode = _mode;
      if (_mode === 'orbs') toggleOrbs(true);
    });
  }

  // function toggleBubbleMode(e: MouseEvent) {
  //   if (mode === 'bubble') return modeOff(e);

  //   setTimeout(() => {
  //     if (!document.hasFocus()) return;
  //     confettiMode = false;
  //     startBubbles({ x: Math.random() * window.innerWidth });
  //     bubbleModeInterval = setInterval(() => {
  //       startBubbles({ x: Math.random() * window.innerWidth });
  //     }, 10000);
  //   });
  // }
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
            mt-[26rem] mx-4 pt-36 pb-8 px-4 h-fit min-h-[calc(100dvh-24rem)]
            sm:px-[2vw] sm:mt-[36rem]
            `}
  >
    <div class="img-container absolute -top-36 p-2 rounded-[2rem]">
      <img src={oscar} alt="oscar" class="profile-img w-64 h-64 rounded-3xl" />
    </div>
    <div class="absolute top-0 right-0 m-3 justify-end gap-2 hidden sm:flex">
      <ModeButton on:click={(e) => toggleMode(e, 'confetti')}>
        <Confetti colored={mode === 'confetti'} />
      </ModeButton>
      <ModeButton on:click={(e) => toggleMode(e, 'orbs')}>
        <Bubbles colored={mode === 'orbs'} />
      </ModeButton>
      <ModeButton on:click={(e) => toggleMode(e, 'spiral')}>
        <Glitter colored={mode === 'spiral'} />
      </ModeButton>
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
          <ProjectButton name="ChatUp" index={1} img={chatup} />
          <ProjectButton name="Tvättid" index={2} img={washTime} />
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
