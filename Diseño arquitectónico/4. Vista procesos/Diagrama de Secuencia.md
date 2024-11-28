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

### Diagrama 1: Inicio de sesión y gestión de componentes

<p align="center">
  <img src="https://github.com/user-attachments/assets/7f299cc6-e89f-4a8d-bdc0-5a64130b9308" alt="Diagrama de secuencia 1 "/>
</p>



**Explicación**:  
Este diagrama describe cómo el **Personal Administrativo** inicia sesión en el sistema de la UTPL. Una vez autenticado, puede agregar componentes al inventario tras validar su existencia. Los pasos clave incluyen:  
- Verificar credenciales.  
- Obtener los datos del usuario.  
- Agregar componentes tras verificar su disponibilidad.

---

### Diagrama 2: Verificación y clasificación de componentes

<p align="center">
  <img src="https://github.com/user-attachments/assets/4dacda02-a339-481b-92b0-2a8e4cf1c138" alt="Diagrama de secuencia 2"/>
</p>


**Explicación**:  
Este diagrama muestra el proceso de verificación y clasificación de componentes. El flujo incluye:  
- Verificar si un componente existe en el inventario.  
- Verificar el estado del componente.  
- Clasificar los componentes en diferentes categorías basadas en su tipo.

---

### Diagrama 3: Generación de informes y alertas

<p align="center">
  <img src="https://github.com/user-attachments/assets/13c57a6e-b26a-4325-a0a9-74a3808067ab" alt="Diagrama de secuencia 3"/>
</p>

**Explicación**:  
Aquí se describe el proceso de monitoreo de movimientos e irregularidades en el inventario, incluyendo la generación de alertas y registros. Las acciones clave son:  
- Monitorear movimientos.  
- Generar informes de irregularidades.  
- Registrar movimientos específicos y enviar alertas al sistema.

