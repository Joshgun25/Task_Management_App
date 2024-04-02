<script>
    import { goto } from '$app/navigation';
    import { authenticatedUser } from '../../data-store';

    let errors = null

    let authenticated = false;

    authenticatedUser.subscribe(value => {
        authenticated = value !== null
    });

    let handleLogout = async () => {

        const endpoint = 'http://localhost:8000/authentication/logout/';
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };
        
        fetch(endpoint, requestOptions)
            .then(response => {
                if (response.ok) {
                    authenticatedUser.set(null);
                    goto('../login/');
                } else {
                    errors = 'Failed to logout. Please try again.';
                }
            })
            .catch(error => {
                console.error('An error occurred during logout:', error);
                errors = 'An error occurred. Please try again later.';
            });
    };

    let redirectToHomePage = () => {
        goto('/')
    };

    const handleLogin = () => {
        goto('/login');
    }
</script>

<h2>Logout</h2>
{#if authenticated}
    <p>Do you want to logout?</p>
    <button on:click={handleLogout}>Yes</button>
    <button on:click={redirectToHomePage}>No</button>
{:else}
    <p>You need to login to access this page</p>
    <button on:click={handleLogin}>Login</button>
{/if}