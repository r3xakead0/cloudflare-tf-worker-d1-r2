output "worker_name" {
  value = cloudflare_workers_script.node_app.script_name
}

output "d1_database_name" {
  value = cloudflare_d1_database.app_db.name
}

output "r2_bucket_name" {
  value = cloudflare_r2_bucket.app_bucket.name
}

output "worker_url" {
  value = "https://${var.app_name}.${var.workers_dev_subdomain}.workers.dev"
}