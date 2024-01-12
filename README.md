# Sala de chat | Parte frontend

Bienvenido! Te invito a conocer mi primer chat grupal. Tengo muchas cosas en mente todavía, pero es lo suficientemente funcional como para que lo puedas usar.

La parte Backend (necesaria para que funcione) se encuentra [aquí](https://github.com/Ale6100/Chat-js.git).

Utiliza la versión más reciénte del proyecto subido a la web [aquí](https://chat-ts.netlify.app/).

## Comenzando 🚀

Lee atentamente las siguientes instrucciones si deseas obtener una copia funcional del proyecto en tu computadora.

Descargar el archivo comprimido _zip_ desde el botón "code" o hacer click [aquí](https://github.com/Ale6100/Chat-ts-parte-front/archive/refs/heads/main.zip).

Mira **Despliegue** para conocer cómo desplegar el proyecto en tu computadora.

### Pre-requisitos 📋

Necesitas tener previamente descargado e instalado [NodeJs](https://nodejs.org/).

### Instalación 🔧

Instala las dependencias con el comando

```
npm install
```

Es necesario la creación de dos variables de entorno mediante la elaboración de un archivo .env en el mismo nivel de la carpeta src. Este archivo debe ser completado con los siguientes campos, los cuales deberán ser modificados con tus propias credenciales en lugar del valor X.

```env
VITE_BACKEND_URL = X # URL de tu backend sin barra lateral final

VITE_ACCESS_TOKEN = X # Cadena de caracteres utilizado como mecanismo de autenticación para asegurar que solamente los usuarios que presenten este token en los encabezados de sus solicitudes puedan acceder al backend. Importante: Su valor tiene que ser el mismo que el de la variable de entorno TOKEN_GRAL que ponés en el backend
```

## Despliegue 📦

Corre el proyecto con el comando

```
npm run dev
```

*Importante*: Asegúrate de que la [parte backend](https://github.com/Ale6100/Chat-js.git) esté ejecutándose

## Construido con 🛠️

* CSS
* [TypeScript](https://www.typescriptlang.org/)
* [ReactJS](https://reactjs.org/)
* [NodeJs](https://nodejs.org/)
* [Tailwind](https://tailwindcss.com/)
* [Vite](https://vitejs.dev/)
* [uiball-loaders](https://uiball.com/loaders/)
* [toastify-js](https://www.npmjs.com/package/toastify-js)
* [sweetalert2](https://sweetalert2.github.io/)
* [socket.io-client](https://www.npmjs.com/package/socket.io-client)

## Autor ✒️

| <img src="https://avatars.githubusercontent.com/u/107259761?v=4" width=50>|
|:-:|
| **Alejandro Portaluppi** |
| <a href="https://github.com/Ale6100"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/alejandro-portaluppi"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a> |
