# Clima y Calidad del Aire - Ciudad de Guatemala 🌤️🌫️

Proyecto para la asignatura AYD2, 1er semestre 2025  
Grupo <#> | Sección <A o B>  

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
- `postman/`: Colección para probar los endpoints.

---

## 🚀 Despliegue

### Requisitos
- Docker
- Terraform CLI
- Ansible
- Cuenta de AWS o GCP con credenciales configuradas

### Instrucciones

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

📁 [`/postman/microservicios.postman_collection.json`](./postman/microservicios.postman_collection.json)

---

## 👥 Integrantes

- Javier Monterroso (commits: ✅)
- Estrella Armas (commits: ✅)
- Fernando (commits: ✅)

> Todos los integrantes deben tener commits sustanciales durante el desarrollo.

---

## ⚠️ Consideraciones

- El proyecto será evaluado con todos los integrantes presentes.
- El repositorio debe incluir toda la documentación en formato Markdown.
- Las copias serán penalizadas.
- La calificación puede cambiar si la ingeniera solicita revisión.

---

## 📎 Enlaces de entrega

- 🔗 Repositorio: [GitHub](https://github.com/xvimnt/AYD2_A_1S2025_PRAC2_G2)
- 🌍 Frontend desplegado: [IP Pública del frontend](http://<IP_FRONTEND>)