# Arquitectura en la Nube para la Aplicación de Checklist en un Campus

## Introducción

En el contexto de la gestión de infraestructura en un campus, es esencial contar con un sistema eficiente para el registro y control de edificios, aulas, cuartos de servicio y sus insumos. Nuestra aplicación de checklist ha sido diseñada para facilitar este proceso, permitiendo la gestión centralizada y automatizada de estos activos.

Para lograrlo, hemos implementado una arquitectura basada en **microservicios**, aprovechando las ventajas de escalabilidad, resiliencia y flexibilidad que ofrece **Google Kubernetes Engine (GKE)**. Además, la autenticación y gestión de usuarios se maneja a través de **MongoDB Atlas**, asegurando un almacenamiento seguro y eficiente.

---

## Tecnologías Utilizadas

Nuestra infraestructura en la nube se basa en los siguientes componentes clave:

- **Google Kubernetes Engine (GKE)**: Orquestación de microservicios para gestionar edificios, aulas, cuartos de servicio e insumos, además de la generación de informes.
- **Artifact Registry**: Almacenamiento de imágenes Docker para asegurar versiones controladas y despliegues eficientes.
- **MongoDB Atlas**: Base de datos NoSQL utilizada para la autenticación y almacenamiento de usuarios.
- **Google Cloud Load Balancer**: Distribución eficiente del tráfico entre los microservicios.
- **Google Cloud Logging y Monitoring**: Supervisión del rendimiento y detección de errores en tiempo real.
- **CI/CD con GitHub Actions y Google Cloud Build**: Automatización del despliegue continuo para mejorar la eficiencia operativa.

---

## Arquitectura General

La aplicación se basa en una arquitectura de microservicios desplegada en **Google Kubernetes Engine (GKE)**, lo que permite una administración modular y escalable de los siguientes elementos clave:

1. **Registro y gestión de infraestructura del campus**  
   - Edificios, aulas y cuartos de servicio.
   - Insumos y recursos asociados a cada espacio.
   - Registro de mantenimiento y disponibilidad.

2. **Generación de informes**  
   - Análisis de disponibilidad de espacios.
   - Reportes de consumo y necesidades de insumos.
   - Evaluación del estado de la infraestructura.

3. **Gestión de usuarios y autenticación**  
   - Registro y control de accesos.
   - Autenticación segura mediante MongoDB Atlas.
   - Roles y permisos para administración y usuarios operativos.

---

## Componentes Clave

### 1. **Infraestructura con Kubernetes (GKE)**
   - Microservicios independientes para cada función (gestión de edificios, aulas, cuartos de servicio, insumos e informes).
   - Balanceo de carga con **Google Cloud Load Balancer** para distribuir el tráfico de manera óptima.
   - Escalabilidad automática para responder a la demanda de usuarios.

### 2. **Almacenamiento y Autenticación con MongoDB Atlas**
   - Base de datos NoSQL optimizada para almacenar credenciales de usuarios.
   - Seguridad mediante autenticación basada en roles.
   - Alta disponibilidad y replicación automática.

### 3. **Despliegue y Gestión de Contenedores**
   - **Artifact Registry** almacena y gestiona las imágenes Docker de los microservicios.
   - **CI/CD con GitHub Actions y Google Cloud Build** para despliegues rápidos y controlados.
   - **Google Cloud Logging y Monitoring** para la detección de errores y supervisión del rendimiento.

### 4. **Generación de Informes**
   - Microservicio dedicado a la recolección y análisis de datos de la infraestructura.
   - Integración con herramientas de visualización de datos para reportes dinámicos.
   - API para exportación de informes en formatos estándar (PDF, Excel).

---

## Flujo de Implementación

1. Un usuario accede a la aplicación y se autentica a través de **MongoDB Atlas**.
2. Los microservicios de **GKE** gestionan los registros de infraestructura (edificios, aulas, insumos).
3. Se almacenan cambios y registros de mantenimiento en una base de datos.
4. Se generan informes automáticos según los datos recopilados.
5. Todo el tráfico es distribuido eficientemente mediante el balanceador de carga.
6. **Google Cloud Monitoring** supervisa el estado de los microservicios en tiempo real.

---

## Conclusión

Nuestra arquitectura basada en **microservicios con Google Kubernetes Engine y MongoDB Atlas** permite una gestión eficiente de la infraestructura del campus. Gracias a la **automatización de despliegues, escalabilidad dinámica y monitoreo en tiempo real**, la aplicación proporciona una solución robusta y flexible para la administración de checklist en entornos educativos y corporativos.

