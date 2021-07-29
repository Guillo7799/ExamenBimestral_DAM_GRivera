# Examen Bimestral Apps Móviles

ESTUDIANTE: Guillermo Rivera

EXPLICACIÓN DEL PROCEDIMIENTO

1.- Para el desarrollo de la aplicación, se creó el proyecto en firebase para poder hacer uso de las credenciales del mismo.
Es importante definir la estructura de los archivos, en este caso se configura en el ImageCollection que a lo que se envíe una imagen, se guarde el token del usuario
que realiza la actividad, como se muestra en la figura:
![imagen](https://user-images.githubusercontent.com/66130599/127412668-4def0605-f55e-46b0-8c51-cc8f565d2c3a.png)
La estructura quedaría de la siguiente manera: 
![imagen](https://user-images.githubusercontent.com/66130599/127412897-1068334b-cd3b-49c2-9e29-933888ab03df.png)

2.- Posterior a eso se configura la parte de la autenticación, en este caso habilité para que se pueda loguear con un correo y con la cuenta de google, 
como se muestra en la figura:
![imagen](https://user-images.githubusercontent.com/66130599/127412957-f2531558-cea7-49f8-9e4c-6523b2c4f690.png)


3.- Se crea el proyecto con Ionic - Angular y se definen las interfaces necesarias para el funcionamiento
![imagen](https://user-images.githubusercontent.com/66130599/127413016-de1d419d-bcb9-49ef-9145-545ed53727ab.png)


4.- Se configuran las variables de entorno con las credenciales que nos da firebase
![imagen](https://user-images.githubusercontent.com/66130599/127413039-54052085-d217-4b49-b4ab-19ff06d9e329.png)

5.- La interfaz de chat se realizará en "dashboard", quedaría de la siguiente manera: 
![imagen](https://user-images.githubusercontent.com/66130599/127413211-e2178902-3954-4900-b746-eb3653c446a2.png)
Como se ilustra en la figura, se ven todas las conversaciones al ser un chat general, también al lado izquierdo del botón de enviar mensaje
se encuentra el de adjuntar imagen, el cual envía automáticamente el archivo, aunque, también se muestra una notificación en la parte superior sobre 
el estado del envío, de la siguiente manera:
![imagen](https://user-images.githubusercontent.com/66130599/127413328-7f5b2ad4-c994-4d39-9d18-8c415cb94567.png)


6.- Para la realización del chat se realizó la implementación:
En la parte de dashboard.module.ts se hace la importación de las variables necesarias para adjuntar la imagen a parte de las del envío del chat.
Para la conexión con la base y el registro de los usuarios y sus mensajes se realiza por medio de "services" donde se hace la configuración 
de los atributos que se van a almacenar a manera de colecciones en firebase de tal manera:
![imagen](https://user-images.githubusercontent.com/66130599/127413828-eef1bd49-98d1-4edd-9e5d-dc0fde7b987b.png)
a contiguación se definen una serie de funciones para poder hacer las validaciones y captar los datos que ingresa el usuario y de esta manera registrarlos en la base, las 
funciones son:
![imagen](https://user-images.githubusercontent.com/66130599/127413963-4d5448ee-c5f5-4c59-a6f1-7f22764cf3d4.png)
![imagen](https://user-images.githubusercontent.com/66130599/127413997-8b2220ab-a717-4ad5-9a7c-7da47101b459.png)

Para las validaciones a nivel de front se realizan una serie de funciones como se muestra en "src/dashboard.page.ts" de tal manera que en el "src/dashboard.page.html"
se pueda hacer el llamado a dichas funciones.

7.- Para la implementación del boton de subida y envío de imágenes se realiza agregando ciertas clases en las importaciones como se mencionaba anteriormente,
posterior a eso se realiza la definición y llamado de las funciones que validan si la imagen cumple con las reglas de validación y de tal manera se registra en la base
IMPORTANTE, debido a que se quiere conocer qué usuario realizó el envío de la imagen, se debe de mantener la regla de firebase que dice que solo usuarios autenticados pueden realizar la acción, de tal manera:
![imagen](https://user-images.githubusercontent.com/66130599/127414543-9fe0ab91-bbdc-4492-8f11-ac096ed99ac2.png)

Como funcionamiento final, quedan las siguientes interfaces:
![imagen](https://user-images.githubusercontent.com/66130599/127414637-fa54669d-f56f-4349-bc35-ba519c23cf9c.png)
![imagen](https://user-images.githubusercontent.com/66130599/127414652-d330d9ce-0a79-4dbe-a4b9-714da254915b.png)
![imagen](https://user-images.githubusercontent.com/66130599/127414676-acbef8c3-00c8-47fe-8938-56fd78fb305c.png)
![imagen](https://user-images.githubusercontent.com/66130599/127414713-72f9b4ea-1526-4f3f-b858-fd4bf79e1849.png)
![imagen](https://user-images.githubusercontent.com/66130599/127414741-4a420de9-2a7a-48ad-84a1-d4e050d73a6e.png)










