# Define your Terraform outputs here
# outputs.tf - Salidas útiles para tu infraestructura actual

# 1. IPs públicas elásticas (EIP) asignadas a cada instancia
output "elastic_ips" {
  description = "IPs públicas reservadas para las instancias"
  value       = {
    frontend     = aws_eip.services[0].public_ip
    clima        = aws_eip.services[1].public_ip
    temperatura = aws_eip.services[2].public_ip
    calidad_aire = aws_eip.services[3].public_ip
  }
}

# 2. IDs de las instancias EC2
output "instance_ids" {
  description = "IDs de las instancias EC2"
  value       = aws_instance.services[*].id
}

# 3. DNS públicos de las instancias (si las necesitas)
output "public_dns" {
  description = "DNS públicos de las instancias"
  value       = aws_instance.services[*].public_dns
}

# 4. Security Group ID (para referencia en otros módulos)
output "security_group_id" {
  description = "ID del Security Group 'services-sg'"
  value       = aws_security_group.services.id
}

# 5. Comandos útiles para acceder vía SSH (simulados)
output "ssh_commands" {
  description = "Comandos SSH para conectarse a cada instancia"
  value       = {
    frontend     = "ssh -i key_access.pem ubuntu@${aws_eip.services[0].public_ip}"
    clima        = "ssh -i key_access.pem ubuntu@${aws_eip.services[1].public_ip}"
    temperatura = "ssh -i key_access.pem ubuntu@${aws_eip.services[2].public_ip}"
    calidad_aire = "ssh -i key_access.pem ubuntu@${aws_eip.services[3].public_ip}"
  }
}