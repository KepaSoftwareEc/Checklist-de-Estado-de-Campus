<h2>PipeLine</h2>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a3ff6d12-3b77-4fe3-8c8d-2e4f84051e59" alt="Prototipo en Figma">
</p>

<table>
  <thead>
    <tr>
      <th>Fase</th>
      <th>Herramientas y Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="color:blue;"><strong>Plan</strong></td>
      <td>
        <strong>ClickUp:</strong> Herramienta utilizada para planificar el desarrollo y gestionar las tareas del proyecto. Permite organizar funciones, priorizar tareas y dar seguimiento de sprints en equipos ágiles.
      </td>
    </tr>
    <tr>
      <td style="color:green;"><strong>Code</strong></td>
      <td>
        <strong>React:</strong> Base para la construcción de la interfaz de usuario de la aplicación.<br>
        <strong>JavaScript:</strong> Lenguaje principal utilizado en el desarrollo.<br>
        <strong>Node.js:</strong> Framework utilizado para el backend.<br>
        <strong>Tailwind CSS:</strong> Facilita el diseño de interfaces con estilos predefinidos.<br>
        <strong>Expo:</strong> Permite desarrollar aplicaciones móviles rápidamente con React Native.
      </td>
    </tr>
    <tr>
      <td style="color:orange;"><strong>Build</strong></td>
      <td>
        <strong>Gradle:</strong> Herramienta de automatización de la construcción, especialmente útil para gestionar componentes nativos y la creación de versiones para Android.
      </td>
    </tr>
    <tr>
      <td style="color:red;"><strong>Test</strong></td>
      <td>
        <strong>Jest:</strong> Pruebas unitarias en JavaScript.<br>
        <strong>JMeter:</strong> Permite pruebas de carga para evaluar el comportamiento bajo múltiples usuarios.<br>
        <strong>Google Lighthouse:</strong> Analiza el rendimiento y la accesibilidad de la aplicación.<br>
        <strong>Appium:</strong> Pruebas funcionales para aplicaciones móviles en múltiples plataformas.
      </td>
    </tr>
    <tr>
      <td style="color:purple;"><strong>Release</strong></td>
      <td>
        <strong>GitLab CI/CD:</strong> Se encarga del empaquetado, revisión y despliegue de la aplicación para garantizar su disponibilidad en plataformas como Google Play Store.
      </td>
    </tr>
    <tr>
      <td style="color:brown;"><strong>Deploy</strong></td>
      <td>
        <strong>Firebase:</strong> Maneja el backend de la aplicación.<br>
        <strong>Google Play:</strong> Plataforma de distribución para los usuarios finales.<br>
        <strong>Google Cloud Functions:</strong> Proporciona lógica de funciones para la aplicación.
      </td>
    </tr>
    <tr>
      <td style="color:teal;"><strong>Operate</strong></td>
      <td>
        <strong>Docker:</strong> Garantiza el funcionamiento continuo de la aplicación mediante monitoreo de errores, caídas y rendimiento.
      </td>
    </tr>
    <tr>
      <td style="color:gray;"><strong>Monitor</strong></td>
      <td>
        <strong>LogRocket:</strong> Rastrea la actividad de los usuarios y detecta problemas en la interfaz.<br>
        <strong>Discord:</strong> Permite enviar notificaciones rápidas y colaborar en tiempo real.
      </td>
    </tr>
  </tbody>
</table>


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
