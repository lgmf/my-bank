resource "aws_db_subnet_group" "my_bank_db_sbg" {
  name       = "my-bank-subnet-group"
  subnet_ids = [aws_subnet.public_a.id, aws_subnet.public_b.id]
}

resource "aws_security_group" "security_group_my_bank_db" {
  name        = "security_group_my_bank_db"
  description = "Allow TLS inbound traffic on port 80 (http)"
  vpc_id      = aws_vpc.vpc_my_bank.id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.vpc_my_bank.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "my_bank_db" {
  allocated_storage      = 10
  db_name                = "my_bank"
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t3.micro"
  username               = "admin"
  password               = var.db_master_password
  identifier             = "my-bank-db"
  skip_final_snapshot    = true
  publicly_accessible    = true
  db_subnet_group_name   = aws_db_subnet_group.my_bank_db_sbg.name
  vpc_security_group_ids = [aws_security_group.security_group_my_bank_db.id]
}
