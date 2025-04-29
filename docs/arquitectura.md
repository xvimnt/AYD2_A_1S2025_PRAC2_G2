# Arquitectura del Sistema

## Visión General

El sistema está compuesto por tres microservicios principales:
- Servicio de Clima
- Servicio de Temperatura
- Servicio de Calidad del Aire

## Componentes

### Frontend
- React.js application
- Consume los tres microservicios
- Interfaz de usuario moderna y responsive

### Microservicios
Cada microservicio está construido con Python y Flask, proporcionando APIs REST para:
- Monitoreo de clima
- Monitoreo de temperatura
- Monitoreo de calidad del aire

### Infraestructura
- AWS como proveedor de nube
- Terraform para IaC
- Ansible para configuración y despliegue
