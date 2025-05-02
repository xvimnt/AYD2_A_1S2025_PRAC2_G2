# Clima y Calidad del Aire - Ciudad de Guatemala 🌤️🌫️

Proyecto para la asignatura AYD2, 1er semestre 2025  
Grupo 2 | Sección A

---

## 🌐 Descripción

Esta es una plataforma web informativa que permite a los usuarios conocer el estado actual del **clima**, la **temperatura aparente** y la **calidad del aire (AQI)** en la Ciudad de Guatemala.

El sistema está basado en **una arquitectura de microservicios**, desplegado en la nube usando Terraform, Ansible y Docker. Los datos se obtienen en tiempo real desde la API de [Open-Meteo](https://open-meteo.com/).

---

## 📦 Tecnologías Usadas

- **Frontend:** React.js (u otra)
- **Backend / Microservicios:** Node.js / Python / etc.
- **APIs:** Open-Meteo
- **Contenerización:** Docker
- **Infraestructura:** Terraform + Ansible
- **Proveedor Cloud:** AWS o GCP

---

## 🧱 Arquitectura del Proyecto

![Diagrama de arquitectura](./docs/diagrama.png)

- `frontend/`: Aplicación web que consume directamente los microservicios.
- `services/`: Contiene tres microservicios:
  - `clima/`
  - `temperatura/`
  - `calidad_aire/`
- `infrastructure/`: Scripts de Terraform y Ansible para el despliegue.

---

## 🚀 Despliegue

### Requisitos
- Docker y Docker Compose
- Terraform CLI (solo para despliegue en la nube)
- Ansible (solo para despliegue en la nube)
- Cuenta de AWS o GCP con credenciales configuradas (solo para despliegue en la nube)

### Desarrollo Local con Docker Compose

Para ejecutar todo el sistema localmente:

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd <nombre-del-repo>

# Construir y ejecutar todos los servicios
docker-compose up --build
```

Esto iniciará:
- Frontend en http://localhost:5173
- Servicio de Clima en http://localhost:5000
- Servicio de Temperatura en http://localhost:5001
- Servicio de Calidad del Aire en http://localhost:5002

Para detener los servicios:
```bash
docker-compose down
```

### Despliegue en la Nube

#### 1. Crear la infraestructura con Terraform
```bash
cd infrastructure/terraform
terraform init
terraform apply
```

#### 2. Desplegar servicios con Ansible
```bash
cd ../ansible
ansible-playbook -i inventory/hosts playbook.yml
```

#### 3. Acceder a los servicios
- Frontend: `http://<IP_FRONTEND>`
- Clima: `http://<IP_CLIMA>/clima`
- Temperatura: `http://<IP_TEMPERATURA>/temperatura`
- Calidad del Aire: `http://<IP_AIRE>/aire`

---

## 📮 Colección Postman

Puedes importar la siguiente colección para probar los endpoints de los microservicios:

📁 [`/postman/microservicios.postman_collection.json`](https://galactic-shuttle-257617.postman.co/workspace/My-Workspace~3f90d44e-1a3b-4d9b-8420-0647233a3137/collection/6645965-aeb43751-6042-4c13-ba96-61778e684bef?action=share&creator=6645965)

---
## Diagrama de Bloques 
![Image](https://github.com/user-attachments/assets/4829168d-5fb7-4e80-b44b-4f75f1d9d5cd)
---

## 👥 Integrantes

- Javier Monterroso (commits: ✅)
- Estrella Armas (commits: ✅)
- Fernando (commits: ✅)

---

## 📎 Enlaces de entrega

- 🔗 Repositorio: [GitHub](https://github.com/xvimnt/AYD2_A_1S2025_PRAC2_G2)
- 🌍 Frontend desplegado: [IP Pública del frontend](http://<IP_FRONTEND>)