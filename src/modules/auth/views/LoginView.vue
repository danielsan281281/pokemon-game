<template>
    <span class="login100-form-title p-b-41">
        Ingresar
    </span>
    <form class="login100-form validate-form p-b-33 p-t-5"
        @submit.prevent="onSubmit">

        <div class="wrap-input100 validate-input" data-validate = "Enter username">
            <input v-model="userForm.email" class="input100" type="text" placeholder="Correo" required>
            <span class="focus-input100" data-placeholder="&#xe818;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter password">
            <input v-model="userForm.password" class="input100" type="password" placeholder="Contraseña" required>
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button class="login100-form-btn">
                Login
            </button>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{ name: 'register' }">¿No tienes cuenta?</router-link>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'
import Swal from 'sweetalert2';

export default {
    setup() {
        const router = useRouter()
        const { loginUser } = useAuth()

        const userForm = ref({
            email: '',
            password: ''
        })

        return {
            userForm,
            onSubmit: async() => {
                const { ok, message } = await loginUser(userForm.value)
                console.log(ok, message);

                if( !ok )   Swal.fire('Error', message, 'error')
                else    router.push({ name: 'home' })
            }
        }
    }
}
</script>

<style>
    
</style>