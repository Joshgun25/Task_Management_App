<script>
    import {TasksStore} from '../../../tasks-store'
    import { onMount } from "svelte";

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

</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Detail</title>
</head>
<body>
    {#if task }
        <h1>Task Detail</h1>
        <p><strong>Title:</strong> { task.title }</p>
        <p><strong>Description:</strong> { task.description }</p>
        <p><strong>Creator:</strong> { task.author }</p>
        <p><strong>Created At:</strong> { task.created_at }</p>
        <p><strong>Deadline:</strong> { task.deadline }</p>
        <a href="/tasks/{task.id}/update" class="btn btn-primary mt-2">Update</a>
    {:else }
        <p>No task was found with ID {data.id}</p>
    {/if }
    <a href="/tasks/">Back to Product List</a>
</body>