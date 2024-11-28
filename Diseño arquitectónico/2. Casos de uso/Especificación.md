<h1>Casos de Uso</h1>

## ¿Qué es un diagrama de casos de uso?

Un diagrama de casos de uso es una representación gráfica empleada en el modelado de sistemas para describir las interacciones entre los actores (usuarios, sistemas externos u otros componentes) y las funcionalidades principales que ofrece un sistema. Este tipo de diagrama, basado en el estándar UML (Lenguaje Unificado de Modelado), se utiliza para documentar **qué hace el sistema** desde la perspectiva de los usuarios, sin entrar en detalles sobre **cómo se implementa**.

---

## ¿Para qué sirve un Diagrama de Casos de Uso?

El diagrama de casos de uso es una herramienta clave para el desarrollo y documentación de sistemas, ya que permite:

1. **Especificar requisitos funcionales**: Identificar y detallar las funcionalidades principales que debe cumplir el sistema.
2. **Facilitar la comunicación**: Servir como un medio común entre los interesados, desarrolladores y analistas para garantizar la comprensión de los requisitos.
3. **Definir el alcance del sistema**: Determinar los límites del sistema, especificando qué incluye y qué excluye.
4. **Identificar actores clave**: Describir quiénes interactuarán con el sistema, ya sean usuarios humanos o sistemas externos.
5. **Priorizar funcionalidades**: Ayudar a evaluar y clasificar las funcionalidades en función de su importancia o impacto para los usuarios.

---

## Estructura de un Diagrama de Casos de Uso

La estructura de un diagrama de casos de uso incluye los siguientes componentes principales:

1. **Actores**:
   - Representan las entidades externas que interactúan con el sistema.
   - Pueden ser personas, organizaciones o sistemas.
   - Se representan gráficamente como una figura humana o una etiqueta que los identifica.
   - Ejemplo: *Usuario*, *Administrador*, *Sistema Externo*.

2. **Casos de Uso**:
   - Representan las funcionalidades o servicios específicos que el sistema proporciona a los actores.
   - Se representan como óvalos con un nombre que describe la acción.
   - Ejemplo: *Registrar Usuario*, *Generar Informe*, *Procesar Pago*.

3. **Relaciones**:
   - **Asociación**: Representa la interacción entre un actor y un caso de uso (línea sólida).
   - **Inclusión** (`<<include>>`): Indica que un caso de uso incluye la funcionalidad de otro, generalmente para evitar redundancia.
   - **Extensión** (`<<extend>>`): Señala un caso de uso opcional que extiende la funcionalidad de otro principal, dependiendo de ciertas condiciones.
   - **Generalización**: Define relaciones de herencia entre actores o entre casos de uso.

4. **Sistema**:
   - Representa los límites del sistema modelado.
   - Se ilustra como un rectángulo que contiene los casos de uso.

---
## 1. Diagrama de caso de uso (Registro)

<p align="center">
  <img src="https://github.com/user-attachments/assets/5ba4934f-8f6b-45c1-904a-fa760dff455f" alt="Diagrama de caso de uso (Registro)"/>
</p>

## Descripción del caso del primer caso de uso: Registro 

### Caso: Registro

| *Nombre*           | Ingresar Usuario|
|-----------------------|-------------------------------------------------|
| *Actores*          | - Administrador<br>- UTPL       |
| *Flujo normal*     | 1. Administrador registra usuarios en la UTPL. <br>2. UTPL valida las credenciales del Administrador. <br>3. Administrador ingresa los Edificios en la UTPL. <br>4. UTPL valida la información de los Edificios ingresada por el Administrador. <br>5. Administrador ingresa las Aulas en la UTPL. <br>6. UTPL valida la información de las Aulas ingresada por el Administrador. <br>7. Administrador ingresa los Cuartos de Servicio en la UTPL. <br>8. UTPL valida la información de los Cuartos de Servicio ingresada por el Administrador. <br>|

## 2. Diagrama de caso de uso (Monitoreo)

<p lign="center">
  <img src="https://github.com/user-attachments/assets/989e60bd-268c-4f39-b048-4b6e48eb9f6d" alt="Diagrama de caso de uso (Gestion)"/>
</p>

 ## Descripción del segundo caso de uso: Monitoreo 

 ### Caso: Monitoreo

| *Nombre*           | Gestionar Inventario                                       |
|-----------------------|-------------------------------------------------|
| *Actores*          | - Administrador<br>- UTPL     |
| *Flujo normal*     | 1. Administrador monitorea el estado de los elementos del Edificio y genera un Informe. <br>2. El Informe detalla el estado general del Edificio, incluyendo observaciones hechas por el administrdor. <br>3. Administrador envía el Informe a UTPL. <br>4. UTPL valida el Informe del Administrador. <br>5. Administrador monitorea el estado de los elementos del Aula y genera un Informe. <br>6. El Informe detalla el estado general del Aula, incluyendo observaciones hechas por el administrdor. <br>7. Administrador envía el Informe a UTPL. <br>8. UTPL valida el Informe del Administrador. <br>9. Administrador monitorea el estado de los elementos del Cuarto de Servicio y genera un Informe. <br>10. El Informe detalla el estado general del Cuartos de servicio, incluyendo observaciones hechas por el administrdor. <br>11. Administrador envía el Informe a UTPL. <br>12. UTPL valida el Informe del Administrador. <br> |



## 3. Diagrama de caso de uso (Notificación)

<p align="center">
  <img src="https://github.com/user-attachments/assets/d017d01f-dae0-4f23-a514-93699e0e547c" alt="Diagrama de caso de uso (Monitoreo)"/>
</p>

 ## Descripción del tercer caso de uso: Notificación

 ### Caso: Notificación

| *Nombre*           | Generar informe del Componente                                       |
|-----------------------|-------------------------------------------------|
| *Actores*          | - Administrador<br>- Inventario     |
| *Flujo normal*     | 1. Administrador envía un Informe con una solicitud al Inventario. <br>2. Inventario analiza el Informe y notifica el estado de la solicitud al Administrador. <br>3. Administrador verifica el estado de las solicitudes en la UTPL. |

