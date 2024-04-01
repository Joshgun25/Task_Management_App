<script>
    import {TasksStore} from '../../../../tasks-store'
    import {goto} from '$app/navigation'
    import {onMount} from 'svelte'
    
    let title = '';
    let description = '';
    let deadline = ''
    export let data;
    let id;
    

    let handleSubmit = () => {
        const endpoint = `http://localhost:8000/api/tasks/${id}/`
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
            film = $TasksStore.find(task => task.id == id)
        } else {
            const endpoint = `http://localhost:8000/api/tasks/${data.id}/`
            let response = await fetch(endpoint)
            if (response.status == 200) {
                task = await response.json()
            } else {
                task = null;
            }
        }
        ({title, description, deadline} = task)
    })

</script>


<div>

    <h2 class="my-4">Update a Task</h2>
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