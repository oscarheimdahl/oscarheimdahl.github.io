import { writable } from 'svelte/store';

export enum Views {
  Start = 0,
  About,
}

export const count = writable(Views.Start);
