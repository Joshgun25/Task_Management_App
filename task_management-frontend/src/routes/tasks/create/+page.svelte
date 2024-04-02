<script>
    import {TasksStore, authenticatedUser} from '../../../data-store'
    import {goto} from '$app/navigation';
    
    let userId = null;
    let authenticated = false;

    authenticatedUser.subscribe(value => {
        userId = value ? value.id : null
        authenticated = value !== null
    });

    let title = '';
    let description = '';
    let deadline = ''

    let handleSubmit = () => {
        const isoDeadline = new Date(deadline).toISOString();
        console.log(deadline)
        console.log(isoDeadline)
        const endpoint = 'https://taskbackend-8290864ed371.herokuapp.com/api/tasks/create/'
        let data = new FormData()
        data.append('author', userId)
        data.append('title', title)
        data.append('deadline', isoDeadline)
        data.append('description', description)

        fetch(endpoint, {method: 'POST', body: data}).then(response => response.json()).then(data => {
            TasksStore.update(prev => [...prev, data])
            goto('/tasks/')
        })     
    }

    const handleLogin = () => {
        goto('/login');
    }
</script>

{#if authenticated}
    <div>
        <h2 class="my-4">Add a new Task</h2>
        <div class="col-12 col-md-6">
            <form on:submit|preventDefault={handleSubmit}>
                <div class="mb-3">
                    <label for="title">Title:</label>
                    <input class="form-control" type="text" placeholder="title" bind:value={title}/>
                </div>
                <div class="mb-3">
                    <label for="deadline">Deadline:</label>
                    <input class="form-control" type="datetime-local" placeholder="deadline" bind:value={deadline}/>
                </div>
                <div class="mb-3">
                    <label for="description">Description:</label>
                    <textarea bind:value={description}></textarea>
                </div>
                <br>
                <button class="btn btn-primary" type="submit">Submit</button>
                <button class="btn btn-primary mt-2" on:click={() => goto('/tasks/')}>Back to Tasks List</button>
            </form>
        </div>
    </div>
{:else}
    <p>You need to login to access this page</p>
    <button on:click={handleLogin}>Login</button>
{/if}