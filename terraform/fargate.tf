locals {
  env = [
    {
      name  = "PORT",
      value = "3000"
    },
    {
      name  = "DATABASE_URL",
      value = "mysql://${aws_db_instance.my_bank_db.username}:${var.db_master_password}@${aws_db_instance.my_bank_db.endpoint}/${aws_db_instance.my_bank_db.name}"
    },
    {
      name  = "JWT_SECRET",
      value = "awesome-secret"
    },
  ]
}

resource "aws_cloudwatch_log_group" "cloudwatch_log_group" {
  name              = "/my_bank"
  retention_in_days = 1
}

resource "aws_ecr_repository" "my_bank_ecr" {
  name = "ecr_my_bank_repo"
}

resource "aws_ecs_task_definition" "backend_task" {
  family = "backend_example_app_family"

  // Fargate is a type of ECS that requires awsvpc network_mode
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"

  // Valid sizes are shown here: https://aws.amazon.com/fargate/pricing/
  memory = "512"
  cpu    = "256"

  // Fargate requires task definitions to have an execution role ARN to support ECR images
  execution_role_arn = aws_iam_role.ecs_role.arn

  container_definitions = <<DEFINITION
    [
      {
        "name" : "my_bank",
        "image" : "${aws_ecr_repository.my_bank_ecr.repository_url}:latest",
        "memory" : 512,
        "essential" : true,
        "portMappings" : [
          {
            "containerPort" : 3000,
            "hostPort" : 3000
          }
        ],
        "environment" : ${jsonencode(local.env)},
        "logConfiguration" : {
          "logDriver" : "awslogs",
          "options" : {
            "awslogs-group" : "${aws_cloudwatch_log_group.cloudwatch_log_group.name}",
            "awslogs-region" : "${var.aws_region}",
            "awslogs-stream-prefix" : "my_bank"
          }
        }
      }
    ]
  DEFINITION
}

resource "aws_ecs_cluster" "backend_cluster" {
  name = "backend_cluster_my_bank"
}

resource "aws_security_group" "security_group_my_bank_service" {
  name        = "security_group_my_bank_service"
  description = "Allow TLS inbound traffic on port 80 (http)"
  vpc_id      = aws_vpc.vpc_my_bank.id

  ingress {
    from_port   = 3000
    to_port     = 3000
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

resource "aws_ecs_service" "backend_service" {
  name = "my_bank_service"

  cluster         = aws_ecs_cluster.backend_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn

  launch_type   = "FARGATE"
  desired_count = 1

  network_configuration {
    subnets          = [aws_subnet.public_a.id, aws_subnet.public_b.id]
    security_groups  = [aws_security_group.security_group_my_bank_service.id]
    assign_public_ip = true
  }
}
