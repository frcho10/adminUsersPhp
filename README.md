
- [Carpeta BackEnd](https://github.com/frcho10/adminUsersPhp/tree/main/backendAdminUsers)
- [Carpeta FrontEnd](https://github.com/frcho10/adminUsersPhp/tree/main/frontendAdminUsers)

## Pasos para generar base de datos

- logearse al usuario: root, password: vacío de mysql
- ejecutar el comando **create database backendadminusers_db;** una vez loggeado a mysql
- salir de la sesión de mysql **exit**
- ejecturar **php artisan migrate** para generar las migraciones de base de datos
- ejecutar **php artisan db:seed --class=UserSeeder** para generar los 100 registros aleatorios de base de datos
- ejecutar **php artisan serve**

## Pasos para ejecutar el front
- instalar yarn ejecutando en la línea de comandos **yarn**
- iniciar el proyecto ejecutando **yarn run dev**
