# JulioBot

ChatBot para WhatsApp creado con Node.js y [wa-automate-nodejs](https://github.com/open-wa/wa-automate-nodejs)

### Como instalar:

    git clone https://github.com/diegocamy/JulioBot.git
    cd juliobot
    npm install
    npm run start

### Como funciona?

Basta enviarle por mensaje privado o en un grupo uno de los comandos disponibles

### Comandos disponibles

| Comando    | Parámetro | Descripción                                                     |
| ---------- | --------- | --------------------------------------------------------------- |
| !ayuda     | N/A       | Obtener ayuda sobre los comandos disponibles                    |
| !filme     | genero    | Obtener recomendación de pelicula                               |
| !porneta   | busqueda  | Busca altos videos porneta!                                     |
| !horoscopo | signo     | Obtener tu horóscopo para el día de hoy                         |
| !versiculo | N/A       | Obtener un versículo bíblico aleatorio                          |
| !agua      | on/off    | Inicia/Desactiva el recordatorio para hidratarse durante el día |

##### \*Para que funcione la recomendación de películas se debe tener una API Key de [The Movie Database](https://www.themoviedb.org/)
