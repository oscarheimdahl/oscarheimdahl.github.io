<script>
  import Link from './Link.svelte';
  import Email from './icons/Email.svelte';
  import Github from './icons/Github.svelte';
  import LinkedIn from './icons/LinkedIn.svelte';
</script>

<div class="flex gap-1 justify-center mt-4">
  <Link href="https://www.linkedin.com/in/oscar-heimdahl-9b9428152/">
    <LinkedIn />
  </Link>
  <Link href="https://www.github.com/oscarheimdahl">
    <Github />
  </Link>
  <Link href="mailto:o.heimdahl@gmail.com">
    <div class="translate-y-[2px]">
      <Email />
    </div>
  </Link>
</div>
