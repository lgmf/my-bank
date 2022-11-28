terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.0.4"
}

provider "aws" {
  region  = var.aws_region
  profile = "personal"
}
