# infrastructure/terraform/main.tf
provider "aws" {
  region = "us-east-2"
}

# 1. Reserva de IPs elásticas para cada servicio
resource "aws_eip" "services" {
  count = 4  # Frontend + 3 microservicios
  vpc   = true
  tags = {
    Name = "eip-${element(["frontend", "clima", "temperatura", "calidad_aire"], count.index)}"
  }
}

# 2. Instancias EC2 con Ubuntu 22.04
resource "aws_instance" "services" {
  count                  = 4
  ami                    = "ami-04f167a56786e4b09"  # Ubuntu 22.04 LTS
  instance_type          = "t2.micro"
  key_name               = "key_access"
  vpc_security_group_ids = [aws_security_group.services.id]
  user_data              = file("${path.module}/userdata/docker-install.sh")

  tags = {
    Name = element(["frontend", "clima", "temperatura", "calidad_aire"], count.index)
  }
}

# 3. Asociación de IPs elásticas
resource "aws_eip_association" "services" {
  count         = 4
  instance_id   = aws_instance.services[count.index].id
  allocation_id = aws_eip.services[count.index].id
}

# 4. Security Group para permitir tráfico HTTP/API
resource "aws_security_group" "services" {
  name_prefix = "services-sg-"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22  # conexiones SSH
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Restringe esto en producción
  }

  ingress {
    from_port   = 5000
    to_port     = 5002  # (clima, temperatura, calidad_aire)
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5173  
    to_port     = 5173  # Frontend
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}