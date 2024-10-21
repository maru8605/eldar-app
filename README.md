# Proyecto Angular con Firebase

Este proyecto es una aplicación Angular que utiliza Firebase para la autenticación de usuarios y un interceptor para manejar tokens.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Angular CLI](https://angular.io/cli) (instalación: `npm install -g @angular/cli`)
- [Firebase CLI](https://firebase.google.com/docs/cli) (instalación: `npm install -g firebase-tools`)



## Pasos para Levantar el Proyecto 

1. **Clonar el Repositorio**

   Clona el repositorio en tu máquina local:

   ```bash
   git clone git@github.com:maru8605/eldar-app.git
   cd eldar-app
   ```

2. **Instalar Dependencias**

   Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias:

   ```bash
   npm install
   ```
## Si queres usar tus credenciales 

3. **Configurar Firebase**

   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Agrega una aplicación web y copia la configuración de Firebase.
   - Reemplaza la configuración en `src/environments/environment.ts` con la configuración de tu proyecto de Firebase.

4. **Iniciar el Servidor de Desarrollo**

   Ejecuta el siguiente comando para iniciar el servidor de desarrollo:

   ```bash
   ng serve
   ```

   La aplicación estará disponible en `http://localhost:4200/`.

5. **Acceder a la Aplicación**

   Abre tu navegador y navega a `http://localhost:4200/` para ver la aplicación en funcionamiento.

## Sino podes usar las siguientes credenciales 
**user** : admin-test@test.com | 12345678
           user-test@test.com  | 12345678

