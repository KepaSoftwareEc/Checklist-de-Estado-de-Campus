![WhatsApp Image 2024-12-11 at 8 18 10 AM](https://github.com/user-attachments/assets/98c2d040-02c3-4040-81a2-4ebb487081d5)# CI/CD y DevOps

## ¿Qué es CI/CD?

CI/CD, que significa *Integración Continua y Entrega/Despliegue Continuo*, es un conjunto de prácticas que automatizan las etapas de desarrollo, prueba y despliegue del software. Su objetivo principal es mejorar la velocidad, calidad y confiabilidad de las entregas de software.

- *Integración Continua (CI)*: 
  - Es el proceso de integrar regularmente el código de diferentes desarrolladores en un repositorio compartido.
  - Incluye la ejecución automática de pruebas para identificar errores rápidamente.

- *Entrega Continua (CD - Continuous Delivery)*:
  - Extiende la CI al automatizar la preparación de entregas del software en cualquier momento.
  - Garantiza que el código esté siempre en un estado listo para producción.
  - Requiere pruebas adicionales y validaciones antes del despliegue.

- *Despliegue Continuo (CD - Continuous Deployment)*:
  - Va un paso más allá y automatiza también el proceso de despliegue en producción.
  - Cada cambio que pasa las pruebas se despliega automáticamente.

El enfoque CI/CD fomenta ciclos de desarrollo cortos, iterativos y más seguros.

---

## ¿Qué es DevOps?

*DevOps* es una cultura, metodología y conjunto de prácticas que busca integrar los equipos de desarrollo (Development) y operaciones (Operations) para mejorar la colaboración, automatización y entrega continua de software. DevOps no es solo una herramienta, sino una filosofía que combina personas, procesos y tecnologías.

- *Beneficios de DevOps*:
  - Ciclos de entrega más rápidos.
  - Mayor estabilidad y calidad del software.
  - Mejor alineación entre objetivos técnicos y empresariales.

## Foto del Pipeline

![WhatsApp Image 2024-12-11 at 8 18 10 AM](https://github.com/user-attachments/assets/80c4ce56-5997-4ac1-af1c-9c646fe4816c)


## Tabla de descripción 

<table>
  <thead>
    <tr>
      <th>Fase</th>
      <th>Herramientas</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="color:blue;"><strong>Plan</strong></td>
      <td>ClickUp</td>
      <td>Herramienta utilizada para planificar el desarrollo y gestionar las tareas del proyecto. Permite organizar funciones, priorizar tareas y dar seguimiento de sprints en equipos ágiles.</td>
    </tr>
    <tr>
      <td style="color:green;"><strong>Code</strong></td>
      <td>React, JavaScript, Node.js, Tailwind CSS, Expo</td>
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
      <td>Gradle</td>
      <td>Herramienta de automatización de la construcción, especialmente útil para gestionar componentes nativos y la creación de versiones para Android.</td>
    </tr>
    <tr>
      <td style="color:red;"><strong>Test</strong></td>
      <td>Jest, JMeter, Google Lighthouse, Appium</td>
      <td>
        <strong>Jest:</strong> Pruebas unitarias en JavaScript.<br>
        <strong>JMeter:</strong> Permite pruebas de carga para evaluar el comportamiento bajo múltiples usuarios.<br>
        <strong>Google Lighthouse:</strong> Analiza el rendimiento y la accesibilidad de la aplicación.<br>
        <strong>Appium:</strong> Pruebas funcionales para aplicaciones móviles en múltiples plataformas.
      </td>
    </tr>
    <tr>
      <td style="color:purple;"><strong>Release</strong></td>
      <td>GitLab CI/CD</td>
      <td>Se encarga del empaquetado, revisión y despliegue de la aplicación para garantizar su disponibilidad en plataformas como Google Play Store.</td>
    </tr>
    <tr>
      <td style="color:brown;"><strong>Deploy</strong></td>
      <td>Firebase, Google Play, Google Cloud Functions</td>
      <td>
        <strong>Firebase:</strong> Maneja el backend de la aplicación.<br>
        <strong>Google Play:</strong> Plataforma de distribución para los usuarios finales.<br>
        <strong>Google Cloud Functions:</strong> Proporciona lógica de funciones para la aplicación.
      </td>
    </tr>
    <tr>
      <td style="color:teal;"><strong>Operate</strong></td>
      <td>Docker</td>
      <td>Garantiza el funcionamiento continuo de la aplicación mediante monitoreo de errores, caídas y rendimiento.</td>
    </tr>
    <tr>
      <td style="color:gray;"><strong>Monitor</strong></td>
      <td>LogRocket, Discord</td>
      <td>
        <strong>LogRocket:</strong> Rastrea la actividad de los usuarios y detecta problemas en la interfaz.<br>
        <strong>Discord:</strong> Permite enviar notificaciones rápidas y colaborar en tiempo real.
      </td>
    </tr>
  </tbody>
</table>

## Cronograma de actividades de desarrollo BackEnd y FrontEnd
