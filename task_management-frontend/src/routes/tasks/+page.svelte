<script>
    import { onMount } from 'svelte';
    import {TasksStore} from '../../tasks-store'

    
    onMount(async function () {
        if (!$TasksStore.length) {
            const endpoint = 'http://127.0.0.1:8000/api/tasks'
            const response = await fetch(endpoint)
            const data = await response.json() 
            TasksStore.set(data)
        }
    })  

    let handleDelete = (id) => {
        const endpoint = `http://localhost:8000/api/tasks/${id}`
        fetch(endpoint, {method: 'DELETE'}).then(response => {
            if (response.status == 204) {
                TasksStore.update(prev => prev.filter(task => task.id != id))
            }
        })
    }

    // Sorting and filtering logic
</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product List</title>
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
    <h1>Tasks List</h1>
    <a href="/tasks/create" class="btn btn-primary mt-2">Create New</a>

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
            {#each $TasksStore as task}
                <tr>
                    <td><a href="/tasks/{task.id}">{ task.title }</a></td>
                    <td>{ task.deadline }</td>
                    <td>{ task.author }</td>
                    <td>{ task.created_at }</td>
                    <td><button on:click={() => handleDelete(task.id)} class="btn btn-danger ml-2">
                        Delete 
                    </button></td>
                </tr>
                {/each}
        </tbody>
    </table>
</body>
