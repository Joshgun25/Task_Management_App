import {writable} from 'svelte/store' 

export const TasksStore = writable([])
export const authenticatedUser = writable(null);