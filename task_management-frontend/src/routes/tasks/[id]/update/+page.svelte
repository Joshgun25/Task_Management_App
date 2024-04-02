<script>
    import {TasksStore, authenticatedUser} from '../../../../data-store'
    import {goto} from '$app/navigation'
    import {onMount} from 'svelte'

    let authenticated = false;

    authenticatedUser.subscribe(value => {
        authenticated = value !== null
    });
    
    let title = '';
    let description = '';
    let deadline = ''
    export let data;
    let id;
    
    let handleSubmit = () => {
        const endpoint = `https://taskbackend-8290864ed371.herokuapp.com/api/tasks/${id}/`
        let data = new FormData()
        data.append('author', 1)
        data.append('title', title)
        data.append('deadline', deadline)
        data.append('description', description)

        fetch(endpoint, {method: 'PUT', body: data}).then(response => response.json()).then(data => {
            TasksStore.update(prev => {
                let updatedTasks = $TasksStore.slice()
                let index = updatedTasks.findIndex(task => task.id == data.id)
                updatedTasks[index] = data
                return updatedTasks
            })
        })
        goto('/tasks/')
    }

    onMount(async function() {
        id = data.id
        let task = {}
        if ($TasksStore.length) {
            task = $TasksStore.find(task => task.id == id)
        } else {
            const endpoint = `https://taskbackend-8290864ed371.herokuapp.com/api/tasks/${data.id}/`
            let response = await fetch(endpoint)
            if (response.status == 200) {
                task = await response.json()
            } else {
                task = null;
            }
        }
        ({title, description, deadline} = task)
    })

    const handleLogin = () => {
        goto('/login');
    }

</script>

{#if authenticated}
<div>
    <h2 class="my-4">Update a Task</h2>
    <div class="col-12 col-md-6">
        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-3">
                <label for="title">Title:</label>
                <input class="form-control" type="text" placeholder="title" bind:value={title}/>
            </div>
            <br>
            <div class="mb-3">
                <label for="deadline">Deadline:</label>
                <input class="form-control" type="datetime-local" placeholder="deadline" bind:value={deadline}/>
            </div>
            <br>
            <div class="mb-3">
                <label for="description">Description:</label>
                <textarea bind:value={description}></textarea>
            </div>
            <br>
            <button class="btn btn-primary" type="submit">Submit</button>
            <button class="btn btn-secondary" on:click={() => goto('/tasks/')}>Back to Task List</button>
        </form>
    </div>
</div>
{:else}
    <p>You need to login to access this page</p>
    <button on:click={handleLogin}>Login</button>
{/if}