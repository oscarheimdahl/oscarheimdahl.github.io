import { writable } from 'svelte/store';

export const showProjectModal = writable<0 | 1 | 2>(0);
export const hideBackground = writable(true);
