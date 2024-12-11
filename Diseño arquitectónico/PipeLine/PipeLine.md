<h2>PipeLine</h2>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a3ff6d12-3b77-4fe3-8c8d-2e4f84051e59" alt="Prototipo en Figma">
</p>


| **Fase**               | **Herramientas**                             | **Descripción**                                                                 |
|------------------------|---------------------------------------------|---------------------------------------------------------------------------------|
| **Plan**               | - **ClickUp**                              | Herramienta utilizada para planificar el desarrollo y gestionar tareas del proyecto. Permite organizar funciones, priorizar tareas y dar seguimiento a sprints en equipos ágiles. |
| **Code**               | - **React**                                | Biblioteca de JavaScript para construir interfaces de usuario interactivas y de alto rendimiento. |
|                        | - **JavaScript**                           | Lenguaje de programación principal utilizado en el frontend y backend del proyecto. |
|                        | - **Node.js**                              | Entorno de ejecución para construir aplicaciones del lado del servidor escalables y rápidas. |
|                        | - **Tailwind CSS**                         | Framework CSS que facilita la creación de interfaces estilizadas con clases predefinidas. |
|                        | - **Expo**                                 | Plataforma basada en React Native para desarrollar aplicaciones móviles de forma ágil y eficiente. |
| **Build**              | - **Gradle**                               | Sistema de automatización utilizado para compilar, probar y empaquetar aplicaciones móviles nativas. |
| **Test**               | - **Jest**                                 | Herramienta para pruebas unitarias en JavaScript, verificando la funcionalidad de componentes y módulos. |
|                        | - **Appium**                               | Framework de pruebas automatizadas para aplicaciones móviles (nativas, híbridas y web). Permite realizar pruebas en dispositivos Android e iOS. |
|                        | - **JMeter**                               | Herramienta de pruebas de carga y rendimiento que evalúa cómo la aplicación responde bajo múltiples usuarios. |
|                        | - **Google Lighthouse**                    | Herramienta de análisis que evalúa el rendimiento, accesibilidad y mejores prácticas de la aplicación. |
| **Release**            | - **GitLab CI/CD**                         | Plataforma de integración y despliegue continuo que asegura que el código sea revisado, empaquetado y listo para producción. |
| **Deploy**             | - **Firebase**                             | Plataforma backend que ofrece autenticación, almacenamiento en la nube y bases de datos en tiempo real. |
|                        | - **Google Cloud Functions**               | Servicio sin servidor que ejecuta lógica del backend en respuesta a eventos. |
|                        | - **Google Play**                          | Plataforma de distribución para publicar y distribuir la aplicación a usuarios finales en dispositivos Android. |
| **Operate**            | - **Docker**                               | Plataforma de contenedores que garantiza la ejecución consistente de la aplicación en cualquier entorno. |
| **Monitor**            | - **LogRocket**                            | Herramienta que rastrea la actividad de los usuarios y detecta problemas en tiempo real para mejorar la experiencia. |
|                        | - **Discord**                              | Herramienta de comunicación que facilita el envío de notificaciones rápidas y la colaboración en equipo. |



# 1. Plan

Herramientas:
- ClickUp, Trello: Estas herramientas se utilizan para planificar el desarrollo y gestionar las tareas del proyecto. Te ayudan a organizar las funciones, priorizar tareas y hacer un seguimiento de las sprints en equipos ágiles.

En esta fase, se definen los objetivos del proyecto, los requisitos de la aplicación móvil y se planifican las funcionalidades que deben desarrollarse. Para CheckList - Campus, esta fase incluiría la planificación de las funciones clave, como la gestión de checklists para el estado de las instalaciones.

# 2. Code

Herramientas:
- React, Expo, Node.js, Tailwind CSS, JavaScript: Son herramientas clave en el desarrollo de la aplicación.
- React y Node.js forman la base de la aplicación móvil y el backend, respectivamente. Expo ayuda a construir aplicaciones móviles de manera rápida con React Native, mientras que Tailwind CSS facilita el diseño de la interfaz.
- JavaScript es el lenguaje principal utilizado en todo el proyecto.

En esta fase, se escribe el código de la aplicación móvil, el backend y las funcionalidades correspondientes. Los desarrolladores implementan el diseño, las interacciones y la lógica de negocio.

# 3. Build

Herramientas:
- Gradle: Herramienta para la automatización de la construcción, especialmente útil si estás trabajando con componentes nativos o creando versiones de Android.

En la fase de construcción, se compila el código y se genera una versión ejecutable de la aplicación. Para CheckList - Campus, esto significa preparar la aplicación para pruebas o despliegue.

# 4. Test

Herramientas:
- Jest, Testing Library, JMeter: Estas herramientas se utilizan para realizar pruebas automáticas.
  - Jest se usa para realizar pruebas unitarias en el código de JavaScript.
  - Testing Library ayuda a probar componentes de React, asegurando que la interfaz de usuario se comporte como se espera.
  - JMeter permite realizar pruebas de carga para evaluar cómo se comporta la aplicación con múltiples usuarios y solicitudes simultáneas.

En esta fase, se prueban todas las funcionalidades de la aplicación. Las pruebas incluyen pruebas unitarias, pruebas de integración, pruebas de UI/UX y pruebas de rendimiento.

# 5. Release

Herramientas:
- GitLab CI/CD: Se utiliza para integrar la automatización del ciclo de vida del software, desde el código hasta el despliegue.

Aquí es donde la aplicación se prepara para su lanzamiento en la tienda, pasando por las etapas de revisión, empaquetado y despliegue. En el caso de CheckList - Campus, esta fase involucra asegurarse de que la app esté lista para ser subida a Google Play Store y otras plataformas.

# 6. Deploy

Herramientas:

- Google Cloud: Proporciona herramientas de monitoreo de aplicaciones y de infraestructura. Permite supervisar el rendimiento de los servidores backend y la base de datos.

En esta fase, la aplicación se despliega en un entorno de producción, ya sea en servidores o plataformas en la nube. Si hay servicios backend para CheckList - Campus, estas herramientas ayudan a asegurar que el backend sea escalable y pueda manejar el tráfico de usuarios.

# 7. Operate

Herramientas:

- Docker, Kubernetes: Estas herramientas se utilizan para gestionar la infraestructura y el despliegue de aplicaciones backend, si es necesario.

En esta fase, se asegura el funcionamiento continuo de la aplicación. Se monitorean los errores, las caídas y el rendimiento para garantizar que la aplicación esté funcionando correctamente. Para CheckList - Campus, esto incluye monitorear cómo los usuarios interactúan con la aplicación y cómo el sistema responde a esas interacciones.

# 8. Monitor

Herramientas:

- Sentry, LogRocket, Instabug: Estas herramientas se usan para monitorear la aplicación en producción y manejar los errores y el rendimiento.
  - Sentry es útil para capturar errores en tiempo real, proporcionando informes detallados para su corrección.
  - LogRocket ayuda a realizar un seguimiento de la actividad de los usuarios y detectar problemas de la interfaz de usuario.
  - Instabug permite recibir informes de fallos y problemas de rendimiento directamente desde los usuarios de la aplicación móvil.

En esta fase, se realiza un monitoreo continuo para garantizar que el sistema esté funcionando a su máximo rendimiento. Esto incluye la supervisión del estado de las aplicaciones móviles y de los servicios en el backend, detectando posibles problemas antes de que afecten a los usuarios.
