variable "aws_region" {
  default     = "sa-east-1"
  description = "Which region should the resources be deployed into?"
}

variable "db_master_password" {
  default     = ""
  description = "DB Master Password"
}
