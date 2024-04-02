<script>
    import { goto } from '$app/navigation';
    import { authenticatedUser } from '../data-store';

    let authenticated = false;

    authenticatedUser.subscribe(value => {
        authenticated = value !== null
    });

    let handleLogout = () => {
        goto('/logout/')
    };

    let redirectToLogin = () => {
        goto('/login/')
    };

    let redirectToRegister = () => {
        goto('/register/')
    };

    let redirectToTaskList = () => {
        goto('/tasks/')
    };
</script>

<h2>Home</h2>

{#if authenticated}
    <p>Welcome, you are logged in!</p>
    <button on:click={handleLogout}>Logout</button>
    <button on:click={redirectToTaskList}>Tasks List</button>
{:else}
    <p>Please log in or register to continue.</p>
    <button on:click={redirectToLogin}>Login</button>
    <button on:click={redirectToRegister}>Register</button>
{/if}
