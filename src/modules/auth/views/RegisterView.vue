<template>
    <span class="login100-form-title p-b-41">
        Registro
    </span>
    <form class="login100-form validate-form p-b-33 p-t-5"
        @submit.prevent="onSubmit"> <!-- prevent para que no haga el refresco de todo el navegador -->

        <div class="wrap-input100 validate-input" data-validate = "Introduzca su nombre">
            <input v-model="userForm.name" class="input100" type="text" placeholder="Nombre" required>
            <span class="focus-input100" data-placeholder="&#xe82a;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate = "Introduzca su correo">
            <input v-model="userForm.email" class="input100" type="text" placeholder="Correo" required>
            <span class="focus-input100" data-placeholder="&#xe818;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Introduzca su contraseña">
            <input v-model="userForm.password" class="input100" type="password" placeholder="Contraseña" required>
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button type="submit" class="login100-form-btn">
                Crear cuenta
            </button>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
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
        const { createUser } = useAuth()

        const userForm = ref({
            name: '',
            email: '',
            password: ''
        })

        return {
            userForm,
            onSubmit: async() => {
                const { ok, message } = await createUser(userForm.value)
                console.log(ok, message);

                if( !ok )   Swal.fire('Error', message, 'error')
                else {
                    Swal.fire('Registro', 'Cuenta creada correctamente', 'success')
                    router.push({ name: 'login' })
                }
            }
        }
    }
}
</script>

<style>
    
</style>