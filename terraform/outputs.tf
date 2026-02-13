output "worker_name" {
  value = cloudflare_workers_script.node_app.script_name
}

output "d1_database_name" {
  value = cloudflare_d1_database.app_db.name
}

output "kv_namespace_name" {
  value = cloudflare_workers_kv_namespace.app_kv.title
}

output "worker_url" {
  value = "https://${cloudflare_workers_script.node_app.script_name}.${var.workers_dev_subdomain}.workers.dev"
}