<h1>Diagrama de Secuencia</h1>
## ¿Qué son los diagramas de secuencia?
Los diagramas de secuencia son una herramienta de modelado en la Ingeniería de Software que forma parte del Lenguaje Unificado de Modelado (UML). Se utilizan para describir cómo los objetos de un sistema interactúan entre sí a través del tiempo, mostrando el flujo de mensajes o llamadas entre ellos. Estos diagramas son especialmente útiles para representar procesos y casos de uso en sistemas orientados a objetos.

## Estructura que siguen los diagramas de secuencia
1. **Actores y Objetos**: Representan las entidades que participan en la interacción. Los actores se representan como figuras humanas, y los objetos como rectángulos.
2. **Líneas de vida**: Indican la existencia de un actor u objeto durante el proceso. Son líneas verticales que comienzan debajo de cada actor u objeto.
3. **Mensajes**: Representan la comunicación entre actores y objetos mediante flechas horizontales.
4. **Bloques de ejecución**: Rectángulos sobre las líneas de vida que representan la ejecución de un proceso o método.
5. **Tiempo**: Se representa de forma implícita en la dirección descendente del diagrama.

## Diagramas de secuencia

### Diagrama 1: Inicio de sesión y Registro de edificios

<p align="center">
  <img src="https://github.com/user-attachments/assets/7f299cc6-e89f-4a8d-bdc0-5a64130b9308" alt="Diagrama de secuencia 1 "/>
</p>

**Explicación**:  

En el primer diagrama de secuencias se describe el flujo de interacción para los encargados de realizar el checklist del estado del campus. El proceso comienza cuando los usuarios inician sesión utilizando sus credenciales institucionales de la UTPL. Una vez ingresados los datos, el sistema valida las credenciales en la base de datos para garantizar la autenticidad del acceso.

Adicionalmente, el diagrama incluye el proceso de registro de nuevos edificios, aulas y cuartos de servicio en el sistema de la UTPL, destacando las interacciones necesarias para completar estas tareas de manera eficiente. El flujo es el siguiente:

- Ingresar Creedenciasles.  
- Validar el usuario dentro de la UTPL.  
- Registrar los edicios, aulas y cuartos de servicio.
- Agregar los insumos.

---

### Diagrama 2: Monitoreo de los Edificios

<p align="center">
  <img src="https://github.com/user-attachments/assets/4dacda02-a339-481b-92b0-2a8e4cf1c138" alt="Diagrama de secuencia 2"/>
</p>


**Explicación**: 

En el segundo diagrama se ilustra el proceso mediante el cual el usuario selecciona la parte específica del edificio que desea monitorear, permitiéndole generar un informe detallado sobre su estado. El flujo es el siguiente:

- Seleccioinar el edificio, aula y cuarto de servicio
- Escojer el apartado que se desea vereificar dentro de la parte seleccionada 
- Realizar el proceso de verificacion
- Ver las observaciones guardadas en el informe
- Generar Informe

---

### Diagrama 3: Envio de Informe y Procesamiento de Solicitud

<p align="center">
  <img src="https://github.com/user-attachments/assets/13c57a6e-b26a-4325-a0a9-74a3808067ab" alt="Diagrama de secuencia 3"/>
</p>

**Explicación**:  

En el último diagrama se detalla el proceso mediante el cual el informe generado por el usuario sobre el estado del edificio es enviado al departamento de inventario. El propósito de este envío es que el equipo de inventario analice la información y proceda a realizar las acciones correspondientes, ya sea el mantenimiento o la reposición de los equipos necesarios. Finalmente, se notifica al usuario sobre la corrección realizada, cerrando el ciclo de seguimiento. El flujo es el siguiente:  
- Enviar informe.  
- Proceso de solicitud.  
- Notificaion al usuario.

---

<h1>Diagrama de Robustez</h1>

## ¿Qué son los diagramas de robustez?  
Los diagramas de robustez son una herramienta de modelado utilizada en el diseño de software para detallar cómo los actores, objetos, y procesos interactúan dentro de un sistema. Sirven como un puente entre los diagramas de casos de uso y los diagramas de diseño detallado, permitiendo identificar elementos clave del sistema como actores, controladores y entidades.  

## Estructura que siguen los diagramas de robustez  

- *Actores:* Representan los usuarios u otros sistemas que interactúan con el sistema principal. Se dibujan como figuras humanas o íconos.  
- *Entidades:* Son los elementos de datos o conceptos principales del dominio, representados como rectángulos.  
- *Controladores:* Representan la lógica de la aplicación y la interacción entre actores y entidades. Se muestran como círculos u óvalos.  
- *Relaciones:* Representan las conexiones entre actores, controladores y entidades mediante líneas con etiquetas que describen la interacción.

## Diagramas de robustez

### Diagrama 1: Registro

<p align="center">
  <img src="https://github.com/user-attachments/assets/8e215bd3-33f9-40a1-b961-bd100da622c2" alt="Diagrama de secuencia 1 "/>
</p>

### Diagrama 2: Monitoreo de los Edificios

<p align="center">
  <img src="https://github.com/user-attachments/assets/a56b51a4-da79-4471-910a-dec464511938" alt="Diagrama de secuencia 1 "/>
</p>

### Diagrama 3: Notificaciones

<p align="center">
  <img src="https://github.com/user-attachments/assets/ad6f1c04-b30d-4764-91c8-f8fc2e370a6b" alt="Diagrama de secuencia 1 "/>
</p>
