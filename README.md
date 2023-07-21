### Lo que sabemos de la aplicación

- El proyecto fue creado en una estructura de [Monorepo utilizando NPM](https://docs.npmjs.com/cli/v7/using-npm/workspaces).
- El Frontend se encuentra en la carpeta `frontend`. Aunque está totalmente vacia.
- El Backend se encuentra en la carpeta `api`.
- El Backend es una aplicación típica de Node.js usando el framework de Express. Además de otras utilidades.
- Hay una conexión a una base de datos MongoDB.

## Actividades principales a realizar 
La aplicaión esta creada inicialmente con finalidad de registrar usuarios, hacer login, y una vez que esten logueados, 
tener la opción de obtener, modificar o  eliminar perfiles de usuario. 

Keywords: bcrypt, salt, hash, jwt, jose, SingJWT. 

###  Algunos casos
# 1. Al momento de crear un usuario, existe una falla de seguridad muy grande, intenta corregirla
1. Terminar el back para que cumpla con las especificaciones de la aplicación
# 1. Proteger los endpoint necesarios ya que solo usuarios autenticados pueden acceder a su perfil. Implementar alguna forma de  saber si el usuario inició sesión e identificar quién es.
