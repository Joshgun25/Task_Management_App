<script>
import {goto} from '$app/navigation';
import {authenticatedUser} from '../../data-store'

    let authenticated = false;

    authenticatedUser.subscribe(value => {
        authenticated = value !== null
    });

    let username = ''
    let password = ''
    let email = ''
    let firstName = ''
    let lastName = ''
    let errors = {}

    let handleRegister = () => {
        const endpoint = 'http://localhost:8000/authentication/register/'
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password, email: email, first_name:firstName, last_name: lastName})
        }

        fetch(endpoint, requestOptions)
            .then(response => response.json().then(data => ({status: response.status, body: data})))
            .then(data =>{
                if(data.status == 201){
                    goto('/register/success/')
                }
                else{
                    errors = data.body
                }
            })
    }

    let redirectToLogin = () => {
        goto('/login/')
    };

    let handleLogout = () => {
        goto('/logout/')
    };
</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
</head>
<body>

<div class="col-12 col-md-4">
    <h2>User Registration</h2>
    {#if authenticated}\
        <p>You need to logout to access this page</p>
        <button on:click={handleLogout}>Login</button>
    {:else}
        <form on:submit|preventDefault={handleRegister}>
            <div class="mb-3">
                <label for="username">Username:</label>
                <input class="form-control" type="text" id="username" name="username" required bind:value={username}>
                {#if errors && errors.username}
                    <p classs="text-danger">{ errors.username[0] }</p>
                {/if}
            </div>
            <br>
            <div class="mb-3">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required bind:value={password}>
                {#if errors && errors.password}
                    <p classs="text-danger">{ errors.password[0] }</p>
                {/if}<br>
            </div>
            <br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required bind:value={email}><br>
            <br>
            <label for="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" bind:value={firstName}><br>
            <br>
            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" bind:value={lastName}><br>
            <br>
            <button type="submit">Register</button>
            <button on:click={redirectToLogin}>Login</button>
        </form>
    {/if}
</div>
</body>