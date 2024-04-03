<script>
    import { onMount } from 'svelte'
    import {TasksStore, authenticatedUser} from '../../data-store'
    import { formatDatetime } from '../../datetime-converter'
    import { goto } from '$app/navigation';

    let authenticated = false;
    let filteredTasks = [];

    authenticatedUser.subscribe(value => {
        authenticated = value !== null
    });

    onMount(async function () {
        if (!$TasksStore.length) {
            const endpoint = 'https://taskbackend-8290864ed371.herokuapp.com/api/tasks'
            const response = await fetch(endpoint)
            const data = await response.json() 
            TasksStore.set(data)
        }
    })  

    let handleDelete = (id) => {
        const endpoint = `https://taskbackend-8290864ed371.herokuapp.com/api/tasks/${id}`
        fetch(endpoint, {method: 'DELETE'}).then(response => {
            if (response.status == 204) {
                TasksStore.update(prev => prev.filter(task => task.id != id))
            }
        })
    }

    const handleLogin = () => {
        goto('/login');
    }

    let searchTerm = "";

    const searchTasks = () => {	
		return filteredTasks = $TasksStore.filter(task => {
			let taskTitle = task.title.toLowerCase();
            let taskAuthor = task.author_username.toLowerCase();
			return (taskTitle.includes(searchTerm.toLowerCase()) || taskAuthor.includes(searchTerm.toLocaleLowerCase()))
		});
	}

</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tasks List</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    {#if authenticated}
        <h1>Tasks List</h1>
        <button class="btn btn-primary mt-2" on:click={() => goto('/tasks/create')}>Create New</button>
        <button class="btn btn-primary mt-2" on:click={() => goto('/')}>Home Page</button>
        <br><br>
        <div id="search-input-cont">
            <input type="text" 
                         id="search-field" 
                         placeholder="Enter Search Term" 
                         autocomplete="off"
                         bind:value={searchTerm}
                         on:input={searchTasks}/>
        </div> 
        <br>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Deadline</th>
                    <th>Author</th>
                    <th>Created At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#if searchTerm && filteredTasks.length === 0}
                    <p>No Result</p>
                {:else if filteredTasks.length > 0}
                    {#each filteredTasks as task}
                        <tr>
                            <td><a href="/tasks/{task.id}">{ task.title }</a></td>
                            <td>{ formatDatetime(task.deadline) }</td>
                            <td>{ task.author_username }</td>
                            <td>{ formatDatetime(task.created_at) }</td>
                            <td><button on:click={() => handleDelete(task.id)} class="btn btn-danger ml-2">
                                Delete 
                            </button></td>
                        </tr>
                    {/each}
                {:else}
                    {#each $TasksStore as task}
                    <tr>
                        <td><a href="/tasks/{task.id}">{ task.title }</a></td>
                        <td>{ formatDatetime(task.deadline) }</td>
                        <td>{ task.author_username }</td>
                        <td>{ formatDatetime(task.created_at) }</td>
                        <td><button on:click={() => handleDelete(task.id)} class="btn btn-danger ml-2">
                            Delete 
                        </button></td>
                    </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    {:else}
        <p>You need to login to access this page</p>
        <button on:click={handleLogin}>Login</button>
    {/if}
</body>
