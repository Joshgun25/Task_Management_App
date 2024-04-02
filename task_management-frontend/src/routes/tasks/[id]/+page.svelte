<script>
    import {TasksStore, authenticatedUser} from '../../../data-store'
    import { onMount } from "svelte";
    import { formatDatetime } from '../../../datetime-converter'
    import { goto } from '$app/navigation';

    let authenticated = false;

    authenticatedUser.subscribe(value => {
        authenticated = value !== null
    });

    export let data;
    let task;

    onMount(async function() {
        if ($TasksStore.length) {
            task = $TasksStore.find(task => task.id == data.id)
        } else {
            const endpoint = `http://localhost:8000/api/tasks/${data.id}/`
            let response = await fetch(endpoint)
            if (response.status == 200) {
                task = await response.json()
            } else {
                task = null;
            }
        }
    })

    const handleLogin = () => {
        goto('/login');
    }

</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Detail</title>
</head>
<body>
    {#if authenticated}
        {#if task }
            <h1>Task Detail</h1>
            <p><strong>Title:</strong> { task.title }</p>
            <p><strong>Description:</strong> { task.description }</p>
            <p><strong>Creator:</strong> { task.author_username }</p>
            <p><strong>Created At:</strong> { formatDatetime(task.created_at) }</p>
            <p><strong>Deadline:</strong> { formatDatetime(task.deadline) }</p>
            <button class="btn btn-primary mt-2" on:click={() => goto(`/tasks/${task.id}/update`)}>Update</button>
        {:else }
            <p>No task was found with ID {data.id}</p>
        {/if }
        <button class="btn btn-primary mt-2" on:click={() => goto('/tasks/')}>Back to Tasks List</button>
    {:else}
        <p>You need to login to access this page</p>
        <button on:click={handleLogin}>Login</button>
    {/if}
</body>