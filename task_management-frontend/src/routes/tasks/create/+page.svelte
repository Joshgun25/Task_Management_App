<script>
    import {TasksStore} from '../../../tasks-store'
    import {goto} from '$app/navigation';
    
    let title = '';
    let description = '';
    let deadline = ''
    export let data;

    let handleSubmit = () => {
        const endpoint = 'http://localhost:8000/api/tasks/create/'
        let data = new FormData()
        data.append('author', 1)
        data.append('title', title)
        data.append('deadline', deadline)
        data.append('description', description)

        fetch(endpoint, {method: 'POST', body: data}).then(response => response.json()).then(data => {
            TasksStore.update(prev => [...prev, data])
            goto('/tasks/')
        })
            
    }
</script>


<div>

    <h2 class="my-4">Add a new Task</h2>
    <div class="col-12 col-md-6">
        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-3">
                <input class="form-control" type="text" placeholder="title" bind:value={title}/>
            </div>
            <div class="mb-3">
                <input class="form-control" type="datetime-local" placeholder="deadline" bind:value={deadline}/>
            </div>
            <div class="mb-3">
                <input class="form-control" type="text" placeholder="description" bind:value={description}/>
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    </div>

</div>