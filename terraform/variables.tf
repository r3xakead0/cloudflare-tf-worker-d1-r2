variable "cloudflare_api_token" {
  description = "Cloudflare API Token"
  type        = string
  sensitive   = true
}

variable "account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "node-demo"
}

variable "workers_dev_subdomain" {
  description = "Your subdomain workers.dev (ex: chainiz)"
  type        = string
  default     = "chainiz"
}
