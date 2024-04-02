<script>
    import {goto} from '$app/navigation';
    import {authenticatedUser} from '../../data-store'

    let authenticated = false;

    authenticatedUser.subscribe(value => {
        authenticated = value !== null
    });

    let username = ''
    let password = ''
    let errors = {}

    let handleLogin = () => {

        const endpoint = 'http://localhost:8000/authentication/login/'
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password})
        }

        fetch(endpoint, requestOptions)
            .then(response => response.json().then(data => ({status: response.status, body: data})))
            .then(data =>{
                if(data.status == 200){
                    authenticatedUser.set(data.body.user)
                    console.log(data.body.user)
                    goto('/')
                    console.log(authenticatedUser)
                }
                else{
                    errors = data.body
                }
            })
    }

    let redirectToRegister = () => {
        goto('/register/')
    };

    let handleLogout = () => {
        goto('/logout/')
    };
</script>

<h2>Login</h2>
{#if authenticated}
    <p>You need to logout to access this page</p>
    <button on:click={handleLogout}>Login</button>
{:else}
    <form on:submit|preventDefault={handleLogin}>
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
        <button type="submit">Login</button>
        <button on:click={redirectToRegister}>Register</button>
    </form>
{/if}
